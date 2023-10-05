import type { AnyMutationProcedure, inferProcedureInput, inferProcedureOutput } from "@trpc/server";

export type OptimisticRelatedProcedures<
  Procedure extends AnyMutationProcedure,
  Context extends object | undefined = undefined,
> = RelatedProcedures<Procedure> & {
  cancel: (variables: inferProcedureInput<Procedure>) => Promise<void>;
  getData: (variables: inferProcedureInput<Procedure>) => Partial<Context>;
  revertData: (variables: inferProcedureInput<Procedure>, context?: Partial<Context>) => void;
};

export type RelatedProcedures<Procedure extends AnyMutationProcedure> = {
  setData: (
    variables: inferProcedureInput<Procedure>,
    data: inferProcedureOutput<Procedure>,
  ) => void;
  invalidate: (variables: inferProcedureInput<Procedure>) => Promise<void>;
};
