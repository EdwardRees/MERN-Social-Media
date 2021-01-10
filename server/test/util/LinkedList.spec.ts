import chai, { expect } from "chai";
import { describe } from "mocha";
import { LinkedList } from "../../src/util/helper";

chai.use(require("chai-http"));
chai.should();

describe("LinkedList", () => {
  let numbers: LinkedList<number>;
  describe("Create", () => {
    it("should initialize LinkedList", (done: any) => {
      numbers = new LinkedList<number>();
      expect(typeof numbers).not.equals(undefined);
      done();
    });
    it("should be empty", (done: any) => {
      expect(numbers.size()).equal(0);
      done();
    });
    it(`should throw "Empty List" when accessing non-existent head`, (done: any) => {
      expect(() => numbers.get(0)).to.throw("Empty list, no head!");
      done();
    });
  });
  describe("Add", () => {
    describe("Add Head", () => {
      it("should successfully add an item.", (done: any) => {
        expect(numbers.add(1)).true;
        done();
      });
      it("size should be 1", (done: any) => {
        expect(numbers.size()).equals(1);
        done();
      });
    });

    describe("Add secondary", () => {
      it("should successfully add another item", (done: any) => {
        expect(numbers.add(2)).true;
        done();
      });
      it("size should be 2", (done: any) => {
        expect(numbers.size()).equals(2);
        done();
      });
    });
  });
  describe("addAll", () => {
    describe("Add all from an empty list", () => {
      it("should successfully add all", (done: any) => {
        let secondary: LinkedList<number> = new LinkedList<number>();
        expect(numbers.addAll(secondary)).true;
        done();
      });
    });
    describe("Add all from pre-populated list", () => {
      it("should successfully add all", (done: any) => {
        let secondary: LinkedList<number> = new LinkedList<number>();
        secondary.add(3);
        expect(numbers.addAll(secondary)).true;
        done();
      });
      it("should contain values from the added LinkedList", (done: any) => {
        expect(numbers.size()).equals(3);
        done();
      });
    });
  });
  describe("Contains", () => {
    it("should contain 1", (done: any) => {
      expect(numbers.contains(1)).true;
      done();
    });
    it("should not contain 4", (done: any) => {
      expect(numbers.contains(4)).false;
      done();
    });
  });
  describe("Get", () => {
    describe("Add Head", () => {
      it("accessing index 0 in the LinkedList should not give an Error", (done: any) => {
        expect(() => numbers.get(0)).to.not.throw("Empty list, no head!");
        done();
      });
      it("accessing index 0 in the LinkedList should give 1", (done: any) => {
        expect(numbers.get(0)).equals(1);
        done();
      });
    });
    describe("Add Secondary", () => {
      it("accessing index 1 in the LinkedList should not give an Error", (done: any) => {
        expect(() => numbers.get(1)).to.not.throw("Index out of bounds");
        done();
      });
      it("accessing index 1 in the LinkedList should give 2", (done: any) => {
        expect(numbers.get(1)).equals(2);
        done();
      });
    });
    describe("Add all from pre-populated list", () => {
      it("should not throw Index out of bounds!", (done: any) => {
        expect(() => numbers.get(2)).to.not.throw("Index out of bounds!");
        done();
      });
      it("should get 3 at index 2", (done: any) => { 
        expect(numbers.get(2)).equals(3);
        done();
      });
    });
  });
  describe("toString", () => {});
  describe("Remove", () => {});
  describe("Clear", () => {});
});
