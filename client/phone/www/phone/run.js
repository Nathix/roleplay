			var d = true;
			function debug(text) {
				if(d) console.log(text);
			}
			var settings = {
				screen: "#screen",
				topMeta: "#top-meta",
				phoneDevice: "#phone-device",
				container: "#container",
				container: "#container-inner",
				url: "/www",
				uri: "phone",
			};

			var webElementController = {
				renderPhone: function(phoneData) {
					debug("Rendering Phone");
					screenController.currPhone = phoneData.phone;
					var phone = screenController.currPhone;
					this.renderDevice(phone.phoneImage);
					this.renderTopMeta(phone.metaWidgets);
					this.renderHomeButton(phone.homeButton);
					this.renderLockScreen(phone.lockScreen);
					this.renderWallpaper(phone.wallpaper);
					screenController.generateScreen();
					debug("Done");
				},
				// phoneImage refers to the json reference of phone rendering
				renderDevice: function(phoneImage) {
					$(settings.phoneDevice).css(
					{
						"background-image":"url("+phoneImage.file+")",
						"background-repeat":"no-repeat",
						"background-size":phoneImage.width,
						"width":phoneImage.width,
						"height":phoneImage.height
					});
				},
				// Renders the topMeta items
				renderTopMeta: function(topMeta) {
					this.metaModifyCheck(topMeta.carrier, 'carrier');
					this.metaModifyCheck(topMeta.signal, 'signal')
					this.metaModifyCheck(topMeta.battery, 'battery')
				},
				// metaItem refers to a single value in the metaItem object in the phone json, key refers to the specific key being altered in this instance
				metaModifyCheck: function(metaItem, key) {
					if(typeof metaItem != "object") return false;
					$(settings.topMeta).find('#' + key).find('i').attr({"class":metaItem.class});
					return true;					
				},
				// Home button refers to the json instance same as the others
				renderHomeButton: function(homeButton) {
					$(settings.screen).after(
						$("<div></div>", {id:homeButton.id, class: 'home-button'}).css({"left":homeButton.left,"bottom":homeButton.bottom})
					);			
				},
				renderLockScreen: function(lockscreen) {
					switch(lockscreen.ctaType) {
						case "slide": 
							
							break;
						case "click": 
							$("#lockscreen-text").css({left:lockscreen.offset.left, bottom:lockscreen.offset.bottom});
							$("#lockscreen-text").find("p").html(lockscreen.ctaText);
							console.log(lockscreen.ctaClickToUnlockElement);
							document.getElementById(lockscreen.ctaClickToUnlockElement).addEventListener("click", function() {
								app.showDesktop();
							});
							break;
					}	
				},
				renderWallpaper: function(wallpaper) {
					debug("---WALLPAPER---");
					debug(wallpaper);
					$("#wallpaper").css({width:wallpaper.width, height:wallpaper.height});
				}
			};
			
			var screenController = {
				currPhone: null,
				currViewingElement: null,
				elementsEnabled: [],
				generateScreen: function() {
					if(this.currPhone == null) console.log("You absolute idiot, you can't generate a screen when you haven't given currPhone a phone!!!");
					var self = this;
					$(settings.container).css(
					{
						"width":"100%",
						"left":self.currPhone.left,
						"top":self.currPhone.top
					});
					$(settings.containerInner).css(
					{
						"width": self.currPhone.width
					});
					$(settings.screen).css(
					{	
						"width":self.currPhone.screen.width,
						"left": self.currPhone.screen.left,
						"top": self.currPhone.screen.top
					});
				},
				displayScreenElement: function(element) {
					var self = screenController;
					self.elementsEnabled.push(element);
					$(element).fadeIn(500, function() { $(element).removeClass('hidden'); });
				},
				closePrevious: function(callback) {
					var self = screenController;
					for(i = 0; i < self.elementsEnabled.length; i++) {
						$(self.elementsEnabled[i]).fadeOut(100);
					}
					$("#wallpaper").removeClass("lockscreen");
					return callback;
				}
			};
			
			var app = {
				showLockScreen: function() {
					screenController.closePrevious();
					$("#wallpaper").addClass("lockscreen");
					screenController.displayScreenElement("#notifications");
					screenController.displayScreenElement("#lockscreen-text");
					screenController.currViewingElement = "lockscreen";
				},
				showDesktop: function() {
					if(screenController.currViewingElement == "desktop") return;
					screenController.closePrevious();
					screenController.displayScreenElement("#desktop");
					screenController.currViewingElement = "desktop";
				},
				showApp: function(appName) {
					screenController.closePrevious();
					screenController.displayScreenElement(".app#" + appName);
					screenController.currViewingElement = appName;
				}
			}; 
			function fetchPhoneData(phone) {
				debug("Downloading phone data");
				phone = "iphone";
				var phoneURL = settings.url + "/" + settings.uri + "/phones/" + phone + "/" + phone + ".json";
				$.ajax({
					url: phoneURL,
					method: "POST",
					dataType: "json"
				}).done(function(r) {
					debug("Phone data downloaded, assumably");
					app.showLockScreen();
					webElementController.renderPhone(r);
				}).fail(function() {
					debug("Unable to fetch requested phone data file");
				});
			}
			$(document).ready(function() {
				debug("building phone");
				fetchPhoneData("iphone"); // There is no way to destroy and render a new phone without refreshing.
				jQuery(".app-icon").click(function() {
					var appName = $(this).attr("data-app");
					console.log("clicked");
					app.showApp(appName);
				});
			}); 