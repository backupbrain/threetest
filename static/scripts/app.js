window.onload = function() {
	console.log("document loaded");

	let canvas = document.getElementById("app")
	let ctx = canvas.getContext("2d");
	let screenSize = {
		width: ctx.canvas.width,
		height: ctx.canvas.height
	};
	console.log(ctx);
	console.log(screenSize);
	//console.log(blueComponent);
	let {data} = ctx.getImageData(0, 0, 10, 10);
	console.log(data);


	// we want about 100 x 100 "pixels"
	pixelWidth = screenSize.width / 100;


	for (var i=500;i--;){
		var px = pxls[$i++ % 10000];
		ctx.fillStyle = 'rgba(' + px.r + ',' + px.g + ',' + px.b + ',' + (px.a / 255) + ')';
		ctx.fillRect(px.x, px.y, pixelWidth, pixelWidth);
	}

	let dims = {
		left: -1.5,
		top: 1,
		right: 1,
		bottom: 1
	}
	//blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 2];
}


function renderScreen(ctx) {
	for (var y=0; y<screenSize.height; i+= pixelWidth) {
		for (var x=0; x<screenSize.width; i+= pixelWidth) {

		}
	}
}