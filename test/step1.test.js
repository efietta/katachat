/**
 * Step 1 (single sentence) test.
 */
const parseSingleSentence = require("../services/step1");
const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');

describe ("Retrieve data from the chat", () =>  {
    test('Parse and split single sentence to array with single object', () =>{
        let chat = new Chat();
        expect(Array.isArray(chat.items)).toBe(true);
    });

    test('Chat with one item and date property.', () => {
        let chat = new Chat();
        chat.items.push(new ChatItem("14:24:32"));
        expect(chat.items.length >= 1).toBe(true);
    });

    test('Chat retrieve date from single item.', () => {
        let input = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        let dateOutput = "14:24:32";
        expect(parseSingleSentence(input).items[0].date).toEqual(dateOutput);
    });

    test('Chat retrieve mention from single item.', () => {
        let input = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        let mentionOutput = "14:24:32 Customer : ";
        expect(parseSingleSentence(input).items[0].mention).toEqual(mentionOutput);
    });

    test('Chat retrieve sentence from single item.', () => {
        let input = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        let sentenceOutput = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        expect(parseSingleSentence(input).items[0].sentence).toEqual(sentenceOutput);
    });

    test('Chat retrieve item properties from single item.', () => {
        let input = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        let output = [{
            date: "14:24:32",
            mention: "14:24:32 Customer : ",
            sentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            type: "customer"
        }];
        expect(parseSingleSentence(input).items).toEqual(output);
    });

});