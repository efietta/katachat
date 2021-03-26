/**
 * Step 5 (date splitting)
 * 
 * Assuming that:
 *  - date HH:mm:ss is the separator.
 *  - customer and agent are always not equal strings
 * 
 **/

const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');

const parseSingleSentence = (singleSentence, customerUsername) =>{

    let chatItem;

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

        let typeStr = 'customer';
        console.log('Customer user name extracted is: ' + customerUsername);
        console.log('Customer user name now is: ' + mentionStr.slice(9, mentionStr.length));

        if (mentionStr.slice(9, mentionStr.length) != customerUsername) {
            typeStr = 'agent';
        }

        chatItem= {
            date: dateTime,
            mention: mentionStr,
            sentence: sentenceStr,
            type: typeStr
        };

    }
    return chatItem;
}



const parseSplitChatSentences = (chatSentences) =>{
    let chat = new Chat();

    //regex
    //Modified to obtain Step 6 requirements
    let regexpr = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d[ \w]*[:])([ :,\w]*).*?/g;
    let chatItems = chatSentences.match(regexpr);

    //define once the customer username string
    let mentionStrLength = chatItems[0].split(": ", 1).join(": ").length + 2;
    let customerUsername = chatItems[0].slice(9, mentionStrLength);

    //for each item of chatItems
    chatItems.forEach(element => {
        let chatItem = parseSingleSentence(element, customerUsername);
        chat.items.push(chatItem);
    });

    let items = chat.items;
    return items;
}

module.exports = parseSplitChatSentences;