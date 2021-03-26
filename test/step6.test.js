/**
 * Step 6 (ignore extra date)
 * 
 */

const parseChatSentences = require("../services/step5");
const createKeyMap = require("../services/step6");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {
    test('split in two using date splitting ignoring extra dates', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.";
        expect(parseChatSentences(sentences).length).toEqual(2);
    });

    //Additional test for step6.js new file
    test('split in text block using HH:mm:ss as delimiter', () =>{
        let chat = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.";
        expect(createKeyMap(chat).length).toEqual(2);
    });

    test('split in text block using HH:mm:ss as delimiter with blank spaces', () =>{
        let chat = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit. 14:26:15 Agent I received it at 12:24:48 , ut blandit lectus.";
        expect(createKeyMap(chat).length).toEqual(2);
    });

});
