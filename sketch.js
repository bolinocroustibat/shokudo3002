//Setup
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var PARTICLES_NUM = 1000;

//Objects
let img;
let shrinker;
let splasher;
let imageCenter;

//Lists
let colors;


function preload() {
	// console.log("preloading...")
	img = loadImage("images/shokudo3000_2_head.png");
	imageCenter = createVector(WIDTH / 2, HEIGHT / 2);
}

function setup() {
	// console.log("setting up...")
	reset();
}

function reset() {
	// console.log("resetting...");

	pixelDensity(1);
	createCanvas(WIDTH, HEIGHT);

	//Extract particle colors from image
	let extractor = new Extractor();
	let kernel_size = extractor.calculateKernelSize(img, PARTICLES_NUM);
	colors = extractor.getColors(extractor.extractBoxes(img, kernel_size));
	colors = shuffle(colors);

	shrinker = new ImageShrinker(img, imageCenter.copy());
	splasher = new Splasher(imageCenter.copy(), colors);

	background(0);

}

function draw() {

	background(0);

	translate(random(-5, 5), random(-5, 5));
	rotate(random(-0.01, 0.01));

	shrinker.draw();
	splasher.update();
	splasher.draw();

	if (frameCount % 1000 == 0) {
		if (shrinker) {
			shrinker.shrink(function () {
				splasher.restart();
				setTimeout(function () {
					reset();
				}, 1400);
			});
		}

	}
}
