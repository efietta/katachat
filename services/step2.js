/**
 * Step 2 (two sentence).
 * Assuming that:
 *  - new line char is the separator
 * 
 **/

const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');

//this is the function from Step1, cloned to enhanced the steps for this exercise ;-)
// it could be defined once following coding best practise.

const parseSingleSentence = (singleSentence) =>{

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

        //use ChatItem constructor
        let chatItem= new ChatItem(dateTime, mentionStr, sentenceStr, 'customer');
    }
}

const parseChatSentences = (chatSentences) =>{
    let chat = new Chat();

    //split chat sentences thanks to the new line char
    let chatItems = chatSentences.split("/n");

    //for each item of chatItems
    chatItems.forEach(element => {
        let chatItem = parseSingleSentence(element);
        chat.items.push(chatItem);
      });

    return chat;
}

module.exports = parseChatSentences;
