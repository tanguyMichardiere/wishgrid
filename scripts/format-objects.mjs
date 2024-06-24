#!/usr/bin/env node

// biome-ignore lint/correctness/noNodejsModules: node script
import { exec } from "node:child_process";
// biome-ignore lint/correctness/noNodejsModules: node script
import fs from "node:fs/promises";
// biome-ignore lint/correctness/noNodejsModules: node script
import { join } from "node:path";

/**
 * @param {string} path
 * @param {{
 *   searchValue: RegExp;
 *   replaceValue: string;
 * }} options
 */
async function fileReplace(path, { searchValue, replaceValue }) {
	const fileContent = await fs.readFile(path, { encoding: "utf-8" });
	const newContent = fileContent.replace(searchValue, replaceValue);
	if (newContent !== fileContent) {
		await fs.writeFile(path, newContent);
	}
}

/**
 * @param {string} path
 * @param {{
 *   searchValue: RegExp;
 *   replaceValue: string;
 * 	 fileExtensions: Array<string>;
 *   exclude: Array<string>;
 * }} options
 */
async function directoryReplace(path, { searchValue, replaceValue, fileExtensions, exclude = [] }) {
	const promises = [];
	for (const file of await fs.readdir(path, { withFileTypes: true })) {
		if (!exclude.includes(file.name)) {
			if (
				file.isFile() &&
				fileExtensions.some((fileExtension) => file.name.endsWith(`.${fileExtension}`))
			) {
				promises.push(
					fileReplace(join(path, file.name), {
						searchValue,
						replaceValue,
					}),
				);
			} else if (file.isDirectory()) {
				promises.push(
					directoryReplace(join(path, file.name), {
						searchValue,
						replaceValue,
						fileExtensions,
					}),
				);
			}
		}
	}
	if (promises.length > 0) {
		await Promise.all(promises);
	}
}

async function format() {
	return new Promise((resolve, reject) => {
		exec("pnpm run format", (error) => {
			if (error !== null) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

// open all objects on several lines
await directoryReplace(".", {
	searchValue: / \{ /g,
	replaceValue: "{\n",
	fileExtensions: ["js", "mjs", "ts", "tsx", "json", "jsonc"],
	exclude: [".next", ".vercel", "node_modules"],
});

await format();

// put objects with only one item on one line
await directoryReplace(".", {
	searchValue: /\{\n\s+(\S+)(: \S+)?[,;]?\n\s*\}/g,
	replaceValue: "{ $1$2 }",
	fileExtensions: ["js", "mjs", "ts", "tsx", "json", "jsonc"],
	exclude: [".next", ".vercel", "node_modules"],
});

await format();
