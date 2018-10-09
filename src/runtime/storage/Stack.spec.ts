import { expect } from "chai";
import { DataStorageError } from "./DataStorageError";
import { Stack } from "./Stack";

/**
 * suite: Data Storage
 */
export function testStack(): void {
  describe("#Stack", function() {
    describe("- Construct", function() {
      it("without data", function() {
        const stack = new Stack();
        expect(stack.dataToJSON()).to.eq("[]");
      });

      it("with data", function() {
        const stack = new Stack([1, 2, 3]);
        expect(stack.dataToJSON()).to.eq("[1,2,3]");
      });

      it("data not array", function() {
        // @ts-ignore: arg for Stack constructor should be number[]
        expect(() => new Stack("not an array"))
          .to.throw(DataStorageError, "Data for a stack should be an array of numbers only");
      });

      it("data array containing non-number", function() {
        // @ts-ignore: arg for Stack constructor should be number[]
        expect(() => new Stack([1, 2, "3", 4, 5]))
          .to.throw(DataStorageError, "Data for a stack should be an array of numbers only");
      });
    });

    describe("- Showing data", function() {
      it("");
    });
  });
}
