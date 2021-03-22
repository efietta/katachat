/**
 * Step 1 (single sentence) test.
 */
const parseSingleSentence = require("../step1");

test('parse and split single sentence to array with single object', () =>{
    expect(parseSingleSentence("...sentence...")).toBe("");
});