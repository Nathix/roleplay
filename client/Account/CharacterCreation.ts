/// <reference path="../types-gt-mp/Declarations.d.ts" />
/// <reference path="../libs/MenuHelper.ts" />

var CreationMenu = null;
var FirstNameData = "";
var LastNameData = "";
var genderData = 0;
var parent1Data = 0;
var parent2Data = 1;
var hairStyleData = 1;
var hairColorData = 0;

API.onServerEventTrigger.connect(function (eventname, args) {
    if (eventname == "player:character:creation:show") {
        CreationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6, SelectedCallback);

        var camera = API.createCamera(API.getEntityPosition(API.getLocalPlayer()), API.getEntityRotation(API.getLocalPlayer()));
        API.setCameraPosition(camera, new Vector3(245.4335, 217.0429, 106.2868));
        API.pointCameraAtPosition(camera, new Vector3(246.4335, 214.0429, 106.2868));
        API.setActiveCamera(camera);
        API.setEntityPositionFrozen(API.getLocalPlayer(), true);
        API.setEntityRotation(API.getLocalPlayer(), new Vector3(0, 0, 0));

        var FirstNameItem = CreationMenu.addMenuItem("First Name", "Select your first name");
        var LastNameItem = CreationMenu.addMenuItem("Last Name", "Select your last name");

        var Gender = new List(String);
        Gender.Add("Male");
        Gender.Add("Female");

        var GenderItem = CreationMenu.addListItem("Gender", "Male or Female", Gender, 0, onListItemChange);

        var Parents = new List(String);
        for (var i = 0; i <= 45; i++) {
            Parents.Add(i.toString());
        }
        var Parent1Item = CreationMenu.addListItem("Parent 1", "First Parent", Parents, 0, onListItemChange);
        var Parent2Item = CreationMenu.addListItem("Parent 2", "Second Parent", Parents, 1, onListItemChange);

        var HairStyles = new List(String);
        HairStyles.Add("1");
        HairStyles.Add("2");
        HairStyles.Add("3");
        HairStyles.Add("4");
        HairStyles.Add("5");
        var HairStyleItem = CreationMenu.addListItem("Hair Style", "Hair Style", HairStyles, 0, onListItemChange);

        var HairColors = new List(String);
        for (var i = 0; i <= 63; i++) {
            HairColors.Add(i.toString());
        }
        var HairColorItem = CreationMenu.addListItem("Hair Color", "Hair Color", HairColors, 0, onListItemChange);

        var CompleteItem = CreationMenu.addMenuItem("Complete Character", "Finish creating your character");
        CreationMenu.show();

        function onListItemChange(listItem, index) {
            if (listItem == GenderItem) {
                API.sendChatMessage("Gender changed to " + ((index == 0) ? "Male" : "Female"));
                if (index == 0) {
                    API.setPlayerSkin(1885233650);
                } else {
                    API.setPlayerSkin(-1667301416);
                }
                API.setEntityRotation(API.getLocalPlayer(), new Vector3(0, 0, 0));

                genderData = index;
            }
            else if (listItem == Parent1Item) {
                parent1Data = index;
            }
            else if (listItem == Parent2Item) {
                parent2Data = index;
            }
            else if (listItem == HairStyleItem) {
                var style = parseInt(index) + 1;
                hairStyleData = style;
                API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
            }
            else if (listItem == HairColorItem) {
                hairColorData = index;
                API.callNative("_SET_PED_HAIR_COLOR", API.getLocalPlayer(), hairColorData, hairColorData);
            }

            API.callNative("SET_PED_HEAD_BLEND_DATA", API.getLocalPlayer(), parent1Data, parent2Data, 0, parent1Data, parent2Data, 0, 50.00, 50.00, 0, false);
            API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
        }

        function SelectedCallback(menu, item, index) {
            if (item == FirstNameItem) {
                var valid = false;
                while (!valid) {
                    valid = true;
                    FirstNameData = API.getUserInput(FirstNameData, 16);
                    if (FirstNameData.length < 2) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Minimum of 2 characters required!");
                    } else if (FirstNameData.search(/[^a-zA-Z]+/) !== -1) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Only A-Z characters are accepted (No symbols or spaces).");
                    } else if (FirstNameData == LastNameData) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~You must have different first and last name.");
                    }
                }
                FirstNameItem.Text = "First Name: " + FirstNameData;
            }
            else if (item == LastNameItem) {
                var valid = false;
                while (!valid) {
                    valid = true;
                    LastNameData = API.getUserInput(LastNameData, 16);
                    if (LastNameData.length < 2) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Minimum of 2 characters required!");
                    } else if (LastNameData.search(/[^a-zA-Z]+/) !== -1) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Only A-Z characters are accepted (No symbols or spaces).");
                    } else if (FirstNameData == LastNameData) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~You must have different first and last name.");
                    }
                }
                LastNameItem.Text = "Last Name: " + LastNameData;
            }
            else if (item == CompleteItem) {
                if (FirstNameData == "" || LastNameData == "") {
                    API.sendChatMessage("~r~ERROR: ~w~You must have a first and last name.");
                } else {
                    var data = {
                        "firstname": FirstNameData,
                        "lastname": LastNameData,
                        "gender": genderData,
                        "parent1": parent1Data,
                        "parent2": parent2Data,
                        "hairStyle": hairStyleData,
                        "hairColor": hairColorData
                    };
                    
                    API.triggerServerEvent("player:character:creation:finish", JSON.stringify(data));
                }
            }
        }
    }
    else if (eventname == "player:character:creation:hide") {
        CreationMenu.hide();
    }
});
