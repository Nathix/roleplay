/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="Classes/CefHelper.ts"/>

var cef = null;

API.onResourceStart.connect(function () {
    cef = new CefHelper('../../../www/phone/index.html');
    cef.show();
});

API.onResourceStop.connect(function () {
    cef.destroy();
});