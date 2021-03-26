## Kata Chat app ##

Node version v15.12.0

-------------------------------------------------
------------ Test Excercise features

Run application from command line.

    node app.js [param1] [param2]

    where param1 must be one of the following char
        'a' basic function: process single sentence (Step 1 functions)
        'b' standard function v1: process sentences (Step 1, Step 2, Step 3 and Step 4 functions)
        'c' standard function v2: process senteces with datetime (Step 5 function)
        'd' complex function: process chat (Step 6 and Step 7 functions)

--------- Example 1

    node app.js a "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit."

--------- Example 2

    node app.js b "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus."


--------- Example 3

    node app.js c "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus."

--------- Example 4

    node app.js d "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus."

--------- Example 5

    node app.js d "14:20:03 Customer Hello 14:24:32 Customer Lorem ipsum dolor sit amet , consectetur adipiscing elit . 14:26:15 Agent I received it at 12:24:48 , ut blandit lectus . 14:50:09 Agent everything is ok."

-------------------------------------------------
------------ Test with Jest

From command line:

    npm run test

-------------------------------------------------
------------ Additional improvements

Improvements starting from this code stratch:

    - define and improve rules to split sentences
    - use dictionaries (public or custom dictionaries) from database to
        improve text classifications.
    - improve performance using recorsive functions
    - use libray and dataset for ML engine, sending data to the ML library
        improving accurancy of results.

Have fun!

-------------------------------------------------