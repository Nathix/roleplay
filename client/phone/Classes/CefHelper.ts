/// <reference path="../types-gtanetwork/index.d.ts" />

class CefHelper {

    path: string;
    open: boolean;
    browser: GTANetwork.GUI.Browser;
    
    constructor (resourcePath) {
        this.path = resourcePath
        this.open = false
    }

    show () {
        if (this.open === false) {
        this.open = true

        var resolution = API.getScreenResolution()

        this.browser = API.createCefBrowser(resolution.Width, resolution.Height, true)
        API.waitUntilCefBrowserInit(this.browser)
        API.setCefBrowserPosition(this.browser, 0, 0)
        API.loadPageCefBrowser(this.browser, this.path)
        API.showCursor(true)
        }
    }

    destroy () {
        this.open = false
        API.destroyCefBrowser(this.browser)
        API.showCursor(false)
    }

    eval (string) {
        this.browser.eval(string)
    }
}