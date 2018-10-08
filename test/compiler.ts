import { testBuildAst } from "../src/compiler/language/buildAst.spec";
import { testGetTokens } from "../src/compiler/language/getTokens.spec";

describe("Source Code Parsing", function() {
  testGetTokens();
  testBuildAst();
});
