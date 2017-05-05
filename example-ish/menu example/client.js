var mainMenu = null;

API.onResourceStart.connect(function () {
    createMenu();
});

API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode === Keys.F2 && mainMenu.Visible === false) {
        API.sendChatMessage("~g~Opened menu");
        openMenu();
    } else if (e.KeyCode === Keys.F2 && mainMenu.Visible === true) {
        API.sendChatMessage("~r~Closed menu");
        closeMenu();
    }
});

API.onUpdate.connect(function () {
    if (mainMenu != null) {
        API.drawMenu(mainMenu)
    }
});

function createMenu() {
    mainMenu = API.createMenu("", "Vehicle menu", 0, 0, 6);

    mainMenu.AddItem(API.createMenuItem("Repair vehicle", "Defuq you think it does?"));
    mainMenu.AddItem(API.createMenuItem("Add all performance upgrades", "Engine upgrade, transmission mod, turbo etc.."));

    mainMenu.Visible = false;
    mainMenu.ResetKey(menuControl.Back);
}

function openMenu() {
    mainMenu.Visible = true;
    API.drawMenu(mainMenu);

    mainMenu.OnItemSelect.connect(function (sender, item, index) {
        switch (index) {
            case 0:
                API.triggerServerEvent("fixVehiclePlayer");
                break;
            case 1:
                API.triggerServerEvent("modVehiclePerformance")
                break;
        }
    });

}

function closeMenu() {
    mainMenu.Visible = false;
}