/**
 * Chat item model.
 */

class ChatItem {
    constructor( { date, mention, sentence, type } ) {
        this.date = date;
        this.mention = mention;
        this.sentence = sentence;
        this.type = type;
    }
}

module.exports = ChatItem;   