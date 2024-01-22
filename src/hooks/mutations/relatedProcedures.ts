import type {
  AnyTRPCMutationProcedure,
  AnyTRPCQueryProcedure,
  inferProcedureInput,
  inferProcedureOutput,
} from "@trpc/server";

export type OptimisticRelatedProcedures<
  Procedure extends AnyTRPCMutationProcedure,
  Queries extends Array<AnyTRPCQueryProcedure> | undefined = undefined,
> = RelatedProcedures<Procedure> & {
  cancel: (variables: inferProcedureInput<Procedure>) => Promise<void>;
  getData: (variables: inferProcedureInput<Procedure>) => {
    [key in keyof Queries]: inferProcedureOutput<Queries[key]> | undefined;
  };
  revertData: (
    variables: inferProcedureInput<Procedure>,
    context: { [key in keyof Queries]: inferProcedureOutput<Queries[key]> | undefined },
  ) => void;
};

export type RelatedProcedures<Procedure extends AnyTRPCMutationProcedure> = {
  setData: (
    variables: inferProcedureInput<Procedure>,
    data: inferProcedureOutput<Procedure>,
  ) => void;
  invalidate: (variables: inferProcedureInput<Procedure>) => Promise<void>;
};
