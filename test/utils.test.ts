import { isEmptyArray } from "../src/utils";

describe("utils", () => {
  it("should check if an array is empty", () => {
    expect(isEmptyArray([1, 2, 3])).toBe(false);
    expect(isEmptyArray([])).toBe(true);
  });
});
