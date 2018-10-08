// tslint:disable interface-name

export enum TokenType {
  EOF = "end of file",
  POINT_R = "move pointer right",
  POINT_L = "move pointer left",
  INSERT = "insert 0",
  RETRIEVE = "pull out",
  ADD = "add 1",
  SUB = "subtract 1",
  MUL = "multiply 2",
  DIV = "divide by 2",
  SWITCH = "switch two from top or front",
  PRINT = "move to output",
  SKIP = "skip of 0",
  REPEAT = "repeat if not 0",
  FLUSH = "flush output",
  COMMENT = "comment",
}

export type Token =
  | TokenEOF
  | TokenPointRight
  | TokenPointLeft
  | TokenInsert
  | TokenRetrieve
  | TokenAdd
  | TokenSubtract
  | TokenMultiply
  | TokenDivide
  | TokenSwitch
  | TokenPrint
  | TokenSkip
  | TokenRepeat
  | TokenFlush
  | TokenComment;

export interface TokenEOF {
  type: TokenType.EOF;
  value: "\0";
}

export interface TokenPointRight {
  type: TokenType.POINT_R;
  value: "끄아";
}
export interface TokenPointLeft {
  type: TokenType.POINT_L;
  value: "끄어";
}

export interface TokenInsert {
  type: TokenType.INSERT;
  value: "느아";
}
export interface TokenRetrieve {
  type: TokenType.RETRIEVE;
  value: "느어";
}

export interface TokenAdd {
  type: TokenType.ADD;
  value: "므아";
}
export interface TokenSubtract {
  type: TokenType.SUB;
  value: "므어";
}

export interface TokenMultiply {
  type: TokenType.MUL;
  value: "쁘아";
}
export interface TokenDivide {
  type: TokenType.DIV;
  value: "쁘어";
}

export interface TokenSwitch {
  type: TokenType.SWITCH;
  value: "뜨아";
}
export interface TokenPrint {
  type: TokenType.PRINT;
  value: "뜨어";
}

export interface TokenSkip {
  type: TokenType.SKIP;
  value: "으아";
}
export interface TokenRepeat {
  type: TokenType.REPEAT;
  value: "으어";
}

export interface TokenFlush {
  type: TokenType.FLUSH;
  value: "_ (○_○)_P";
}
export interface TokenComment {
  type: TokenType.COMMENT;
  value: string;
}
