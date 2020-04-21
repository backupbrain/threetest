int maxPoints = 500; // 50000;

PShape particles;
pins = new int[maxPoints];
float screenArea = window.screen.width * window.screen.height;
float perPointArea = screenArea / maxPoints;
int maxPointDiameter = int(sqrt(perPointArea / PI));
int lastFrameTime_ms = millis();

println(maxPoints + " points (" + maxPointDiameter + ")  * " + perPointArea + " pixels = " + screenArea + " total pixels");

void setup() {
	size(window.screen.width, window.screen.height, P3D);
	colorMode(HSB, 100);
	background(0);
	stroke(255);
	frameRate(60);

	int startTime = millis();
	
	particles = createShape(PShape.GROUP);
	for (int n = 0; n < npartTotal; n++) {
		float cx = random(0, window.screen.width);
		float cy = random(0, window.screen.width); 
		float cz = random(-100, 100);

		PShape part = createShape();
		part.beginShape(POINTS);
		part.vertex(cx, cy, cz);
		part.endShape();   
		particles.addChild(part);
	}

	hint(DISABLE_DEPTH_MASK);


  background(255);
 
  translate(width/2, height/2);
  rotateY(frameCount * 0.01);
 
  shape(particles);
 
  fcount += 1;
  int m = millis();
  if (m - lastm > 1000 * fint) {
    frate = float(fcount) / fint;
    fcount = 0;
    lastm = m;
    println("fps: " + frate); 
  }  
	/*
	for (i=0; i<pins.length; i++) {
		pins[i] = new Pin(
			random(0, window.screen.width),
			random(0, window.screen.height),
			maxPointDiameter
		);
	}
	*/
	/*
	beginShape();
	for (i=0; i<pins.length; i+=3) {
		for (p = 0; p < 3; p++) {
			vertex(random(0, window.screen.width), random(0, window.screen.height), 0);
		}
	}
	endShape();
	*/
	int endTime = millis();
	float executionTime_s = (endTime - startTime) / 1000;
	println("Rendered " + maxPoints + " dots in " + executionTime_s + " seconds");
	noLoop();
}


void draw() {
	/*
	int frameTime_ms = millis();
	int frameDiff_ms = frameTime_ms - lastFrameTime_ms;
	background(100);
	boolean doPrint = false;


	//float hueChange = hueRotationVelocity * frameDiff_ms;


	for (i=0; i<pins.length; i++) {
		if (i == 0) {
			doPrint = true;
		}
		pins[i].animate(frameTime_ms, lastFrameTime_ms, frameDiff_ms, doPrint);
	}
	//println("rendering " + frameTime_ms);
	lastFrameTime_ms = frameTime_ms;
	*/
}

class Pin {
	int x, y;
	float diameter = 1.0;
	fload angularVelocity = 0.0;
	int hue = 0;
	float hueRotationVelocity = random(-0.01, 0.01);
	int saturation = 0;
	int brightness = 0;
	int alpha = 255;

	Pin(int x, int y, diameter) {
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.angularVelocity = random(-0.001, 0.001);

		this.hue = random(0, 255);
		this.saturation = random(0, 255);
		this.brightness = random(0, 255);

		this.render();
	}

	void animate(frameTime_ms, lastFrameTime_ms, frameDiff_ms, doPrint) {
		this.diameter = Math.sin(frameTime_ms / 1000) * (maxSpotDiameter / 2) + (maxSpotDiameter); 
		/*
		int hue = round(this.hue + hueChange);
		if (hue > 0) {
			hue = hue % 255;
		} else {
			hue = 255-(-hue % 255);
		}

		if (doPrint) {
			println(hue);
		}
		this.hue = abs(hue); //(this.hueRotationVelocity * frameTimeDiff_ms) % 255;
		*/
		this.render();
	}

	void render() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		ellipse(
			this.x,
			this.y,
			this.diameter,
			this.diameter
		);
	}
}