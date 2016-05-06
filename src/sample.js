var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var CATEGORY_TO_QUOTE = {
    "focus": ["Worry about yourself","Stay Focus! Stay Focus now!","Kid, no excuses!", "You gotta Focus!!!" ],
    "success": ["I have 24 hours in a day. I don't sleep when i need to.", "What is wrong with my code! This is bullshit", "Keep Calm and Make Today Productive", "I am on a mission, be productive"],
    "talk dirty": ["I am so dirty. I need to wash my hair, brush my teeth, clean my dishes", "I don't use my pinky to hold my laptop.", "Do you have coke?", "How much is the coke?"]
};
var AlexaSkill = require('./AlexaSkill');

var BurtonQuote = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BurtonQuote.prototype = Object.create(AlexaSkill.prototype);
BurtonQuote.prototype.constructor = BurtonQuote;



BurtonQuote.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BurtonQuote onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = {
        speech: "What do you want me to focus on?",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: "Please tell me what quote do you want?",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput, repromptOutput);
};


BurtonQuote.prototype.intentHandlers = {
    "GetNewQuoteIntent": function (intent, session, response) {
        handleNewFactRequest(intent, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Burton Quote tell me a quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new quote from the list and returns to the user.
 */
 function handleNewFactRequest(intent, response) {
    // Get a random space quote from the space quotes list
    var quotes = CATEGORY_TO_QUOTE[intent.slots.Category.value];
    var quoteIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[quoteIndex];

    // Create speech output
    var speechOutput = "Here's your Burton Quote: " + quote;

    response.tellWithCard(speechOutput, "BurtonQuote", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BurtonQuote skill.
    var burtonQuote = new BurtonQuote();
    burtonQuote.execute(event, context);
};
