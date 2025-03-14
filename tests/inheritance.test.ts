import { calculateInheritance } from "../src/inheritance";

describe("Islamic Inheritance Calculator", () => {
  test("should correctly distribute inheritance when there is only a wife", () => {
    const result = calculateInheritance(1000000, { spouse: "wife", children: false });
    expect(result.shares.spouse).toBe(250000);
  });

  test("should correctly distribute inheritance when there is a wife and children", () => {
    const result = calculateInheritance(1000000, { spouse: "wife", children: true });
    expect(result.shares.spouse).toBe(125000);
  });

  test("should correctly handle no spouse scenario", () => {
    const result = calculateInheritance(1000000, { spouse: undefined, children: true });
    expect(result.shares.spouse).toBeUndefined();
  });
});
