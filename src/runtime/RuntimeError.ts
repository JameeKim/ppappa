import { PpappaError } from "../PpappaError";

export class RuntimeError extends PpappaError {
  get message(): string {
    return `[Ppappa] Runtime: ${this.messageInternal}`;
  }
}
