/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />

API.onResourceStart.connect(function () {
    var CreationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6);

    var Parents = new List(String);
    for (var i = 0; i <= 45; i++) {
        Parents.Add(i.toString());
    }

    var Gender = new List(String);
    Gender.Add("Male");
    Gender.Add("Female");

    var GenderItem = CreationMenu.addListItem("Gender", "Male or Female", Gender, 0, onListItemChange);
    var Parent1Item = CreationMenu.addListItem("Parent 1", "First Parent", Parents, 0, onListItemChange);
    var Parent2Item = CreationMenu.addListItem("Parent 2", "Second Parent", Parents, 1, onListItemChange);
    var Parent3Item = CreationMenu.addListItem("Parent 3", "Third Parent", Parents, 2, onListItemChange);
    CreationMenu.addMenuItem("Complete Character", "Finish creating your character");
    CreationMenu.show();

    function onListItemChange(listItem, index) {
        if (listItem == GenderItem) {
            API.sendChatMessage("Gender changed to " + ((index == 0) ? "Male" : "Female"));
        }
        else if (listItem == Parent1Item) {
            API.sendChatMessage("Parent 1 changed to " + index);
        }
        else if (listItem == Parent2Item) {
            API.sendChatMessage("Parent 2 changed to " + index);
        }
        else if (listItem == Parent3Item) {
            API.sendChatMessage("Parent 3 changed to " + index);
        }
    }
});