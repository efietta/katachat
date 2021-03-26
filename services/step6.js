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

const parseSingleSentenceWithAuthors = (element, keyAuthorCustomer, keyAuthorAgent) => {

    //build regex for Customer
    const regexCustomer = new RegExp(`(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d ([${keyAuthorCustomer}]))(.*)`);
    //build regex for Agent
    const regexCustomer = new RegExp(`(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d ([${keyAuthorAgent}]))(.*)`);



}

const createKeyMap = (chatSentences) =>{
    let chat = new Chat();

    //TODO: check empty string and use algorithms to clean the initial dataset.

    //Regex to split chat into blocks of sentences. Split by time and a blank space "HH:mm:ss ".
    let regexpr = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d[ ])/g;
    let chatStcnItems = chatSentences.split(regexpr);

    //map of Author keys
    let map = new Map();

     //for each item of chatStcnItems
     chatStcnItems.forEach(element => {
        let chatItem = createMapFromSingleSentence(element, map);
        //chat.items.push(chatItem);
    });

    //check the map of Authors
    let keyAuthorCustomer = map.keys().next().value;
    let keyAuthorAgent = map.keys().next().value; // instead of that we should use a function to get the item with best score.

    //
    //FIXME devo unire le stringhe ... che contengono HH:mm:ss

    chatStcnItems.forEach(element => {
        let chatItem = parseSingleSentenceWithAuthors(element, keyAuthorCustomer, keyAuthorAgent);
        
        chat.items.push(chatItem);
    });

    return true;
}

module.exports = createKeyMap;