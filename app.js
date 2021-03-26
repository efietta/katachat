/**
 * Main app to test features.
 */


 // a) Step 1 function
const parseSingleSentence = require("./services/step1");
// b) Step 1, Step 2, Step 3 and Step 4 functions
const parseChatSentences = require("./services/step2");
// c) Step 5 function
const parseSplitChatSentences = require("./services/step5");
// d) Step 6 and Step 7 functions
const createKeyMap = require("./services/step6");

function executeFn() {
    var stepInput = process.argv[2];
    var chatInput = process.argv[3];
    if (stepInput == 'a') {
        console.log(" ----- OUTPUT -------- "); 
        console.log(parseSingleSentence(chatInput)); 
    }
    if (stepInput == 'b') {
        console.log(" ----- OUTPUT -------- "); 
        console.log(parseChatSentences(chatInput)); 
    }
    if (stepInput == 'c') {
        console.log(" ----- OUTPUT -------- "); 
        console.log(parseSplitChatSentences(chatInput)); 
    }
    if (stepInput == 'd') {
        console.log(" ----- OUTPUT -------- "); 
        console.log(createKeyMap(chatInput)); 
    }
     
}

executeFn(); 