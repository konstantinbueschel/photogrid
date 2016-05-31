var LTAG = '[PhotoGridWidget]';


/**
 * self-executing function to organize otherwise inline constructor code
 *
 * @param  {Object} args arguments passed to the controller
 * @returns void
 */
(function constructor(args) {

	// variable declaration
	$.data       = [];
	$.intervalId = null;

if (_.has(args, 'data')){
    _.each(args.data, function(photo){
        var photoView = Ti.UI.createImageView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,

				image:        photo.image,
				defaultImage: WPATH('/images/no_image.jpg')
        });

			$.data[$.data.length] = photoView;
    });
    
		$.photos.setViews($.data);
    
    _.has(args, 'index') && $.photos.setCurrentPage(args.index);
}


	if (_.has(args, 'interval') && args.interval !== 0) {

		$.intervalId = setInterval(function () {

			autoScroll();

		}, args.interval);
	}


	OS_IOS && $.photos_win.setTransform(Ti.UI.create2DMatrix().scale(0, 0));

// execute constructor with optional arguments passed to controller
})($.args);


function autoScroll() {

	var intCurrentIndex = $.photos.getCurrentPage(),
		intTotalViews   = $.photos.getViews().length;


    if (intCurrentIndex === (intTotalViews - 1)) {
        intCurrentIndex = 0;
    } else {
        intCurrentIndex++;
    }
    $.photos.setCurrentPage(intCurrentIndex);

} // END autoScroll()


function init() {

	$.photos_win.animate({

		opacity:   1.0,
		transform: Ti.UI.create2DMatrix(),
		duration:  250
	});

	return;

} // END init()


function cleanup() {

Ti.API.debug(LTAG, 'Cleaning up...');

	$.off();
	$.destroy();
	$.removeListener();

	$.intervalId && clearInterval($.intervalId);

	return;

} // END cleanup()


function onPhotoClick(event) {

	if (OS_ANDROID) {

    $.photos_win.close();
    }
	else {

		$.photos_win.animate({

			opacity:   0.0,
			transform: Ti.UI.create2DMatrix().scale(0, 0),
			duration:  300

		}, function () {

			$.photos_win.close();
});


		_.delay(function() {

			$.photos_win.setBackgroundColor('transparent');

		}, 100);
	}

	return;

} // END onPhotoClick()
