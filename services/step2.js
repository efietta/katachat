/**
 * Step 2 (two sentences), step 3 and step 4.
 * 
 * Assuming that:
 *  - new line char \n is the separator. It could be also \r\n.
 *  - customer and agent are always not equal strings
 * 
 **/

const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');

//this is the function from Step1, cloned to enhanced the steps for this exercise ;-)
// it could be defined once following coding best practise.

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
        //console.log('Customer user name extracted is: ' + customerUsername);
        //console.log('Customer user name now is: ' + mentionStr.slice(9, mentionStr.length));

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

const parseChatSentences = (chatSentences) =>{
    let chat = new Chat();

    //split chat sentences thanks to the new line char
    //regex means
    // .* any 0 or more chars
    // (\r?\n) block of optional \r and a \n
    //let regexpr = /.*(?:$|\r?\n)/g;

    //regex version 2, avoid blanck item at last. Match any new line *and* the \r\n $(end of string)
    let regexpr = /[^\n]+(?:\r?\n|$)/g;
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

module.exports = parseChatSentences;
