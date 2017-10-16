/// <reference path="../types-gt-mp/Declarations.d.ts" />

var spamProtection = false;

API.onServerEventTrigger.connect((name, args) => {
    if (name === "player:login:show") {
        spamProtection = false;
    }
    else if (name === "player:login:hide") {
        spamProtection = false;
    }
    else if (name === "player:login:reset") {
        spamProtection = false;
    }
});
