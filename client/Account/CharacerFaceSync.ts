/// <reference path="../types-gtanetwork/index.d.ts" />

API.onEntityStreamIn.connect(function (entity, entityType) {
    if (entityType === 6 || entityType === 8) {
        if (API.isPed(entity) == false) {
            var data = API.getEntitySyncedData(entity, "player:character:data");

            if (data != null) {
                var json = JSON.parse(data);

                API.setPlayerClothes(entity, 2, json.hairStyle, 0);
                API.callNative("_SET_PED_HAIR_COLOR", entity, json.hairColor, 0);
                API.callNative("SET_PED_HEAD_BLEND_DATA", entity, json.parent1, json.parent2, 0, json.parent1, json.parent2, 0, 50.00, 50.00, 0, false);
            }
        }
    }
});
