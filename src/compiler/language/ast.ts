import {
  addToken,
  divideToken,
  duplicateToken,
  insertToken,
  moveLeftToken,
  moveRightToken,
  multiplyToken,
  pointerLeftToken,
  pointerRightToken,
  printToken,
  retrieveToken,
  subtractToken,
  switchToken,
  TokenAdd,
  TokenDivide,
  TokenDuplicate,
  TokenFlush,
  TokenInsert,
  TokenMoveLeft,
  TokenMoveRight,
  TokenMultiply,
  TokenPointLeft,
  TokenPointRight,
  TokenPrint,
  TokenRepeat,
  TokenRetrieve,
  TokenSkip,
  TokenSubtract,
  TokenSwitch,
} from "./token";

// tslint:disable interface-name

export type AstNode = ProgramNode | AstDirectionNode;

export type AstDirectionNode =
  | PointerNode
  | PositioningNode
  | MathOpNode
  | ControlNode
  | FlushNode;

export enum AstNodeType {
  POINTER = "pointer movement",
  POSITIONING = "data positioning",
  MATHOP = "mathematical operation",
  CONTROL = "flow-control",
  FLUSH = "output flush",
}

export interface ProgramNode {
  directions: AstDirectionNode[];
}

// tslint:disable-next-line no-empty-interface
export interface AstNodeBase {}

export type PointerNode = PointerRightNode | PointerLeftNode;
interface IPointerNode extends AstNodeBase {
  readonly type: AstNodeType.POINTER;
}
export interface PointerRightNode extends IPointerNode {
  readonly token: TokenPointRight;
  readonly direction: "right";
}
export interface PointerLeftNode extends IPointerNode {
  readonly token: TokenPointLeft;
  readonly direction: "left";
}
export const pointerRightDirection: PointerRightNode = Object.freeze<PointerRightNode>({
  type: AstNodeType.POINTER,
  direction: "right",
  token: pointerRightToken,
});
export const pointerLeftDirection: PointerLeftNode = Object.freeze<PointerLeftNode>({
  type: AstNodeType.POINTER,
  direction: "left",
  token: pointerLeftToken,
});

export type PositioningNode =
  | PositioningInsertNode
  | PositioningRetrieveNode
  | PositioningSwitchNode
  | PositioningPrintNode
  | PositioningMoveRightNode
  | PositioningMoveLeftNode
  | PositioningDuplicateNode;
interface IPositioningNode extends AstNodeBase {
  readonly type: AstNodeType.POSITIONING;
}
export interface PositioningInsertNode extends IPositioningNode {
  readonly token: TokenInsert;
  readonly action: "insert";
}
export interface PositioningRetrieveNode extends IPositioningNode {
  readonly token: TokenRetrieve;
  readonly action: "retrieve";
}
export interface PositioningSwitchNode extends IPositioningNode {
  readonly token: TokenSwitch;
  readonly action: "switch";
}
export interface PositioningPrintNode extends IPositioningNode {
  readonly token: TokenPrint;
  readonly action: "print";
}
export interface PositioningMoveRightNode extends IPositioningNode {
  readonly token: TokenMoveRight;
  readonly action: "moveRight";
}
export interface PositioningMoveLeftNode extends IPositioningNode {
  readonly token: TokenMoveLeft;
  readonly action: "moveLeft";
}
export interface PositioningDuplicateNode extends IPositioningNode {
  readonly token: TokenDuplicate;
  readonly action: "duplicate";
}
export const insertDirection: PositioningInsertNode = Object.freeze<PositioningInsertNode>({
  type: AstNodeType.POSITIONING,
  action: "insert",
  token: insertToken,
});
export const retrieveDirection: PositioningRetrieveNode = Object.freeze<PositioningRetrieveNode>({
  type: AstNodeType.POSITIONING,
  action: "retrieve",
  token: retrieveToken,
});
export const switchDirection: PositioningSwitchNode = Object.freeze<PositioningSwitchNode>({
  type: AstNodeType.POSITIONING,
  action: "switch",
  token: switchToken,
});
export const printDirection: PositioningPrintNode = Object.freeze<PositioningPrintNode>({
  type: AstNodeType.POSITIONING,
  action: "print",
  token: printToken,
});
export const moveRightDirection: PositioningMoveRightNode = Object.freeze<PositioningMoveRightNode>({
  type: AstNodeType.POSITIONING,
  action: "moveRight",
  token: moveRightToken,
});
export const moveLeftDirection: PositioningMoveLeftNode = Object.freeze<PositioningMoveLeftNode>({
  type: AstNodeType.POSITIONING,
  action: "moveLeft",
  token: moveLeftToken,
});
export const duplicateDirection: PositioningDuplicateNode = Object.freeze<PositioningDuplicateNode>({
  type: AstNodeType.POSITIONING,
  action: "duplicate",
  token: duplicateToken,
});

export type MathOpNode =
  | MathOpAddNode
  | MathOpSubtractNode
  | MathOpMultiplyNode
  | MathOpDivideNode;
interface IMathOpNode extends AstNodeBase {
  readonly type: AstNodeType.MATHOP;
}
export interface MathOpAddNode extends IMathOpNode {
  readonly token: TokenAdd;
  readonly operation: "+";
}
export interface MathOpSubtractNode extends IMathOpNode {
  readonly token: TokenSubtract;
  readonly operation: "-";
}
export interface MathOpMultiplyNode extends IMathOpNode {
  readonly token: TokenMultiply;
  readonly operation: "*";
}
export interface MathOpDivideNode extends IMathOpNode {
  readonly token: TokenDivide;
  readonly operation: "/";
}
export const addDirection: MathOpAddNode = Object.freeze<MathOpAddNode>({
  type: AstNodeType.MATHOP,
  operation: "+",
  token: addToken,
});
export const subtractDirection: MathOpSubtractNode = Object.freeze<MathOpSubtractNode>({
  type: AstNodeType.MATHOP,
  operation: "-",
  token: subtractToken,
});
export const multiplyDirection: MathOpMultiplyNode = Object.freeze<MathOpMultiplyNode>({
  type: AstNodeType.MATHOP,
  operation: "*",
  token: multiplyToken,
});
export const divideDirection: MathOpDivideNode = Object.freeze<MathOpDivideNode>({
  type: AstNodeType.MATHOP,
  operation: "/",
  token: divideToken,
});

export type ControlNode = ControlSkipRepeatNode;
interface IControlNode extends AstNodeBase {
  readonly type: AstNodeType.CONTROL;
}
export interface ControlSkipRepeatNode extends IControlNode {
  readonly startToken: TokenSkip;
  readonly endToken: TokenRepeat;
  readonly repeat: AstDirectionNode[];
}

export interface FlushNode extends AstNodeBase {
  readonly type: AstNodeType.FLUSH;
  readonly token: TokenFlush;
}
