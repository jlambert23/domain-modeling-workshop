import { Result, ResultAsync } from "neverthrow";

type Effect = {
  <T, E>(fn: (arg: T) => Result<unknown, E>): (arg: T) => Result<T, E>;
  <T, E>(fn: (arg: T) => ResultAsync<unknown, E>): (
    arg: T,
  ) => ResultAsync<T, E>;
};

export const effect: Effect = (fn) => (res) => fn(res).map(() => res);
