import { PpappaError } from "../../PpappaError";

export class ParseError extends PpappaError {
  get message(): string {
    return `[Ppappa] Parse: ${this.messageInternal}`;
  }
}
