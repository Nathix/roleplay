/// <reference path="types-gtanetwork/index.d.ts" />

var loginCef = null;
var registerCef = null;

API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        API.setCanOpenChat(false);
        loginCef = new CefHelper('client/resources/pages/account/login.html');
        loginCef.show();
    }
    if (name == "player:login:hide") {
        loginCef.hide();
        API.setCanOpenChat(true);
    }
}); 

function LoginHandler(email, password) {
    API.sendChatMessage(email);
    API.sendChatMessage(password);
    API.triggerServerEvent("player:login:process", email, password);
}

function RegisterHandler() {
    loginCef.hide();

    registerCef = new CefHelper("https://forum.sa-roleplay.com/register/", false);
    registerCef.show();
}