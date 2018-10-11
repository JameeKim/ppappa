import { expect } from "chai";
import { parse } from "./parse";
import { print } from "./print";

const testCases: string[] = [
  "느아므아쁘아쁘아쁘아뜨어_ (○_○)_P",
  "느아므아끄아느아므아쁘아쁘아므아으아므어끄어므아끄아으어끄어뜨어_ (○_○)_P",
];

export function testPrint(): void {
  describe("#print", function() {
    for (const testCase of testCases) {
      it(`print "${testCase}" from parsed ast`, function() {
        expect(print(parse(testCase))).to.eq(testCase);
      });
    }
  });
}
