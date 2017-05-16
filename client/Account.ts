/// <reference path="types-gtanetwork/index.d.ts" />

API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        var cef = new CefHelper('client/resources/pages/account/login.html');
        cef.show();
        API.sendNotification("Login!");
    }
}); 
