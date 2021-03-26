/**
 * Step 6 (ignore extra date)
 * 
 * Idea: use maps and score.
 * 
 * Create a map with keys and values where:
 *      keys: string that represent the Author
 *      values: mention and sentence 
 */

const Chat = require('../models/Chat');
const ChatItem = require('../models/ChatItem');

const parseChatSentences = require("../services/step5");

const createMapFromSingleSentence = (element, map) => {

    // extract the first word if it's followed by blank space
    let authorKey = element.match(/^[\w]+(?=[ ])/g);

    // Here... additional evaluation, for example from dictionary or rules and ML rules

    if (authorKey) {
        // for now all keys have the same score (have a look to Step 7)
        let authorScore = 1;
        if (!map.has(authorKey.toString())) {
            map.set(authorKey.toString(), authorScore);
            console.log("Map size is:"+map.size);
            console.log("Author key is:"+authorKey);
        }

    }

}

const parseSingleSentenceWithAuthors = (singleSentence, keyAuthorCustomer, keyAuthorAgent) => {

    let chatItem;

    // init values
    let dateTime = "";
    let mentionStr = "";
    let sentenceStr = "";
    let typeStr;

    //Check is Customer
    if ((typeof singleSentence === 'string') && singleSentence.startsWith(keyAuthorCustomer)) {
        let mentionStrLength = keyAuthorCustomer.toString().length;
        mentionStr = singleSentence.substr(0, mentionStrLength+ 1);
        sentenceStr = singleSentence.substr(mentionStrLength + 1, singleSentence.length);
        typeStr = 'customer';
    }
    //Check is Agent
    if ((typeof singleSentence === 'string') && singleSentence.startsWith(keyAuthorAgent)) {
        let mentionStrLength = keyAuthorAgent.toString().length;
        mentionStr = singleSentence.substr(0, mentionStrLength + 1);
        sentenceStr = singleSentence.substr(mentionStrLength + 1, singleSentence.length);
        typeStr = 'agent';
    }
    //If is not Agent and not Customer means that it is a normal phrase
    if (!typeStr) {
        sentenceStr = singleSentence.substr(0, singleSentence.length);
    }

    chatItem= {
        date: dateTime,
        mention: mentionStr,
        sentence: sentenceStr,
        type: typeStr
    };

    return chatItem;

}

const createKeyMap = (chatSentences) =>{
    let chat = new Chat();
	chat.items = [];

    //Suggestion for improvement: check empty string and use algorithms to clean the initial dataset.

    //Regex to split chat into blocks of sentences. Split by time and a blank space "HH:mm:ss ".
    let regexpr = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d[ ])/g;
    let chatStcnItems = chatSentences.split(regexpr);
    chatStcnItems.shift();

    //create the array of time values (improvement possibile here...)
    let chatStcnItemsTime= chatSentences.match(regexpr);
    chatStcnItemsTime.forEach(element => {
        chatStcnItemsTime.push(element.trim());
    });

    //map of Author keys
    let map = new Map();

    //for each item of chatStcnItems
    chatStcnItems.forEach(element => {
        let chatItem = createMapFromSingleSentence(element, map);
    });
	
	let keys = Array.from( map.keys() );
    //check the map of Authors
    let keyAuthorCustomer = keys[0];
    let keyAuthorAgent = keys[1]; // instead of that we should use a function to get the item with best score.

    let sentenceToAdd = '';

	for (var i = chatStcnItems.length - 1; i >= 0; i--) {

        chatItem = parseSingleSentenceWithAuthors(chatStcnItems[i], keyAuthorCustomer, keyAuthorAgent);

        if (chatItem.type) {
            // this is a chat Item. Add string from the previous iteration
            chatItem.sentence = chatItem.sentence + sentenceToAdd;
            chatItem.date = chatStcnItemsTime[i];
            chatItem.mention = chatItem.date + " " + chatItem.mention;
            chat.items.push(chatItem);
            sentenceToAdd = '';
        } else {
            // it is an element that not have Author inside. Concatenate for the next iteration
            sentenceToAdd = sentenceToAdd + chatStcnItemsTime[i] + chatItem.sentence;
        }
    }

    chat.items = chat.items.reverse();
    return chat.items;
}

module.exports = createKeyMap;
