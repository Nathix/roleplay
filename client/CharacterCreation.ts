/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />

API.onResourceStart.connect(function () {
    var Faces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

    var CreationMenu = new MenuHelper("Character Creation", "Something here?", 0, 0, 6);

    var test = new List(String);
    test.Add("1");
    test.Add("2");
    test.Add("3");

    CreationMenu.addMenuItem("Test", "test");
    CreationMenu.addListItem("Person 1", "First person", test, 0);
    CreationMenu.addListItem("Person 2", "Second person", test, 0);
    CreationMenu.addListItem("Person 3", "Third person", test, 0);

    CreationMenu.show();
});