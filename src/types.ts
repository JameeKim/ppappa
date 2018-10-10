export type Omit<T, k extends keyof T> = Pick<T, Exclude<keyof T, k>>;
