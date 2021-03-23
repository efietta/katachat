/**
 * Step 2 (two sentences) test.
 * 
 */
const parseChatSentences = require("../services/step2");
const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');


beforeEach(() => {
    //optimization with global inputs/outputs
});

describe ("Retrieve data from the chat with two sentences", () =>  {
    test('Parse and split sentences to array', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
        expect(Array.isArray(parseChatSentences(sentences).items)).toBe(true);
    });
});