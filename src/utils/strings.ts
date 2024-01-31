export const capitalize = <S extends string>(s: S): Capitalize<S> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  `${s.slice(0, 1).toUpperCase()}${s.slice(1).toLowerCase()}` as Capitalize<S>;
