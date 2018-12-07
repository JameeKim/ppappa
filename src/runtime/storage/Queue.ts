import { DataStorage } from "./DataStorage";
import { IStorage } from "./types";

export class Queue extends DataStorage implements IStorage {
  get currentValue(): number | undefined {
    return this.data.length ? this.data[0] : undefined;
  }

  public constructor(data?: number[]) {
    super(data);
  }

  public insert(value?: number): void {
    this.data.push(value || 0);
  }

  public retrieve(): number | undefined {
    return this.data.shift();
  }

  public add(): void {
    this.throwIfEmpty("addition");
    this.data[0]++;
  }

  public sub(): void {
    this.throwIfEmpty("subtraction");
    this.data[0]--;
  }

  public mul(): void {
    this.throwIfEmpty("multiplication");
    this.data[0] = this.data[0] * 2;
  }

  public div(): void {
    this.throwIfEmpty("division");
    this.data[0] = Math.floor(this.data[0] / 2);
  }

  public switch(): void {
    if (this.data.length < 2) {
      return;
    }
    const { first, second } = { first: this.data[0], second: this.data[1] };
    this.data[0] = second;
    this.data[1] = first;
  }

  public duplicate(): void {
    this.throwIfEmpty("duplicating");
    this.data.push(this.data[0]);
  }
}
