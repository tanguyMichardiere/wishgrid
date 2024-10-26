import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { cache } from "react";
import "server-only";
import { redirect } from "../../i18n/routing";
import { createServerSideHelpers } from "../trpc/server";

const linkRegex = /<(\S+)>; rel="\S+"; hreflang="(\S+)"/g;
type LinkRegexMatch = RegExpExecArray &
	[
		string, // match
		string, // URL
		string, // hreflang
	];

async function getRequestPathname(): Promise<string | undefined> {
	try {
		const headersList = await headers();
		const linkHeader = headersList.get("link");
		if (linkHeader === null) {
			return undefined;
		}
		const locale = headersList.get("x-next-intl-locale") ?? "x-default";
		for (const match of linkHeader.matchAll(linkRegex)) {
			const [_, url, hreflang] = match as LinkRegexMatch;
			if (hreflang === locale) {
				return new URL(url).pathname;
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

async function handleServerQueryError<R>(
	error: unknown,
	errors: Partial<Record<TRPC_ERROR_CODE_KEY, (error: TRPCError) => R>>,
): Promise<R> {
	if (error instanceof TRPCError) {
		if (error.code === "UNAUTHORIZED") {
			const requestPathname = await getRequestPathname();
			const locale = await getLocale();
			if (requestPathname !== undefined) {
				redirect({ href: `/sign-in?redirectTo=${encodeURIComponent(requestPathname)}`, locale });
			} else {
				redirect({ href: "/sign-in", locale });
			}
		}
		const handler = errors[error.code];
		if (handler !== undefined) {
			return handler(error);
		}
	}
	throw error;
}

export const serverQuery = <P extends unknown[], R>(
	fn: (trpc: Awaited<ReturnType<typeof createServerSideHelpers>>, ...args: P) => Promise<R>,
	errors: Partial<Record<TRPC_ERROR_CODE_KEY, (error: TRPCError) => R>> = {},
): ((...args: P) => Promise<R>) =>
	cache(async (...args: P) => {
		const trpc = await createServerSideHelpers();
		try {
			return await fn(trpc, ...args);
		} catch (error) {
			return await handleServerQueryError(error, errors);
		}
	});
