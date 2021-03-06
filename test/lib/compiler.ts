import { testBuildAst } from "../../src/compiler/language/buildAst.spec";
import { testGetTokens } from "../../src/compiler/language/getTokens.spec";
import { testPrint } from "../../src/compiler/language/print.spec";

describe("Compiler", function() {
  describe("Source Code Parsing", function() {
    testGetTokens();
    testBuildAst();
    testPrint();
  });
});
