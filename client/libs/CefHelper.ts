/// <reference path="../types-gt-mp/Declarations.d.ts" />
class CefHelper {
    path: string;
    open: boolean;
    local: boolean;
    browser: GrandTheftMultiplayer.Client.GUI.Browser;

    constructor(resourcePath: string, local?: boolean) {
        this.path = resourcePath;
        this.local = (local == null)? true : local;
        this.open = false;
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
      if(this.open == true) {
        this.open = false;
        API.destroyCefBrowser(this.browser);
        API.showCursor(this.open);
      }
    }

    eval(string) {
        this.browser.eval(string);
    }

    isShowing() {
        return this.open;
    } 
}
