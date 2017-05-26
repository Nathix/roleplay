/// <reference path="../types-gtanetwork/index.d.ts" />

var loginCef = null;
var registerCef = null;
var spamProtection = false;

API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        API.setCanOpenChat(false);
        loginCef = new CefHelper('client/resources/pages/account/login.html');
        loginCef.show();
        spamProtection = false;
    }
    else if (name == "player:login:hide") {
        loginCef.hide();
        API.setCanOpenChat(true);
        spamProtection = false;
    }
    else if (name == "player:login:reset") {
        spamProtection = false;
    }
}); 

function LoginHandler(username, password) {
    if (!spamProtection) {
        API.triggerServerEvent("player:login:process", username, password);
        spamProtection = true;
    }
}

function RegisterHandler() {
    loginCef.hide();

    registerCef = new CefHelper("https://forum.sa-roleplay.com/register/", false);
    registerCef.show();
}