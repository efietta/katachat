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

    console.log('Analyzing element: ' + element);

    //let regexpr = /(?:[ \w]*)([ ])./g;
    //let authorString = element.match(regexpr);

    // extract the first word if it's followed by blank space
    let authorKey = element.match(/^[\w]+(?=[ ])/g);

    // Here... additional evaluation, for example from dictionary or rules and ML rules

    if (authorKey) {
        // for now all keys have the same score (have a look to Step 7)
        let authorScore = 1;
        map.set(authorKey, authorScore);
        console.log('Author key: ' + authorKey);
    }

}

const parseSingleSentenceWithAuthors = (singleSentence, keyAuthorCustomer, keyAuthorAgent) => {

    let chatItem;

    // init values
    let dateTime = '';
    let mentionStr = '';
    let sentenceStr = '';
    let typeStr;

    //build regex for Customer
    //const regexCustomer = new RegExp(`(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d ([${keyAuthorCustomer}]))(.*)`);
    //build regex for Agent
    //const regexCustomer = new RegExp(`(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d ([${keyAuthorAgent}]))(.*)`);

    //dateTime = singleSentence.substr(0, 8);
	
	let authorCustomerStr = singleSentence.split(" ", 1).join(keyAuthorCustomer);
	let authorAgentStr = singleSentence.split(" ", 1).join(keyAuthorAgent);

    let leftString = singleSentence;

    console.log("singleSentence is:" + singleSentence);
    console.log("authorCustomerStr is:" + authorCustomerStr);
    console.log("authorAgentStr is:" + authorAgentStr);
    console.log("leftString is:" + leftString);

    //Check is Customer
    if ((typeof leftString === 'string') && leftString.startsWith(authorCustomerStr)) {
        let mentionStrLength = leftString.concat(keyAuthorCustomer).length;
        mentionStr = singleSentence.slice(0, mentionStrLength);
        sentenceStr = singleSentence.slice(mentionStrLength, singleSentence.length);
        typeStr = 'customer';
    }
    //Check is Agent
    console.log("Result:"+ leftString.startsWith(authorAgentStr));
    if ((typeof leftString === 'string') && leftString.startsWith(authorAgentStr)) {
        let mentionStrLength = leftString.concat(keyAuthorAgent).length;
        mentionStr = singleSentence.slice(0, mentionStrLength);
        sentenceStr = singleSentence.slice(mentionStrLength, singleSentence.length);
        typeStr = 'agent';
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

    //TODO: check empty string and use algorithms to clean the initial dataset.

    //Regex to split chat into blocks of sentences. Split by time and a blank space "HH:mm:ss ".
    let regexpr = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d[ ])/g;
    let chatStcnItems = chatSentences.split(regexpr);

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

    //check the map of Authors
    let keyAuthorCustomer = map.keys().next().value;
    let keyAuthorAgent = map.keys().next().value; // instead of that we should use a function to get the item with best score.

    //build the Chat Items loop backwards
    let mentionToAdd = '';
    for (var i = chatStcnItems.length - 1; i >= 0; i--) {

        chatItem = parseSingleSentenceWithAuthors(chatStcnItems[i], keyAuthorCustomer, keyAuthorAgent);

        if (chatItem.type) {
            // this is a chat Item
            // add string from the previous iteration
            chatItem.mention += mentionToAdd;
            chatItem.date = chatStcnItemsTime[i];
            chat.items.push(chatItem);
            mentionToAdd = '';
        } else {
            // it is an element that not have Author inside. Concatenate for the next iteration
            mentionToAdd += chatStcnItemsTime[i] + chatItem.mention;
        }
    }

    return chat.items;
}

module.exports = createKeyMap;
