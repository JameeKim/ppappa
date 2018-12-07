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
  MOVE_R = "move to right",
  MOVE_L = "move to left",
  DUPLICATE = "duplicate number",
  NOOP = "noop",
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
  | TokenMoveRight
  | TokenMoveLeft
  | TokenDuplicate
  | TokenNoop
  | TokenSkip
  | TokenRepeat
  | TokenFlush
  | TokenComment;

export interface TokenEOF {
  readonly type: TokenType.EOF;
  readonly value: "\0";
}
export const eofToken: TokenEOF = Object.freeze<TokenEOF>({
  type: TokenType.EOF,
  value: "\0",
});

export interface TokenPointRight {
  readonly type: TokenType.POINT_R;
  readonly value: "끄아";
}
export interface TokenPointLeft {
  readonly type: TokenType.POINT_L;
  readonly value: "끄어";
}
export const pointerRightToken: TokenPointRight = Object.freeze<TokenPointRight>({
  type: TokenType.POINT_R,
  value: "끄아",
});
export const pointerLeftToken: TokenPointLeft = Object.freeze<TokenPointLeft>({
  type: TokenType.POINT_L,
  value: "끄어",
});

export interface TokenInsert {
  readonly type: TokenType.INSERT;
  readonly value: "느아";
}
export interface TokenRetrieve {
  readonly type: TokenType.RETRIEVE;
  readonly value: "느어";
}
export const insertToken: TokenInsert = Object.freeze<TokenInsert>({
  type: TokenType.INSERT,
  value: "느아",
});
export const retrieveToken: TokenRetrieve = Object.freeze<TokenRetrieve>({
  type: TokenType.RETRIEVE,
  value: "느어",
});

export interface TokenAdd {
  readonly type: TokenType.ADD;
  readonly value: "므아";
}
export interface TokenSubtract {
  readonly type: TokenType.SUB;
  readonly value: "므어";
}
export const addToken: TokenAdd = Object.freeze<TokenAdd>({
  type: TokenType.ADD,
  value: "므아",
});
export const subtractToken: TokenSubtract = Object.freeze<TokenSubtract>({
  type: TokenType.SUB,
  value: "므어",
});

export interface TokenMultiply {
  readonly type: TokenType.MUL;
  readonly value: "쁘아";
}
export interface TokenDivide {
  readonly type: TokenType.DIV;
  readonly value: "쁘어";
}
export const multiplyToken: TokenMultiply = Object.freeze<TokenMultiply>({
  type: TokenType.MUL,
  value: "쁘아",
});
export const divideToken: TokenDivide = Object.freeze<TokenDivide>({
  type: TokenType.DIV,
  value: "쁘어",
});

export interface TokenSwitch {
  readonly type: TokenType.SWITCH;
  readonly value: "뜨아";
}
export interface TokenPrint {
  readonly type: TokenType.PRINT;
  readonly value: "뜨어";
}
export const switchToken: TokenSwitch = Object.freeze<TokenSwitch>({
  type: TokenType.SWITCH,
  value: "뜨아",
});
export const printToken: TokenPrint = Object.freeze<TokenPrint>({
  type: TokenType.PRINT,
  value: "뜨어",
});

export interface TokenMoveRight {
  readonly type: TokenType.MOVE_R;
  readonly value: "흐아";
}
export interface TokenMoveLeft {
  readonly type: TokenType.MOVE_L;
  readonly value: "흐어";
}
export const moveRightToken: TokenMoveRight = Object.freeze<TokenMoveRight>({
  type: TokenType.MOVE_R,
  value: "흐아",
});
export const moveLeftToken: TokenMoveLeft = Object.freeze<TokenMoveLeft>({
  type: TokenType.MOVE_L,
  value: "흐어",
});

export interface TokenDuplicate {
  readonly type: TokenType.DUPLICATE;
  readonly value: "크아";
}
export interface TokenNoop {
  readonly type: TokenType.NOOP;
  readonly value: "크어";
}
export const duplicateToken: TokenDuplicate = Object.freeze<TokenDuplicate>({
  type: TokenType.DUPLICATE,
  value: "크아",
});
export const noopToken: TokenNoop = Object.freeze<TokenNoop>({
  type: TokenType.NOOP,
  value: "크어",
});

export interface TokenSkip {
  readonly type: TokenType.SKIP;
  readonly value: "으아";
}
export interface TokenRepeat {
  readonly type: TokenType.REPEAT;
  readonly value: "으어";
}
export const skipToken: TokenSkip = Object.freeze<TokenSkip>({
  type: TokenType.SKIP,
  value: "으아",
});
export const repeatToken: TokenRepeat = Object.freeze<TokenRepeat>({
  type: TokenType.REPEAT,
  value: "으어",
});

export interface TokenFlush {
  readonly type: TokenType.FLUSH;
  readonly value: "_ (○_○)_P";
}
export const flushToken: TokenFlush = Object.freeze<TokenFlush>({
  type: TokenType.FLUSH,
  value: "_ (○_○)_P",
});

export interface TokenComment {
  readonly type: TokenType.COMMENT;
  readonly value: string;
}
