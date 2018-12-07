import { expect } from "chai";
import { stub } from "sinon";
import { RuntimeError } from "../RuntimeError";
import { DataContainer, IDataContainerConstructorOption } from "./DataContainer";
import { DataStorageError } from "./DataStorageError";
import { Output } from "./Output";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

const arrOf8NumArrs: number[][] = Array(8).fill(0).map(() => []);

export function testDataContainer(): void {
  describe("#DataContainer", function() {
    describe("- Construct", function() {
      function checkData(options: IDataContainerConstructorOption, data: number[][], content: number[]): void {
        const container = new DataContainer(options);
        // @ts-ignore: access to protected member "storages" of DataContainer
        const storages = container.storages;
        // @ts-ignore: access to protected member "output" of DataContainer
        const output = container.output;
        // @ts-ignore: access to protected member "data" of Stack/Queue
        expect(storages.map((storage) => storage.data)).to.deep.eq(data);
        expect(output.rawContent()).to.deep.eq(content);
      }

      it("without any args", function() {
        checkData({}, arrOf8NumArrs, []);
      });

      it("with data only", function() {
        const data: number[][] = [[1, 2], [3, 4], [5], [6, 7, 8], [9], [10], [11, 12, 13], [14, 15, 16]];
        checkData({ data }, data, []);
      });

      it("data not an array", function() {
        // @ts-ignore: arg data should be of type number[][]
        expect(() => new DataContainer({ data: "not an array" })).to.throw(
          DataStorageError,
          "Data for data container must be an array of length 8, containing arrays of numbers only",
        );
      });

      it("data not length of 8", function() {
        expect(() => new DataContainer({ data: [[], [], []] })).to.throw(
          DataStorageError,
          "Data for data container must be an array of length 8, containing arrays of numbers only",
        );
      });

      it("data not an array of arrays", function() {
        // @ts-ignore: arg data should be of type number[][]
        expect(() => new DataContainer({ data: [[], "not an array", [], [], [], [], [], []] })).to.throw(
          DataStorageError,
          "Data for data container must be an array of length 8, containing arrays of numbers only",
        );
      });

      it("data not an array of arrays of numbers only", function() {
        // @ts-ignore: arg data should be of type number[][]
        expect(() => new DataContainer({ data: [[3, 4], ["not"], ["number"], [], [], [], [], []] })).to.throw(
          DataStorageError,
          "Data for data container must be an array of length 8, containing arrays of numbers only",
        );
      });

      it("with storages only", function() {
        checkData({ storages: [
          new Stack(),
          new Stack([1, 2]),
          new Stack([3]),
          new Stack(),
          new Stack(),
          new Stack([4, 5, 6]),
          new Stack(),
          new Queue([7]),
        ] }, [
          [],
          [1, 2],
          [3],
          [],
          [],
          [4, 5, 6],
          [],
          [7],
        ], []);
      });

      it("storages not an array", function() {
        // @ts-ignore: arg storages should be of type IStorage[]
        expect(() => new DataContainer({ storages: "not an array" })).to.throw(
          DataStorageError,
          "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
        );
      });

      it("storages not length of 8", function() {
        expect(() => new DataContainer({ storages: [new Stack(), new Queue()] })).to.throw(
          DataStorageError,
          "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
        );
      });

      it("storages not an array of Stacks or Queues only", function() {
        // @ts-ignore: arg storages should be of type IStorage[]
        expect(() => new DataContainer({ storages: [
          new Stack(),
          new Stack(),
          "not a stack or queue",
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Queue(),
        ] })).to.throw(
          DataStorageError,
          "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
        );
      });

      it("storages not an array of 7 Stacks and 1 Queue", function() {
        expect(() => new DataContainer({ storages: [
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Queue(),
          new Queue(),
        ] })).to.throw(
          DataStorageError,
          "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
        );
      });

      it("storages with last not Queue", function() {
        expect(() => new DataContainer({ storages: [
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
          new Stack(),
        ] })).to.throw(
          DataStorageError,
          "Storages for data container should be an array of length 8, with 7 Stacks and the last one Queue",
        );
      });

      it("storages ignored when data is given", function() {
        checkData({ data: arrOf8NumArrs, storages: [] }, arrOf8NumArrs, []);
      });

      it("with content only", function() {
        checkData({ content: [4, 8, 5, 3, 2] }, arrOf8NumArrs, [4, 8, 5, 3, 2]);
      });

      it("content not an array", function() {
        // @ts-ignore: arg content should be of type number[]
        expect(() => new DataContainer({ content: "not an array" })).to.throw(
          DataStorageError,
          "Output content for data container should be an array of numbers only",
        );
      });

      it("content not an array with numbers only", function() {
        // @ts-ignore: arg content should be of type number[]
        expect(() => new DataContainer({ content: [0, "not number"] })).to.throw(
          DataStorageError,
          "Output content for data container should be an array of numbers only",
        );
      });

      it("with output only", function() {
        checkData({ output: new Output({ content: [33] }) }, arrOf8NumArrs, [33]);
      });

      it("output not an instance of Output", function() {
        // @ts-ignore: arg output should be an instance of Output
        expect(() => new DataContainer({ output: "not Output" })).to.throw(
          DataStorageError,
          "Output for data container should be an instance of Output",
        );
      });

      it("output ignored when content is given", function() {
        checkData({ content: [49, 43, 49], output: new Output() }, arrOf8NumArrs, [49, 43, 49]);
      });

      it("combined args", function() {
        const data: number[][] = [[], [], [], [], [1], [], [], []];
        const content: number[] = [49, 32, 43, 32, 50];
        checkData({ data, storages: [], content, output: new Output() }, data, content);
      });
    });

    describe("- Showing data and content", function() {
      const data: number[][] = [[], [1, 2], [], [], [], [3], [], [4, 5]];
      const content: number[] = [1, 2, 3];
      const container = new DataContainer({ data, content });

      it("raw data should be exactly same to the real data", function() {
        expect(container.rawData()).to.deep.eq(data);
      });

      it("raw content should be exactly same to the real content", function() {
        expect(container.rawContent()).to.deep.eq(content);
      });

      it("raw state should be exactly same to the real state", function() {
        expect(container.rawState()).to.deep.eq({ data, outputContent: content });
      });

      it("raw data is a copy, not the original array", function() {
        const dataCopy = container.rawData();
        dataCopy[2].push(6);
        dataCopy[6].push(7);
        expect(dataCopy).to.deep.eq([[], [1, 2], [6], [], [], [3], [7], [4, 5]]);
        expect(container.rawData()).to.deep.eq(data);
      });

      it("raw content is a copy, not the original array", function() {
        const contentCopy = container.rawContent();
        contentCopy.push(4, 5, 6, 7);
        expect(contentCopy).to.deep.eq([1, 2, 3, 4, 5, 6, 7]);
        expect(container.rawContent()).to.deep.eq(content);
      });

      it("raw state is a copy, not the original state", function() {
        const stateCopy = container.rawState();
        stateCopy.data[2].push(6);
        stateCopy.data[6].push(7);
        stateCopy.outputContent.push(4, 5, 6, 7);
        expect(stateCopy).to.deep.eq({
          data: [[], [1, 2], [6], [], [], [3], [7], [4, 5]],
          outputContent: [1, 2, 3, 4, 5, 6, 7],
        });
        expect(container.rawState()).to.deep.eq({ data, outputContent: content });
      });

      it("JSON output for data", function() {
        expect(container.dataToJSON()).to.eq(JSON.stringify(data));
      });

      it("JSON output for content", function() {
        expect(container.contentToJSON()).to.eq(JSON.stringify(content));
      });

      it("JSON output for state", function() {
        expect(container.stateToJSON()).to.eq(JSON.stringify({ data, outputContent: content }));
      });
    });

    describe("- Pointer movement", function() {
      let container: DataContainer;

      beforeEach(function() {
        container = new DataContainer();
      });

      it("pointer initialized to 0", function() {
        expect(container.currentPointer).to.eq(0);
      });

      it("moving to right increments the pointer value", function() {
        container.movePointer(1);
        expect(container.currentPointer).to.eq(1);
        container.movePointer(1);
        expect(container.currentPointer).to.eq(2);
      });

      it("moving to left decrements the pointer value", function() {
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(-1);
        expect(container.currentPointer).to.eq(1);
        container.movePointer(-1);
        expect(container.currentPointer).to.eq(0);
      });

      it("moving to right at pointer value 7 takes it back to 0", function() {
        // @ts-ignore: write access to protected property "pointer" of DataContainer
        container.pointer = 7;
        container.movePointer(1);
        expect(container.currentPointer).to.eq(0);
      });

      it("moving to left at pointer value 0 takes it to 7", function() {
        container.movePointer(-1);
        expect(container.currentPointer).to.eq(7);
      });

      it("direction argument should not be 0", function() {
        // @ts-ignore: arg to "movePointer" of DataContainer should be either 1 or -1
        expect(() => container.movePointer(0))
          .to.throw(DataStorageError, "DataContainer.prototype.movePointer only accepts arg larger or less than 0");
        // @ts-ignore: arg to "movePointer" of DataContainer should be either 1 or -1
        expect(() => container.movePointer(false))
          .to.throw(DataStorageError, "DataContainer.prototype.movePointer only accepts arg larger or less than 0");
      });
    });

    describe("- Data positioning", function() {
      const data: number[][] = [[], [3, 2], [], [3, 4, 5], [], [1], [], [6, 1, 5]];
      let container: DataContainer;

      beforeEach(function() {
        container = new DataContainer({ data });
      });

      it("insert", function() {
        container.insert();
        container.movePointer(-1);
        container.insert();
        container.movePointer(-1);
        container.movePointer(-1);
        container.insert();
        expect(container.rawData()).to.deep.eq([[0], [3, 2], [], [3, 4, 5], [], [1, 0], [], [6, 1, 5, 0]]);
      });

      it("retrieve", function() {
        expect(container.retrieve()).to.eq(undefined);
        container.movePointer(1);
        expect(container.retrieve()).to.eq(2);
        container.movePointer(-1);
        container.movePointer(-1);
        expect(container.retrieve()).to.eq(6);
        expect(container.rawData()).to.deep.eq([[], [3], [], [3, 4, 5], [], [1], [], [1, 5]]);
      });

      it("switch", function() {
        container.switch();
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.switch();
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.switch();
        container.movePointer(-1);
        container.movePointer(-1);
        container.switch();
        expect(container.rawData()).to.deep.eq([[], [3, 2], [], [3, 5, 4], [], [1], [], [1, 6, 5]]);
      });

      it("moveRight");
      it("moveLeft");
      it("duplicate");
    });

    describe("- Current value", function() {
      it("currentValue", function() {
        const container = new DataContainer({ data: [[1, 2], [], [], [], [], [], [], [1, 2]] });
        expect(container.currentValue).to.eq(2);
        container.movePointer(-1);
        expect(container.currentValue).to.eq(1);
        container.movePointer(-1);
        expect(container.currentValue).to.eq(undefined);
      });
    });

    describe("- Output management", function() {
      it("print (moving data to output)", function() {
        const container = new DataContainer({ data: [[2, 7], [], [], [0, 3], [], [], [1], [5, 1]] });
        container.print();
        container.movePointer(-1);
        container.print();
        container.movePointer(-1);
        container.movePointer(-1);
        container.print();
        container.movePointer(-1);
        container.movePointer(-1);
        container.print();
        expect(container.rawState()).to.deep.eq({
          data: [[2], [], [], [0], [], [], [1], [1]],
          outputContent: [7, 5, 3],
        });
      });

      it("flush", function() {
        // TODO use spy instead
        const consoleStub = stub(console, "log");
        const container = new DataContainer({ content: [49240, 50500, 49240, 50500] });
        container.flush();
        expect(consoleStub).to.be.calledOnceWithExactly("쁘아쁘아");
        expect(container.contentToJSON()).to.eq("[]");
        consoleStub.restore();
      });
    });

    describe("- Math operations", function() {
      const data: number[][] = [[], [3, 2], [], [3, 4, 5], [], [1], [], [6, 1]];
      let container: DataContainer;

      beforeEach(function() {
        container = new DataContainer({ data });
      });

      it("add", function() {
        expect(() => container.add()).to.throw(RuntimeError, "Tried addition when stack is empty");
        container.movePointer(1);
        container.add();
        container.movePointer(-1);
        container.movePointer(-1);
        container.add();
        expect(container.rawData()).to.deep.eq([[], [3, 3], [], [3, 4, 5], [], [1], [], [7, 1]]);
        container.retrieve();
        container.retrieve();
        expect(() => container.add()).to.throw(RuntimeError, "Tried addition when queue is empty");
      });

      it("subtract", function() {
        expect(() => container.sub()).to.throw(RuntimeError, "Tried subtraction when stack is empty");
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.sub();
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.sub();
        expect(container.rawData()).to.deep.eq([[], [3, 2], [], [3, 4, 4], [], [1], [], [5, 1]]);
        container.retrieve();
        container.retrieve();
        expect(() => container.sub()).to.throw(RuntimeError, "Tried subtraction when queue is empty");
      });

      it("multiply", function() {
        expect(() => container.mul()).to.throw(RuntimeError, "Tried multiplication when stack is empty");
        container.movePointer(1);
        container.mul();
        container.movePointer(-1);
        container.movePointer(-1);
        container.mul();
        expect(container.rawData()).to.deep.eq([[], [3, 4], [], [3, 4, 5], [], [1], [], [12, 1]]);
        container.retrieve();
        container.retrieve();
        expect(() => container.mul()).to.throw(RuntimeError, "Tried multiplication when queue is empty");
      });

      it("divide", function() {
        expect(() => container.div()).to.throw(RuntimeError, "Tried division when stack is empty");
        container.movePointer(1);
        container.movePointer(1);
        container.movePointer(1);
        container.div();
        container.movePointer(1);
        container.movePointer(1);
        container.div();
        container.movePointer(1);
        container.movePointer(1);
        container.div();
        container.div();
        expect(container.rawData()).to.deep.eq([[], [3, 2], [], [3, 4, 2], [], [0], [], [1, 1]]);
        container.retrieve();
        container.retrieve();
        expect(() => container.div()).to.throw(RuntimeError, "Tried division when queue is empty");
      });
    });
  });
}
