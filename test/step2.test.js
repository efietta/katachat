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

    test('First item is customer', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
        let typeOutput = "customer";
        expect(parseChatSentences(sentences).items[0].type).toEqual(typeOutput);
    });

    test('Second item is agent', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
        let typeOutput = "agent";
        expect(parseChatSentences(sentences).items[1].type).toEqual(typeOutput);
    });

});