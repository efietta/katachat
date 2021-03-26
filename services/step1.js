/**
 * Step 1 (single sentence).
 * Assuming that:
 *  - each piece of the chat is composed by hh:mm:ss, customer/agent name, : and sentence
 *  -the first occurrence is from the customer
 *  -the second occurrence could be either customer or agent
 * 
 * we can set the property type as 'customer'
 */

 // For this Kata we set an initial fixed sentence. It could be retrieved from an API Post request.
//const singleSentence = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const Chat = require('../models/Chat');

const parseSingleSentence = (singleSentence) =>{
    let chat = new Chat();

    //check chat item not null. We should also check pattern match.
    if (singleSentence) {
        //extract properties from the chat item. I do not use regex for performance issues.
        //extract date, with fixed pattern
        let dateTime = singleSentence.substr(0, 8);
        //extract mention, using the first occurrence of the ": ", thus we do not use regex
        // and we do not have to add the delimiter. Focus on performance.
        let mentionStrLength = singleSentence.split(": ", 1).join(": ").length + 2;
        let mentionStr = singleSentence.slice(0, mentionStrLength);
        let sentenceStr = singleSentence.slice(mentionStrLength, singleSentence.length);

        let chatItem= {
            date: dateTime,
            mention: mentionStr,
            sentence: sentenceStr,
            type: 'customer'
        }

        chat.items.push(chatItem);
    }

    let items = chat.items
    //console.log('Step 1 result:');
    //console.log(items);
    return items;
}

module.exports = parseSingleSentence;