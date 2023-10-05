import "client-only";
import { create } from "zustand";

type OptimisticUpdatesState = {
  durations: Array<number>;
  hasErrored: boolean;
  recordDuration: (duration: number) => void;
  recordError: () => void;
};

const useOptimisticUpdatesStore = create<OptimisticUpdatesState>((set) => ({
  durations: [],
  hasErrored: false,
  recordDuration(duration) {
    set(function ({ durations, hasErrored }) {
      if (hasErrored) {
        return {};
      }
      return { durations: [...durations.slice(-4), duration] };
    });
  },
  recordError() {
    set({ hasErrored: true });
  },
}));

if (typeof window !== "undefined") {
  const { recordDuration, recordError } = useOptimisticUpdatesStore.getState();

  window.fetch = new Proxy(window.fetch, {
    async apply(fetch, thisArg, argArray: Parameters<typeof window.fetch>) {
      if (typeof argArray[0] !== "string" || !argArray[0].startsWith("/api")) {
        return Reflect.apply(fetch, thisArg, argArray);
      }
      const start = Date.now();
      const response = await Reflect.apply(fetch, thisArg, argArray);
      console.log(argArray[0].substring(5).split("?")[0], Date.now() - start);
      if (response.ok) {
        recordDuration(Date.now() - start);
      } else {
        recordError();
      }
      return response;
    },
  });
}

export function useOptimisticUpdates(): boolean {
  const durations = useOptimisticUpdatesStore((state) => state.durations);
  const hasErrored = useOptimisticUpdatesStore((state) => state.hasErrored);

  return (
    !hasErrored &&
    durations.length > 0 &&
    durations.reduce((p, c) => p + c) / durations.length < 100
  );
}
