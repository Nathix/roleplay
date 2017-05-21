class CefHelper {
    path: string;
    open: boolean;
    local: boolean;
    browser: GTANetwork.GUI.Browser;

    constructor(resourcePath: string, local?: boolean) {
        this.path = resourcePath;
        this.open = false;
        this.local = (local != null) ? local : true;
    } 

    show(cursor?: boolean) {
        if (this.open === false) {
            this.open = true;

            var resolution = API.getScreenResolution();

            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, this.local);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);

            API.showCursor((cursor != null) ? cursor : true);
        }
    }

    hide() {
        this.open = false;
        //API.destroyCefBrowser(this.browser); // Broken
        API.showCursor(this.open);
    }

    eval(string) {
        this.browser.eval(string);
    }

    isShowing() {
        return this.open;
    }
}