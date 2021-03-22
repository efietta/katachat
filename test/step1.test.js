/**
 * Step 1 (single sentence) test.
 */
const parseSingleSentence = require("../services/step1");
const Chat = require('../models/Chat');

test('Parse and split single sentence to array with single object', () =>{

    let chat = new Chat();

    expect(Array.isArray(chat.items)).toBe(true);

});