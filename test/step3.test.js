/**
 * Step 3 (multiple sentences) test.
 * 
 */
const parseChatSentences = require("../services/step2");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {
    test('Third is customer', () =>{

        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.";
        let typeOutput = "customer";
        expect(parseChatSentences(sentences).items[2].type).toEqual(typeOutput);
    });

    test('4th is agent', () =>{

        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.";
        let typeOutput = "agent";
        expect(parseChatSentences(sentences).items[3].type).toEqual(typeOutput);
    });

});
