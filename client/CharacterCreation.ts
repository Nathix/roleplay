/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />

/*
API.onResourceStart.connect(function () {
    var CreationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6);

    var camera = API.createCamera(API.getEntityPosition(API.getLocalPlayer()), API.getEntityRotation(API.getLocalPlayer()));
    API.setCameraPosition(camera, new Vector3(245.4335, 217.0429, 106.2868));
    API.pointCameraAtPosition(camera, new Vector3(246.4335, 214.0429, 106.2868));
    API.setActiveCamera(camera);
    API.setEntityPositionFrozen(API.getLocalPlayer(), true);
    API.setEntityRotation(API.getLocalPlayer(), new Vector3(0, 0, 0));

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

    var Legs = new List(String);
    for (var i = 0; i < 40; i++) {
        Legs.Add(i.toString());
    }
    var LegsItem = CreationMenu.addListItem("Legs", "Legs", Legs, 0, onListItemChange);
    var FeetItem = CreationMenu.addListItem("Feet", "Feet", Legs, 0, onListItemChange);
    var TorsoItem = CreationMenu.addListItem("Torso", "Torso", Legs, 0, onListItemChange);
    var TopsItem = CreationMenu.addListItem("Tops", "Tops", Legs, 0, onListItemChange);
    var UndershirtItem = CreationMenu.addListItem("Undershirt", "Undershirt", Legs, 0, onListItemChange);
    
    CreationMenu.addMenuItem("Complete Character", "Finish creating your character");
    CreationMenu.show();

    var genderData = 0;
    var parent1Data = 0;
    var parent2Data = 1;
    var hairStyleData = 1;
    var hairColorData = 0;
    var legsData = 0;
    var feetData = 0;
    var topsData = 0;
    var torsoData = 0;
    var undershirtData = 0;

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
            API.sendChatMessage("Parent 1 changed to " + index);
            parent1Data = index;
        }
        else if (listItem == Parent2Item) {
            API.sendChatMessage("Parent 2 changed to " + index);
            parent2Data = index;
        }
        else if (listItem == HairStyleItem) {
            var style = parseInt(index) + 1;
            API.sendChatMessage("Hair style changed to " + style);
            hairStyleData = style;
            API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
        }
        else if (listItem == HairColorItem) {
            API.sendChatMessage("Hair color changed to " + index);
            hairColorData = index;
            API.callNative("_SET_PED_HAIR_COLOR", API.getLocalPlayer(), hairColorData, hairColorData);
        }
        else if (listItem == LegsItem) {
            API.sendChatMessage("Legs changed to " + index);
            legsData = index;
            API.setPlayerClothes(API.getLocalPlayer(), 4, legsData, 0);
        }
        else if (listItem == FeetItem) {
            API.sendChatMessage("Feet changed to " + index);
            feetData = index;
            API.setPlayerClothes(API.getLocalPlayer(), 6, feetData, 0);
        }
        else if (listItem == TopsItem) {
            API.sendChatMessage("Tops changed to " + index);
            topsData = index;
            API.setPlayerClothes(API.getLocalPlayer(), 11, topsData, 0);
        }
        else if (listItem == TorsoItem) {
            API.sendChatMessage("Torso changed to " + index);
            torsoData = index;
            API.setPlayerClothes(API.getLocalPlayer(), 3, torsoData, 0);
        }
        else if (listItem == UndershirtItem) {
            API.sendChatMessage("Undershirt changed to " + index);
            undershirtData = index;
            API.setPlayerClothes(API.getLocalPlayer(), 8, undershirtData, 0);
        }
        
        API.callNative("SET_PED_HEAD_BLEND_DATA", API.getLocalPlayer(), parent1Data, parent2Data, 0, parent1Data, parent2Data, 0, 50.00, 50.00, 0, false);
        API.setPlayerClothes(API.getLocalPlayer(), 2, hairStyleData, 0);
    }
});
*/