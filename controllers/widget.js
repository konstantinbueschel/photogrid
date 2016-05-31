var LTAG = '[PhotoGridWidget]',

	args = $.args,

// default grid configuration
	defaults = {
		// column count in portrait mode
		portraitColumns: 3,
		// column count in landscape mode
		landscapeColumns: 5,
		// space between thumbs
		space: 0,
		// wether title should show up on thumbs or not
		showTitle: false,
		//scroll interval to automatically scroll through the photos
		interval: 0
	},

// grid data
	data = [],

// passed args + defaults
	options = _.defaults(args, defaults);

// apply properties of Ti.UI.View that can be applied to paging control view
[
	"backgroundColor",
	"backgroundImage",
	"backgroundLeftCap",
	"backgroundRepeat",
	"backgroundTopCap",
	"borderRadius",
	"borderWidth",
	"bottom",
	"height",
	"horizontalWrap",
	"left",
	"opacity",
	"right",
	"top",
	"visible",
	"width",
	"zIndex"
].forEach(function (prop) {
	_.has(args, prop) && ($.gridView[prop] = args[prop]);
});

if (_.has(args, 'data')) {
	data = args.data;
	setData(data);
}

/**
 * set items to the grid
 * @param {Array} List of items (item is an {Object} containing image, thumb and title)
 */
function setData(_data) {

	data = _data;
	clearGrid();

	var thumbSize = getThumbSize();

	data.forEach(function (dataItem, index) {

		addItem(dataItem, index, thumbSize);
	});

} // END setData()


/**
 * adds a single item to the grid
 */
function addItem(item, _index, _thumbSize) {
	var index = _index || data.length,
		thumbImage = item.thumb || item.image,
		thumbSize = _thumbSize || getThumbSize();

	if ('undefined' === typeof _index) {

		data[data.length] = item;
	}

	var itemViewOpts = {
		width: thumbSize,
		height: thumbSize,
		top: options.space,
		left: options.space,
		_image: item.image,
		_index: index
	};
	// iOS seems to not support remote background Images on Views, so change it to ImageView
	// Tested in iOS and Android, working
	var itemView = (
		typeof thumbImage !== "string" &&
		_.has(thumbImage, 'apiName') &&
		thumbImage.apiName === "Ti.UI.View"
	) ? thumbImage : Ti.UI.createImageView({

		image: thumbImage,
		preventDefaultImage: true
	});

	itemView.applyProperties(itemViewOpts);

	// BUG: cannot apply not legacy properties with applyProperties, so do it now manually or index will be lost
	itemView._image = item.image;
	itemView._index = index;

	if (options.showTitle) {

		var titleView = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: thumbSize * 0.2,
			backgroundColor: '#000',
			opacity: 0.7,
			bottom: 0
		});

		var titleLabel = Ti.UI.createLabel({
			text: item.title,
			width: Ti.UI.FILL,
			height: (thumbSize * 0.2) - 6,
			left: 4,
			font: {
				fontSize: 14
			},
			ellipsize: true,
			color: '#fff',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
		});

		titleView.add(titleLabel);
		itemView.add(titleView);
	}

	$.addListener(itemView, 'click', item.type === 'button' ? item.callback : onItemSelected);

	$.gridViewContainer.add(itemView);

	return index;

} // END addItem()


function removeItem(_index) {

	var itemView = $.gridViewContainer.getChildren()[_index];

	if (!!itemView) {

		$.removeListener(itemView, 'click', onItemSelected);

		$.gridViewContainer.remove(itemView);

		itemView = null;

		Ti.API.log(LTAG, 'Item removed');
	}
	else {

		Ti.API.log(LTAG, 'Item does not exist');
	}

} // END removeItem()


/**
 * removes data from grid
 */
function clearGrid() {

	if ($.gridViewContainer.children.length > 0) {

		_.each($.gridViewContainer.getChildren, function (itemView) {

			$.removeListener(itemView, 'click', onItemSelected);

			$.gridViewContainer.remove(itemView);

			itemView = null;
		});

		$.gridViewContainer.removeAllChildren();
	}

} // END clearGrid()


/**
 * removes last item from grid
 */
function removeLastItem() {
	data.splice(data.length - 1, 1);

	var itemView = _.last($.gridViewContainer.getChildren());

	$.removeListener(itemView, 'click', onItemSelected);

	$.gridViewContainer.remove(itemView);

	itemView = null;

} // END removeLastItem()


/**
 * calculate thumb size
 * @return {Number} width / height in dp
 */
function getThumbSize() {

	var orientation = Ti.Gesture.orientation,
		screenWidth = Ti.Platform.displayCaps.getPlatformWidth(),
		thumbSize,
		columns = 0;

	OS_ANDROID && (screenWidth /= Ti.Platform.displayCaps.logicalDensityFactor);

	if (orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT) {
		columns = options.landscapeColumns;
	}
	else {
		columns = options.portraitColumns;
	}

	thumbSize = (screenWidth - ( (columns + 1) * options.space )) / columns;
	return Math.floor(thumbSize);

} // END getThumbSize()


/**
 * thumbnail click-listener callback
 * @param {Object} e
 */
function onItemSelected(e) {

	var detailWindow = Widget.createController('photoview', {
		data: data,
		index: e.source._index,
		interval: options.interval
	});

	detailWindow.getView().open();

} // END onItemSelected()


/**
 * resize thumbnails on orientation change
 * @param {Object} e
 */
function onOrientationChange(e) {

Ti.API.debug(LTAG, 'Orientation changed');

	var newSize = getThumbSize();

	_.each($.gridViewContainer.getChildren(), function (itemView) {

		itemView.setWidth(newSize);
		itemView.setHeight(newSize);
	});

} // END onOrientationChange()


/**
 * remove EventListener
 */
function cleanUp() {

Ti.API.debug(LTAG, 'Cleaning up...');

	$.off();
	$.destroy();
	$.removeListener();

	Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);

} // END cleanUp()


/**
 * initialzation
 */
function init() {
	Ti.Gesture.addEventListener('orientationchange', onOrientationChange);

} // END init()


// grid API
exports.setData = setData;
exports.addItem = addItem;
exports.removeItem = removeItem;
exports.removeLastItem = removeLastItem;
exports.getThumbSize = getThumbSize;
exports.clearGrid = clearGrid;
exports.cleanUp = cleanUp;
exports.init = init;
