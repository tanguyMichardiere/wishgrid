import type {
  AnyMutationProcedure,
  AnyQueryProcedure,
  inferProcedureInput,
  inferProcedureOutput,
} from "@trpc/server";

export type OptimisticRelatedProcedures<
  Procedure extends AnyMutationProcedure,
  Queries extends Array<AnyQueryProcedure> | undefined = undefined,
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

export type RelatedProcedures<Procedure extends AnyMutationProcedure> = {
  setData: (
    variables: inferProcedureInput<Procedure>,
    data: inferProcedureOutput<Procedure>,
  ) => void;
  invalidate: (variables: inferProcedureInput<Procedure>) => Promise<void>;
};
