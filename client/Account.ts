/// <reference path="types-gtanetwork/index.d.ts" />

var loginCef = null;
var registerCef = null;

API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        API.setCanOpenChat(false);
        var fuckSake = Math.floor(Math.random() * 1000000).toString();
        loginCef = new CefHelper('client/resources/pages/account/login.html');
        loginCef.show();
        API.sendNotification("Login!");
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