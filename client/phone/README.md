# Overview
Please don't move stuff around and break the phone

This plugin allows rendering of (near) fully functional phones. It uses an API that is intended to be scalable enough for most modern-day mobile operating systems to be compatible.
If you are wishing to develop with it then refer below

# Creating a Phone

These instructions will change as updates are rolled out, I'll try update all the json files automatically with each update.

## Step 1
Create a folder in showstuff/www/phone/phones and name it after your phone. Lowercase alpha only. No spaces.

## Step 2
Populate the folder with:
* A json file with the same name as your phone's folder. (EG: iphone.json)
* An image representing the phone background.
** If your phone has multiple components then only save the background layer of the phone that the screen is allowed to overlay and the other component(s) separately (android as example).

## Step 3
Use the following temeplate for your json file:

```
{
  "phone": { // This needs to remain "phone" permanently.
    "name": "iphone", // The name of the phone, preferably the same as your previous folder and json file.
    "left": 0, // Container left offset, safe to leave at 0 (preferred and might be overridden in future)
    "top": 0, // Container top offset, safe to leave at 0 (preferred and might be overriden in future)
    "width": "100%", // Container full width, safe to leave at 100% (preferred and might be overriden in future)
    "phoneImage": { // This alters the background phone image (the actual device)
      "file":"./phones/iphone/iphone.png", // Specify the URI (Warning: Not limited to local directory)
      "width":"447px", // Width of phone device
      "height":"931px" // Height of phone device
    },
    "wallpaper": {
      "width": "375px", // Wallpaper width, the same as the screen width
      "height": "664px" // Wallpaper height, this defines the screen height
    },
    "screen": {
      "width": "375px", // Screen width, same as wallpaper width
      "top": "136px", // Screen top offset to fit on device
      "left": "36px" // Screen left offset to fit on device
    },
    "metaWidgets": { // The widgets that appear on the top of the screen
      "carrier": true, // true = enabled, false = disabled
      "signal": true,
      "battery": { // You can over-ride font-awesome classes by setting an object method called class. (more customization options coming soon)
        "class": "fa fa-bath"
      }
    },
    "template": {  
      "scss": "./phones/iphone/iphone.scss", // Allows over-riding of default styles/class etc.
      "scripts": [] // Array of scripts to add. (Does not work currently)
    },
    "homeButton": {
      "enabled": true, // The homebutton, disabling this will prevent your phone from functioning
      "id":"iphone-home-btn", // The ID that you would like to give to this element. Try use the syntax I did <phoneName>-home-btn
      "left": "199px", // Homebutton left offset
      "bottom":"43px" // Homebutton bottom offset
    },
    "lockScreen": {
      "ctaType": "click", // Available: click, slide (slide does not work yet)
      "ctaText": "Click the home button to unlock", // The instruction text to display on the lockscreen
      "ctaClickToUnlockElement": "iphone-home-btn", // ID of element to click to unlock the screen (take note of homeButton.id) ** soon to support arrays of selectors
      "offset": { // ctaText offset
        "bottom":"126px",
        "left":"100px"
      }
    }
  }
}
``` 
