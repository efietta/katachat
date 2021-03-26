/**
 * Step 7 tests.
 * 
 */

const parseChatSentences = require("../services/step5");
const createKeyMap = require("../services/step6");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {

    test('split in text block using HH:mm:ss', () =>{
        let chat = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit. 14:26:15 Agent I received it at 12:24:48, ut blandit lectus.";
        expect(createKeyMap(chat).length).toEqual(2);
    });

    test('four lines of chat without specific sepator', () =>{
        let chat = "14:20:03 Customer Hello 14:24:32 Customer Lorem ipsum dolor sit amet , consectetur adipiscing elit . 14:26:15 Agent I received it at 12:24:48 , ut blandit lectus . 14:50:09 Agent is veverything ok?";
        expect(createKeyMap(chat).length).toEqual(4);
    });

});