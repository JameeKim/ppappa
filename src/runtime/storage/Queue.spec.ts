import { expect } from "chai";
import { RuntimeError } from "../RuntimeError";
import { DataStorageError } from "./DataStorageError";
import { Queue } from "./Queue";

/**
 * suite: Data Storage
 */
export function testQueue(): void {
  describe("#Queue", function() {
    describe("- Construct", function() {
      it("without data", function() {
        const queue = new Queue();
        // @ts-ignore: access to protected member "data"
        expect(queue.data).to.be.an("array").of.length(0);
      });

      it("with data", function() {
        const queue = new Queue([1, 2, 3]);
        // @ts-ignore: access to protected member "data"
        expect(queue.data).to.deep.eq([1, 2, 3]);
      });

      it("data not array", function() {
        // @ts-ignore: arg for Queue constructor should be number[]
        expect(() => new Queue("not an array"))
          .to.throw(DataStorageError, "Data for a queue should be an array of numbers only");
      });

      it("data array containing non-number", function() {
        // @ts-ignore: arg for Queue constructor should be number[]
        expect(() => new Queue([1, 2, "3", 4, 5]))
          .to.throw(DataStorageError, "Data for a queue should be an array of numbers only");
      });
    });

    describe("- Showing data", function() {
      let queue: Queue;

      beforeEach(function() {
        queue = new Queue([1, 2, 3]);
      });

      it("raw data should be exactly same to the real data", function() {
        expect(queue.rawData()).to.deep.eq([1, 2, 3]);
      });

      it("raw data is a copy, not the original array", function() {
        const copy = queue.rawData();
        copy[3] = 4;
        expect(copy).to.deep.eq([1, 2, 3, 4]);
        expect(queue.rawData()).to.deep.eq([1, 2, 3]);
      });

      it("JSON output", function() {
        // @ts-ignore: access to protected member "data"
        expect(queue.dataToJSON()).to.eq(JSON.stringify(queue.data));
      });
    });

    describe("- Data positioning", function() {
      let queue: Queue;

      beforeEach(function() {
        queue = new Queue([2, 4, 6]);
      });

      it("insert", function() {
        queue.insert();
        expect(queue.dataToJSON()).to.eq("[2,4,6,0]");
      });

      it("retrieve", function() {
        expect(queue.retrieve()).to.eq(2);
        expect(queue.dataToJSON()).to.eq("[4,6]");
      });

      it("retrieve when no data", function() {
        queue.retrieve();
        queue.retrieve();
        queue.retrieve();
        expect(queue.retrieve()).to.eq(undefined);
      });

      it("switch when more than 2 data", function() {
        queue.switch();
        expect(queue.dataToJSON()).to.eq("[4,2,6]");
      });

      it("switch when only 1 data", function() {
        queue.retrieve();
        queue.retrieve();
        queue.switch();
        expect(queue.dataToJSON()).to.eq("[6]");
      });

      it("switch when no data", function() {
        queue.retrieve();
        queue.retrieve();
        queue.retrieve();
        expect(queue.dataToJSON()).to.eq("[]");
      });

      it("duplicate");
    });

    describe("- Current value", function() {
      it("undefined if queue empty", function() {
        const queue = new Queue();
        expect(queue.currentValue).to.eq(undefined);
      });

      it("currentValue", function() {
        const queue = new Queue([2, 3]);
        expect(queue.currentValue).to.eq(2);
        queue.retrieve();
        expect(queue.currentValue).to.eq(3);
        queue.insert();
        expect(queue.currentValue).to.eq(3);
        queue.retrieve();
        expect(queue.currentValue).to.eq(0);
      });
    });

    describe("- Math operations", function() {
      describe("empty queue", function() {
        let queue: Queue;

        beforeEach(function() {
          queue = new Queue();
        });

        it("add", function() {
          expect(() => queue.add()).to.throw(RuntimeError, "Tried addition when queue is empty");
        });

        it("subtract", function() {
          expect(() => queue.sub()).to.throw(RuntimeError, "Tried subtraction when queue is empty");
        });

        it("multiply", function() {
          expect(() => queue.mul()).to.throw(RuntimeError, "Tried multiplication when queue is empty");
        });

        it("divide", function() {
          expect(() => queue.div()).to.throw(RuntimeError, "Tried division when queue is empty");
        });
      });

      describe("non-empty queue", function() {
        let queue: Queue;

        beforeEach(function() {
          queue = new Queue([1, 3, 5]);
        });

        it("add", function() {
          queue.add();
          expect(queue.dataToJSON()).to.eq("[2,3,5]");
        });

        it("subtract", function() {
          queue.sub();
          expect(queue.dataToJSON()).to.eq("[0,3,5]");
        });

        it("multiply", function() {
          queue.mul();
          expect(queue.dataToJSON()).to.eq("[2,3,5]");
        });

        it("divide", function() {
          queue.div();
          expect(queue.dataToJSON()).to.eq("[0,3,5]");
        });
      });
    });
  });
}
