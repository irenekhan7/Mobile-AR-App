//multiple targets
var World = {
	loaded: false,

	init: function initFn() {
		/* Disable all sensors in "IR-only" Worlds to save performance. If the property is set to true, any geo-related components (such as GeoObjects and ActionRanges) are active. If the property is set to false, any geo-related components will not be visible on the screen, and triggers will not fire.*/
		AR.context.services.sensors = false;
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		// Initialize Tracker
		// Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
		// e.g. replace "pageOne" used for creating the AR.Trackeable2DOBject below, with the name of one of your new target images.
		this.tracker = new AR.Tracker("assets/four_rooms.wtc", {
			onLoaded: this.worldLoaded
		});

		// Create overlay butler for hallway
		var imgHallwayButler = new AR.ImageResource("assets/butler.png");
		var overlayHallwayButler = new AR.ImageDrawable(imgHallwayButler, .9, {
			offsetX: -0.15,
			offsetY: 0
		});
		// Create a second overlay maid for hallway
		var imgHallwayMaid = new AR.ImageResource("assets/maid_hallway.png");
		var overlayHallwayMaid = new AR.ImageDrawable(imgHallwayMaid, .5, {
			offsetX: 0.14,
			offsetY: 0.08
		});
		//render the hallway with the butler and maid as an array
		var pageHallway = new AR.Trackable2DObject(this.tracker, "1_hallway", {
			drawables: {
				cam: [overlayHallwayButler, overlayHallwayMaid]
			}
		});

		// Drawing room - dessert items
		var imgDrawingDessert = new AR.ImageResource("assets/basket_icefruits.png");
		var overlayDrawingDessert = new AR.ImageDrawable(imgDrawingDessert, 0.25, {
			offsetX: 0.07,
			offsetY: -0.01
		});
		//render the drawing with overlays
		var pageDrawingRoom = new AR.Trackable2DObject(this.tracker, "2_drawingroom", {
			drawables: {
				cam: overlayDrawingDessert
			}
		});

		// Front parlor - Create overlay young lady
		var imgParlorLady = new AR.ImageResource("assets/lady_young.png");
		var overlayParlorLady = new AR.ImageDrawable(imgParlorLady, 0.8, {
			offsetX: -0.15,
			offsetY: -0.01,
			zOrder: 1
		});
		// Front parlor - Create overlay gentleman
		var imgParlorGman = new AR.ImageResource("assets/gentleman.png");
		var overlayParlorGman = new AR.ImageDrawable(imgParlorGman, 0.8, {
			offsetX: 0.14,
			offsetY: 0.01,
			zOrder: -1
		});
		//render the front parlor with overlays
		var pageParlorLady = new AR.Trackable2DObject(this.tracker, "3_parlor_front", {
			drawables: {
				cam: [overlayParlorLady, overlayParlorGman]
			}
		});

		// Dining room - Create overlay maid
		var imgDiningMaid = new AR.ImageResource("assets/maid_dining.png");
		var overlayDiningMaid = new AR.ImageDrawable(imgDiningMaid, 0.9, {
			offsetX: 0.17,
			offsetY: -0.1
		});
		//render the dining room with overlays
		var pageDiningRoom = new AR.Trackable2DObject(this.tracker, "4_diningroom", {
			drawables: {
				cam: overlayDiningMaid
			}
		});
	},
	//thumbnail of the target image
	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight1 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
		var cssDivRight2 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
		document.getElementById('loadingMessage').innerHTML =
		"<div" + cssDivLeft + ">Scan a room</div>" +
			"<div" + cssDivRight1 + ">(view images)</div>";
	}
};

World.init();