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
		var overlayHallwayButler = new AR.ImageDrawable(imgHallwayButler, 1, {
			offsetX: -0.15,
			offsetY: 0
		});
		// Create a second overlay maid for hallway
		var imgHallwayMaid = new AR.ImageResource("assets/maid_hallway.png");
		var overlayHallwayMaid = new AR.ImageDrawable(imgHallwayMaid, 1, {
			offsetX: 0.25,
			offsetY: 0
		});
		//render the hallway with the butler and maid as an array
		var pageHallway = new AR.Trackable2DObject(this.tracker, "1_hallway", {
			drawables: {
				cam: [overlayHallwayButler, overlayHallwayMaid]
			}
		});

		// Drawing room - dessert items
		var imgDrawingDessert = new AR.ImageResource("assets/veggies.png");
		var overlayDrawingDessert = new AR.ImageDrawable(imgDrawingDessert, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		//render the drawing with overlays
		var pageDrawingRoom = new AR.Trackable2DObject(this.tracker, "2_drawingroom", {
			drawables: {
				cam: overlayDrawingDessert
			}
		});

		// Front parlor - Create overlay maid
		var imgParlorMaid = new AR.ImageResource("assets/maid_parlor.png");
		var overlayParlorMaid = new AR.ImageDrawable(imgParlorMaid, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		//render the front parlor with overlays
		var pageParlorMaid = new AR.Trackable2DObject(this.tracker, "2_parlor_front", {
			drawables: {
				cam: overlayParlorMaid
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