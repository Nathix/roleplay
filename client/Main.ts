/// <reference path="types-gtanetwork/index.d.ts" />

var cef = null;

API.onResourceStart.connect(function () {
    API.sendChatMessage("Yay?");
    cef = new CefHelper('client/resources/boilerplate.html');
    cef.show();
});
 
API.onResourceStop.connect(function () {
    cef.hide();
});

API.onChatCommand.connect(function (test) {
    if (test == "/show") {
        cef.show();
    }
    else if (test == "/hide") {
        cef.hide();
    }
    else if (test == "/toggle") {
        if (cef.isShowing() == true) {
            cef.hide();
        } else {
            cef.show();
        }
    }
});
