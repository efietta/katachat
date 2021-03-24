/**
 * Step 5 (date splitting)
 *  note: an example in which the sentences are not divided by the new line character
 * 
 */
const parseChatSentences = require("../services/step5");
const Chat = require('../models/Chat');

describe ("Retrieve data from the chat with multiple sentences", () =>  {
    test('split in two using date splitting', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
        expect(parseChatSentences(sentences).length).toEqual(2);
    });

});
