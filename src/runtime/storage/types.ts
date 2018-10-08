export interface IStorage {
  insert(): void;
  retrieve(): number | undefined;
  add(): void;
  sub(): void;
  mul(): void;
  div(): void;
  switch(): void;
  rawData(): number[];
  dataToJSON(): string;
}

export interface IOutput {
  put(value: number): void;
  flush(): void;
  rawContent(): number[];
  contentToJSON(): string;
}
