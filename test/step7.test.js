



    test('split in text block using HH:mm:ss', () =>{
        let chat = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit. 14:26:15 Agent I received it at 12:24:48, ut blandit lectus.";
        expect(createKeyMap(chat)).toBe(true);
    });

    test('Chat retrieve item properties from single item', () => {
        let input = "14:24:32 Annet Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        let output = [{
            date: "14:24:32",
            mention: "14:24:32 Annet Maria Bianchi : ",
            sentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            type: "customer"
        }];
        ... expect(parseSingddleSentence(input)).toEqual(output);
    });

    test('split in two using date splitting ignoring extra dates', () =>{
        let sentences = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at ....12:24:48 a ut blandit lectus.";
        //...
    });

});