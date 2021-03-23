/**
 * Step 4 (multiple sentences) test with two customer mentions as start.
 * 
 */
const parseChatSentences = require("../services/step2");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {
    test('1st is customer', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.";
        let typeOutput = "customer";
        expect(parseChatSentences(sentences).items[0].type).toEqual(typeOutput);
    });

    test('2nd is customer', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.";
        let typeOutput = "customer";
        expect(parseChatSentences(sentences).items[1].type).toEqual(typeOutput);
    });

    test('3rd is agent', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.";
        let typeOutput = "agent";
        expect(parseChatSentences(sentences).items[2].type).toEqual(typeOutput);
    });
});
