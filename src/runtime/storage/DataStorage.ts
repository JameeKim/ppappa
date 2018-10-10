import { Omit } from "../../types";
import { DataStorageError } from "./DataStorageError";
import { IStorage } from "./types";

export abstract class DataStorage implements Omit<IStorage, "currentValue"> {
  protected readonly data: number[];

  protected constructor(data?: number[]) {
    if (data) {
      if (!Array.isArray(data) || data.some((maybeNumber) => typeof maybeNumber !== "number")) {
        throw new DataStorageError(
          `Data for a ${new.target.name.toLowerCase()} should be an array of numbers only, received ${data}`,
        );
      }
      this.data = data.slice(0);
    } else {
      this.data = [];
    }
  }

  public abstract insert(): void;

  public abstract retrieve(): number | undefined;

  public abstract add(): void;

  public abstract sub(): void;

  public abstract mul(): void;

  public abstract div(): void;

  public abstract switch(): void;

  public rawData(): number[] {
    return this.data.slice(0);
  }

  public dataToJSON(): string {
    return JSON.stringify(this.data);
  }
}
