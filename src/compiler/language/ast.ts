import {
  TokenAdd,
  TokenDivide,
  TokenFlush,
  TokenInsert,
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
  type: AstNodeType.POINTER;
}
export interface PointerRightNode extends IPointerNode {
  token: TokenPointRight;
  direction: "right";
}
export interface PointerLeftNode extends IPointerNode {
  token: TokenPointLeft;
  direction: "left";
}

export type PositioningNode =
  | PositioningInsertNode
  | PositioningRetrieveNode
  | PositioningSwitchNode
  | PositioningPrintNode;
interface IPositioningNode extends AstNodeBase {
  type: AstNodeType.POSITIONING;
}
export interface PositioningInsertNode extends IPositioningNode {
  token: TokenInsert;
  action: "insert";
}
export interface PositioningRetrieveNode extends IPositioningNode {
  token: TokenRetrieve;
  action: "retrieve";
}
export interface PositioningSwitchNode extends IPositioningNode {
  token: TokenSwitch;
  action: "switch";
}
export interface PositioningPrintNode extends IPositioningNode {
  token: TokenPrint;
  action: "print";
}

export type MathOpNode =
  | MathOpAddNode
  | MathOpSubtractNode
  | MathOpMultiplyNode
  | MathOpDivideNode;
interface IMathOpNode extends AstNodeBase {
  type: AstNodeType.MATHOP;
}
export interface MathOpAddNode extends IMathOpNode {
  token: TokenAdd;
  operation: "+";
}
export interface MathOpSubtractNode extends IMathOpNode {
  token: TokenSubtract;
  operation: "-";
}
export interface MathOpMultiplyNode extends IMathOpNode {
  token: TokenMultiply;
  operation: "*";
}
export interface MathOpDivideNode extends IMathOpNode {
  token: TokenDivide;
  operation: "/";
}

export type ControlNode = ControlSkipRepeatNode;
interface IControlNode extends AstNodeBase {
  type: AstNodeType.CONTROL;
}
export interface ControlSkipRepeatNode extends IControlNode {
  startToken: TokenSkip;
  endToken: TokenRepeat;
  repeat: AstDirectionNode[];
}

export interface FlushNode extends AstNodeBase {
  type: AstNodeType.FLUSH;
  token: TokenFlush;
}
