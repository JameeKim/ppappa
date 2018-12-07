import { AstDirectionNode } from "./ast";
import { buildAst, IBuildAstOption } from "./buildAst";
import { getTokens, IGetTokensOptions } from "./getTokens";

export interface IParseOption extends IGetTokensOptions, IBuildAstOption {}

export function parse(src: string | Buffer, options: IParseOption = {}): AstDirectionNode[] {
  return buildAst(getTokens(src, options), options);
}
