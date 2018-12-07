import { DataStorage } from "./DataStorage";
import { IStorage } from "./types";

export class Stack extends DataStorage implements IStorage {
  get currentValue(): number | undefined {
    return this.data.length ? this.data[this.data.length - 1] : undefined;
  }

  public constructor(data?: number[]) {
    super(data);
  }

  public insert(value?: number): void {
    this.data.push(value || 0);
  }

  public retrieve(): number | undefined {
    return this.data.pop();
  }

  public add(): void {
    this.throwIfEmpty("addition");
    this.data[this.data.length - 1]++;
  }

  public sub(): void {
    this.throwIfEmpty("subtraction");
    this.data[this.data.length - 1]--;
  }

  public mul(): void {
    this.throwIfEmpty("multiplication");
    this.data[this.data.length - 1] = this.data[this.data.length - 1] * 2;
  }

  public div(): void {
    this.throwIfEmpty("division");
    this.data[this.data.length - 1] = Math.floor(this.data[this.data.length - 1] / 2);
  }

  public switch(): void {
    const l: number = this.data.length;
    if (l < 2) {
      return;
    }
    const { top, second } = { top: this.data[l - 1], second: this.data[l - 2] };
    this.data[l - 1] = second;
    this.data[l - 2] = top;
  }

  public duplicate(): void {
    this.throwIfEmpty("duplicating");
    this.data.push(this.data[this.data.length - 1]);
  }
}
