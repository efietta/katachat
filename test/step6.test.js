/**
 * Step 6 (ignore extra date)
 * 
 */

const parseChatSentences = require("../services/step5");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {
    test('split in two using date splitting ignoring extra dates', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.";
        expect(parseChatSentences(sentences).length).toEqual(2);
    });

    test('split in two using date splitting ignoring extra dates', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at ....12:24:48 a ut blandit lectus.";
        expect(parseChatSentences(sentences).length).toEqual(2);
    });

});
