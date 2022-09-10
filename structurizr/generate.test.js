import { generateHtmlPage, generateHtmlPages } from "./generate.js";

const fs = require("fs");

it("should generate a html page", () => {
  generateHtmlPage("generate.test");
  expect(fs.existsSync("./generate.test.html")).toBe(true);
  fs.unlink("./generate.test.html", (err) => {
    if (err) throw err;
  });
});

it('should generate html pages', () => {
  // act
  expect(generateHtmlPages()).toBe(true);
});