/// <reference path="../types-gt-mp/Declarations.d.ts" />
/// <reference path="../libs/MenuHelper.ts" />

var creationMenu = null;
var firstNameData = "";
var lastNameData = "";
var genderData = 0;
var parent1Data = 0;
var parent2Data = 1;
var hairStyleData = 1;
var hairColorData = 0;

API.onServerEventTrigger.connect((eventname, args) => {
    if (eventname === "player:character:creation:show") {
        creationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6, SelectedCallback);

        var camera = API.createCamera(API.getEntityPosition(API.getLocalPlayer()), API.getEntityRotation(API.getLocalPlayer()));
        API.setCameraPosition(camera, new Vector3(245.4335, 217.0429, 106.2868));
        API.pointCameraAtPosition(camera, new Vector3(246.4335, 214.0429, 106.2868));
        API.setActiveCamera(camera);
        API.setEntityPositionFrozen(API.getLocalPlayer(), true);
        API.setEntityRotation(API.getLocalPlayer(), new Vector3(0, 0, 0));

        var firstNameItem = creationMenu.addMenuItem("First Name", "Select your first name");
        var lastNameItem = creationMenu.addMenuItem("Last Name", "Select your last name");

        var gender = new List(String);
        gender.Add("Male");
        gender.Add("Female");

        var genderItem = creationMenu.addListItem("Gender", "Male or Female", gender, 0, onListItemChange);

        var parents = new List(String);
        for (var i = 0; i <= 45; i++) {
            parents.Add(i.toString());
        }
        var parent1Item = creationMenu.addListItem("Parent 1", "First Parent", parents, 0, onListItemChange);
        var parent2Item = creationMenu.addListItem("Parent 2", "Second Parent", parents, 1, onListItemChange);

        var hairStyles = new List(String);
        hairStyles.Add("1");
        hairStyles.Add("2");
        hairStyles.Add("3");
        hairStyles.Add("4");
        hairStyles.Add("5");
        var hairStyleItem = creationMenu.addListItem("Hair Style", "Hair Style", hairStyles, 0, onListItemChange);

        var hairColors = new List(String);
        for (var i = 0; i <= 63; i++) {
            hairColors.Add(i.toString());
        }
        var hairColorItem = creationMenu.addListItem("Hair Color", "Hair Color", hairColors, 0, onListItemChange);

        var completeItem = creationMenu.addMenuItem("Complete Character", "Finish creating your character");
        creationMenu.show();

        function onListItemChange(listItem, index) {
            if (listItem === genderItem) {
                API.sendChatMessage("Gender changed to " + ((index == 0) ? "Male" : "Female"));
                if (index === 0) {
                    API.setPlayerSkin(1885233650);
                } else {
                    API.setPlayerSkin(-1667301416);
                }
                API.setEntityRotation(API.getLocalPlayer(), new Vector3(0, 0, 0));

                genderData = index;
            }
            else if (listItem === parent1Item) {
                parent1Data = index;
            }
            else if (listItem === parent2Item) {
                parent2Data = index;
            }
            else if (listItem === hairStyleItem) {
                var style = parseInt(index) + 1;
                hairStyleData = style;
                API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
            }
            else if (listItem === hairColorItem) {
                hairColorData = index;
                API.callNative("_SET_PED_HAIR_COLOR", API.getLocalPlayer(), hairColorData, hairColorData);
            }

            API.callNative("SET_PED_HEAD_BLEND_DATA", API.getLocalPlayer(), parent1Data, parent2Data, 0, parent1Data, parent2Data, 0, 50.00, 50.00, 0, false);
            API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
        }

        function SelectedCallback(menu, item, index) {
            if (item === firstNameItem) {
                var valid = false;
                while (!valid) {
                    valid = true;
                    firstNameData = API.getUserInput(firstNameData, 16);
                    if (firstNameData.length < 2) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Minimum of 2 characters required!");
                    } else if (firstNameData.search(/[^a-zA-Z]+/) !== -1) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Only A-Z characters are accepted (No symbols or spaces).");
                    } else if (firstNameData == lastNameData) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~You must have different first and last name.");
                    }
                }
                firstNameItem.Text = "First Name: " + firstNameData;
            }
            else if (item === lastNameItem) {
                var valid = false;
                while (!valid) {
                    valid = true;
                    lastNameData = API.getUserInput(lastNameData, 16);
                    if (lastNameData.length < 2) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Minimum of 2 characters required!");
                    } else if (lastNameData.search(/[^a-zA-Z]+/) !== -1) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~Only A-Z characters are accepted (No symbols or spaces).");
                    } else if (firstNameData == lastNameData) {
                        valid = false;
                        API.sendChatMessage("~r~ERROR: ~w~You must have different first and last name.");
                    }
                }
                lastNameItem.Text = "Last Name: " + lastNameData;
            }
            else if (item === completeItem) {
                if (firstNameData == "" || lastNameData == "") {
                    API.sendChatMessage("~r~ERROR: ~w~You must have a first and last name.");
                } else {
                    var data = {
                        "firstname": firstNameData,
                        "lastname": lastNameData,
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
    else if (eventname === "player:character:creation:hide") {
        creationMenu.hide();
    }
});
