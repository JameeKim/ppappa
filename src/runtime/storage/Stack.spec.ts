import { expect } from "chai";
import { RuntimeError } from "../RuntimeError";
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
        // @ts-ignore: access to protected member "data"
        expect(stack.data).to.be.an("array").of.length(0);
      });

      it("with data", function() {
        const stack = new Stack([1, 2, 3]);
        // @ts-ignore: access to protected member "data"
        expect(stack.data).to.deep.eq([1, 2, 3]);
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
      let stack: Stack;

      beforeEach(function() {
        stack = new Stack([1, 2, 3]);
      });

      it("raw data should be exactly same to the real data", function() {
        expect(stack.rawData()).to.deep.eq([1, 2, 3]);
      });

      it("raw data is a copy, not the original array", function() {
        const copy = stack.rawData();
        copy[3] = 4;
        expect(copy).to.deep.eq([1, 2, 3, 4]);
        expect(stack.rawData()).to.deep.eq([1, 2, 3]);
      });

      it("JSON output", function() {
        // @ts-ignore: access to protected member "data"
        expect(stack.dataToJSON()).to.eq(JSON.stringify(stack.data));
      });
    });

    describe("- Data positioning", function() {
      let stack: Stack;

      beforeEach(function() {
        stack = new Stack([2, 4, 6]);
      });

      it("insert", function() {
        stack.insert();
        expect(stack.dataToJSON()).to.eq("[2,4,6,0]");
      });

      it("retrieve", function() {
        expect(stack.retrieve()).to.eq(6);
        expect(stack.dataToJSON()).to.eq("[2,4]");
      });

      it("retrieve when no data", function() {
        stack.retrieve();
        stack.retrieve();
        stack.retrieve();
        expect(stack.retrieve()).to.eq(undefined);
      });

      it("switch when more than 2 data", function() {
        stack.switch();
        expect(stack.dataToJSON()).to.eq("[2,6,4]");
      });

      it("switch when only 1 data", function() {
        stack.retrieve();
        stack.retrieve();
        stack.switch();
        expect(stack.dataToJSON()).to.eq("[2]");
      });

      it("switch when no data", function() {
        stack.retrieve();
        stack.retrieve();
        stack.retrieve();
        expect(stack.dataToJSON()).to.eq("[]");
      });
    });

    describe("- Math operations", function() {
      describe("empty stack", function() {
        let stack: Stack;

        beforeEach(function() {
          stack = new Stack();
        });

        it("add", function() {
          expect(() => stack.add()).to.throw(RuntimeError, "Tried addition when stack is empty");
        });

        it("subtract", function() {
          expect(() => stack.sub()).to.throw(RuntimeError, "Tried subtraction when stack is empty");
        });

        it("multiply", function() {
          expect(() => stack.mul()).to.throw(RuntimeError, "Tried multiplication when stack is empty");
        });

        it("divide", function() {
          expect(() => stack.div()).to.throw(RuntimeError, "Tried division when stack is empty");
        });
      });

      describe("non-empty stack", function() {
        let stack: Stack;

        beforeEach(function() {
          stack = new Stack([1, 3, 5]);
        });

        it("add", function() {
          stack.add();
          expect(stack.dataToJSON()).to.eq("[1,3,6]");
        });

        it("subtract", function() {
          stack.sub();
          expect(stack.dataToJSON()).to.eq("[1,3,4]");
        });

        it("multiply", function() {
          stack.mul();
          expect(stack.dataToJSON()).to.eq("[1,3,10]");
        });

        it("divide", function() {
          stack.div();
          expect(stack.dataToJSON()).to.eq("[1,3,2]");
        });
      });
    });
  });
}
