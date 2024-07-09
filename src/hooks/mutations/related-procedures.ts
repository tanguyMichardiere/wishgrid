import type {
	AnyTRPCMutationProcedure,
	AnyTRPCQueryProcedure,
	inferProcedureInput,
	inferProcedureOutput,
} from "@trpc/server";

export type OptimisticRelatedProcedures<
	Procedure extends AnyTRPCMutationProcedure,
	Queries extends AnyTRPCQueryProcedure[] | undefined = undefined,
> = RelatedProcedures<Procedure> & {
	cancel: (variables: inferProcedureInput<Procedure>) => Promise<void>;
	getData: (variables: inferProcedureInput<Procedure>) => {
		[Key in keyof Queries]: inferProcedureOutput<Queries[Key]> | undefined;
	};
	revertData: (
		variables: inferProcedureInput<Procedure>,
		context: {
			[Key in keyof Queries]: inferProcedureOutput<Queries[Key]> | undefined;
		},
	) => void;
};

export type RelatedProcedures<Procedure extends AnyTRPCMutationProcedure> = {
	setData: (
		variables: inferProcedureInput<Procedure>,
		data: inferProcedureOutput<Procedure>,
	) => void;
	invalidate: (variables: inferProcedureInput<Procedure>) => Promise<void>;
};
