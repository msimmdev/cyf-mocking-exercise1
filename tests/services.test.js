import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { countStudents } from "../services.js";
import { getStudents } from "../data.js";

describe("count students", () => {
  beforeAll(() => {
    vi.mock("../data.js", (importOriginal) => {
      return {
        ...importOriginal(),
        getStudents: vi.fn(),
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return expected count", () => {
    vi.mocked(getStudents).mockReturnValue(["Michael"]);

    const count = countStudents();
    expect(count).toBe(1);
  });

  it("should return null when error is thrown", () => {
    // Arrange
    vi.mocked(getStudents).mockImplementation(() => {
      throw new Error("Invalid Operation Error");
    });

    // Act
    const count = countStudents();

    // Assert
    expect(count).toBeNull();
  });
});
