import { DataStorageError } from "./DataStorageError";
import { Output } from "./Output";
import { Queue } from "./Queue";
import { Stack } from "./Stack";
import { IOutput, IStorage } from "./types";

export interface IDataContainerConstructorOption {
  storages?: IStorage[];
  output?: Output;
  data?: number[][];
  content?: number[];
}

export type StoragePointer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IDataContainerState {
  data: number[][];
  outputContent: number[];
}

type Omit<T, k extends keyof T> = Pick<T, Exclude<keyof T, k>>;

export class DataContainer implements Omit<IStorage, "rawData">, Omit<IOutput, "put"> {
  protected readonly storages: IStorage[];
  protected readonly output: Output;
  protected pointer: StoragePointer = 0;

  get currentPointer(): StoragePointer {
    return this.pointer;
  }

  public constructor({ data, storages, content, output }: IDataContainerConstructorOption = {}) {
    if (data) {
      if (
        !Array.isArray(data)
        || data.length !== 8
        || data.some(
          (maybeNumArr) => !Array.isArray(maybeNumArr) || maybeNumArr.some((maybeNum) => typeof maybeNum !== "number"),
        )
      ) {
        throw new DataStorageError(
          "Data for data container must be an array of length 8, containing arrays of numbers only",
        );
      }
      this.storages = data.map((arr, index) => index < 7 ? new Stack(arr) : new Queue(arr));
    } else {
      if (storages) {
        if (
          !Array.isArray(storages)
          || storages.length !== 8
          || storages.slice(0, 7).some((maybeStack) => !(maybeStack instanceof Stack))
          || !(storages[7] instanceof Queue)
        ) {
          throw new DataStorageError(
            "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
          );
        }
        this.storages = storages;
      } else {
        this.storages = [
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Queue(),
        ];
      }
    }
    if (content) {
      if (!Array.isArray(content) || content.some((maybeNumber) => typeof maybeNumber !== "number")) {
        throw new DataStorageError("Output content for data container should be an array of numbers only");
      }
      this.output = new Output(content);
    } else {
      if (output) {
        if (!(output instanceof Output)) {
          throw new DataStorageError("Output for data container should be an instance of Output");
        }
        this.output = output;
      } else {
        this.output = new Output();
      }
    }
  }

  public movePointer(direction: 1 | -1): void {
    if (direction > 0) {
      if (this.pointer > 6) {
        this.pointer = 0;
      } else {
        this.pointer++;
      }
    } else if (direction < 0) {
      if (this.pointer < 1) {
        this.pointer = 7;
      } else {
        this.pointer--;
      }
    } else {
      throw new DataStorageError("DataContainer.prototype.movePointer only accepts arg larger or less than 0");
    }
  }

  public insert(): void {
    this.storages[this.pointer].insert();
  }

  public retrieve(): number | undefined {
    return this.storages[this.pointer].retrieve();
  }

  public add(): void {
    this.storages[this.pointer].add();
  }

  public sub(): void {
    this.storages[this.pointer].sub();
  }

  public mul(): void {
    this.storages[this.pointer].mul();
  }

  public div(): void {
    this.storages[this.pointer].div();
  }

  public switch(): void {
    this.storages[this.pointer].switch();
  }

  public print(): void {
    const charPoint: number | undefined = this.retrieve();
    if (charPoint !== undefined) {
      this.output.put(charPoint);
    }
  }

  public flush(): void {
    this.output.flush();
  }

  public rawData(): number[][] {
    return this.storages.map((storage) => storage.rawData());
  }

  public rawContent(): number[] {
    return this.output.rawContent();
  }

  public rawState(): IDataContainerState {
    return { data: this.rawData(), outputContent: this.rawContent() };
  }

  public dataToJSON(): string {
    return JSON.stringify(this.rawData());
  }

  public contentToJSON(): string {
    return this.output.contentToJSON();
  }

  public stateToJSON(): string {
    return JSON.stringify(this.rawState());
  }
}
