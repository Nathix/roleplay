/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />

API.onResourceStart.connect(function () {

    var CreationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6);

    var test = new List(String);
    for (var i = 0; i <= 45; i++) {
        test.Add(i.toString());
    }
    
    CreationMenu.addListItem("Parent 1", "First Parent", test, 0);
    CreationMenu.addListItem("Parent 2", "Second Parent", test, 0);
    CreationMenu.addListItem("Parent 3", "Third Parent", test, 0);

    CreationMenu.show();
});