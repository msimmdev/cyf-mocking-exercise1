import { describe, it, expect, afterEach } from "vitest";
import { getCatFacts } from "../api-data.js";
import nock from "nock";

describe("API Data get cat facts", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should get facts", async () => {
    // Arrange
    const scope = nock("https://catfact.ninja")
      .get("/facts")
      .reply(
        200,
        JSON.stringify({
          data: [
            {
              fact: "Test Fact",
              length: 9,
            },
          ],
        })
      );

    // Act
    const returnData = await getCatFacts();

    // Assert
    expect(returnData[0].fact).toEqual("Test Fact");
  });

  it("should throw error if not success", async () => {
    // Arrange
    const scope = nock("https://catfact.ninja").get("/facts").reply(500);

    // Act
    expect(() => getCatFacts()).rejects.toThrowError();
  });
});
