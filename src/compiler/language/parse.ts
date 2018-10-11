import { AstDirectionNode } from "./ast";
import { buildAst } from "./buildAst";
import { getTokens } from "./getTokens";

export function parse(src: string | Buffer): AstDirectionNode[] {
  return buildAst(getTokens(src));
}
