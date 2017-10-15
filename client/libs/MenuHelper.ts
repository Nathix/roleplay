/// <reference path="../types-gt-mp/Declarations.d.ts" />
class MenuHelper {
    open: boolean;
    element: NativeUI.UIMenu;
    selectedCallBack: Function;
    
    title: string;
    subtitle: string;
    x: number;
    y: number;
    anchor: number;

    constructor(title: string, subtitle: string, x?: number, y?: number, anchor?: number, callback?: Function) {
        this.title = title;
        this.subtitle = subtitle;
        this.x = (x == null) ? 0 : x;
        this.y = (y == null) ? 0 : y;
        this.anchor = (anchor == null) ? 6 : anchor;
        this.open = false;
        
        this.element = API.createMenu(title, subtitle, x, y, anchor);
        this.element.ResetKey(menuControl.Back);
        this.element.Visible = true;
        
        var self = this;
        API.onUpdate.connect(function () {
            // Oh yeah.. this becomes the function local variable, not class..
            if (self.element != null && self.open == true) {
                API.drawMenu(self.element);
            }
        });
        
        this.element.OnItemSelect.connect(function (menu, item, index) {
            if (callback != null)
                callback(menu, item, index);
        });
    }

    show() {
        this.open = true;
        API.showCursor(true);
    }

    hide() {
        this.open = false;
        API.showCursor(false);
    }

    isShowing() {
        return this.element.Visible;
    }

    setSelectedCallback(callback: Function) {
        this.selectedCallBack = callback;
    }

    addMenuItem(label: string, description: string) {
        var temp = API.createMenuItem(label, description);
        this.element.AddItem(temp);
        return temp;
    }

    addColoredItem(label: string, description: string, hexColor: string, hexHighlightColor: string) {
        var temp = API.createColoredItem(label, description, hexColor, hexHighlightColor);
        this.element.AddItem(temp);
        return temp;
    }

    addCheckboxItem(label: string, description: string, isChecked: boolean) {
        var temp = API.createCheckboxItem(label, description, isChecked);
        this.element.AddItem(temp);
        return temp;
    }

    addListItem(label: string, description: string, list: System.Collections.Generic.List<string>, index: number, callback?: Function) {
        var temp = API.createListItem(label, description, list, index);
        this.element.AddItem(temp);
        if (callback != null)
            temp.OnListChanged.connect(function (listItem, newIndex) { callback(listItem, newIndex); });
        this.element.RefreshIndex();
        return temp;
    }
}