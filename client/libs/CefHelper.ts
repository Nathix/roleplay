class CefHelper {
    path: string;
    open: boolean;
    browser: GTANetwork.GUI.Browser;

    constructor(public resourcePath: string) {
        this.path = resourcePath;
        this.open = false;
    } 

    show() {
        if (this.open === false) {
            this.open = true;

            var resolution = API.getScreenResolution();

            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, true);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);
            API.showCursor(!API.isCursorShown());
        }
    }

    hide() {
        this.open = false;
        API.destroyCefBrowser(this.browser);
        API.showCursor(!API.isCursorShown());
    }

    eval(string) {
        this.browser.eval(string);
    }

    isShowing() {
        return this.open;
    }
}