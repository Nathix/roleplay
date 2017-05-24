/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />

var cef = null;
var hud = null;
var phone = null;

API.onResourceStart.connect(function() {
  API.sendChatMessage("~g~CefBrowser started!");
  cef = new CefHelper('client/resources/boilerplate.html');
  phone = new CefHelper('client/phone/index.html');
});

API.onResourceStop.connect(function() {
  cef.hide();
});

API.onChatCommand.connect(function(c) {
  if (c == "/show") {
    cef.show();
  }
  else if (c == "/hide") {
    cef.hide();
  }
  else if (c == "/toggle") {
    if (cef.isShowing() == true) {
      cef.hide();
    } else {
      cef.show();
    }
  } else if (c == "/showphone") {
    phone.show();
  }
  else if (c == "/hidephone") {
    phone.hide();
  }
  else if (c == "/togglephone") {
    if (phone.isShowing() == true) {
      phone.hide();
    } else {
      phone.show();
    }
  }
});

API.onUpdate.connect(function() {
    hud = new HUD();
    hud.showSpeed();
});
