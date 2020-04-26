// from: https://codepen.io/seanseansean/pen/EaBZEY
//import { WEBGL } from 'three/examples/jsm/WebGL.js';

class Environment {

	camera = null;
	scene = null;
	renderer = null;
	theta = 0;
	radius = 0;
	inScene = {
		particles: null,
	}

	constructor() {
		
	}

	initSceneScape(cameraSettings) {
		var scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

		var camera = new THREE.PerspectiveCamera(
			cameraSettings.fov,
			cameraSettings.aspect,
			cameraSettings.near,
			cameraSettings.far
		);
		camera.position.x = cameraSettings.initialPosition.x;
		camera.position.y = cameraSettings.initialPosition.y;
		camera.position.z = cameraSettings.initialPosition.z;
		camera.lookAt(cameraSettings.lookAt.x, cameraSettings.lookAt.y, cameraSettings.lookAt.z );
		var renderer = new THREE.WebGLRenderer();


		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );


		this.radius = cameraSettings.initialPosition.z;

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
	}

	addToScene(object) {
		this.inScene.particles = object;
		console.log(this.inScene.particles);
		this.scene.add(object);
	}

	animate() {
	}

	render() {

		//var h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
		//material.color.setHSL( h, 0.5, 0.5 );

		this.theta += 0.1;

		this.camera.position.x = this.radius * Math.sin( THREE.MathUtils.degToRad( this.theta ) );
		this.camera.position.y = this.radius * Math.sin( THREE.MathUtils.degToRad( this.theta ) );
		this.camera.position.z = this.radius * Math.cos( THREE.MathUtils.degToRad( this.theta ) );
		this.camera.lookAt( 0,0,0 );
		this.camera.updateMatrixWorld();

		/*
		for (var i=0; i<this.inScene.particles.length; i++) {
			if (i == 0) {
				console.log(this.inScene.particles[i]);
			}
			this.inScene.particles[i].geometry.color.setHSL( Math.random(), 0.5, 0.5 );
			this.inScene.particles[i].geometry.colorsNeedUpdate = true;
		}
		*/

		this.renderer.render( this.scene, this.camera );
	}


	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}


class Covid19Point {
	position = {
		x: 0.0, y: 0.0, z: 0.0
	}
	color = {
		h: 1.0, s: 1.0, l: 1.0
	}

}


class Covid19Monument {

	cameraSettings = {
		fov: 55,
		aspect: window.innerWidth / window.innerHeight,
		near: 2,
		far: 2000,
		initialPosition: {
			x: 500, y: 500, z: 500
		},
		lookAt: {
			x: 0, y: 0, z: 0
		}
	};

	particleProperties = {
		radius: 1,
		segments: 6,
		thetaStart: 0,
		thetaLength: 6.3,
	};

	effectController = {
		focus: 500.0,
		aperture:	5,
		maxblur:	1.0
	};

	environment = null;
	lastUpdateTime = null; // uninitialized
	animationStartedAt = null;

	particleTranslationArray = null;  // uninitialized
	particleCount = null;  // uninitialized
	particles = null; // unitinialized;
	particleProperties = null; // uninitialized;
	visibles = []; // not initialized
	numUnlockedSoFar = 0;
	selected = 20;


	constructor(environment) {
		this.environment = environment;
	}

	initSceneScape() {
		this.environment.initSceneScape(this.cameraSettings);

		/*
		var postprocessing = {};
		var matChanger = function ( ) {
			postprocessing.bokeh.uniforms[ "focus" ].value = effectController.focus;
			postprocessing.bokeh.uniforms[ "aperture" ].value = effectController.aperture * 0.00001;
			postprocessing.bokeh.uniforms[ "maxblur" ].value = effectController.maxblur;
		};
		matChanger();
		*/
	}

	initializeParticlePrototype() {
		/*
		var circleGeometry = new THREE.CircleBufferGeometry(
			this.particleProperties.radius,
			this.particleProperties.segments,
			this.particleProperties.thetaStart,
			this.particleProperties.thetaLength
		);
		var geometry = new THREE.InstancedBufferGeometry();
		geometry.index = circleGeometry.index;
		geometry.attributes = circleGeometry.attributes;

		return geometry;
		*/
		return null;
	}

	initObjects(geometry) {
		/*
		this.particleCount = 1;
		this.particleTranslationArray = new Float32Array( this.particleCount * 3 );

		var particleDistances = new Float32Array( this.particleCount );
		// we want to create objects within a radius from the center, 
		// evenly distributed (meaning the closer to the center, the less sparse)
		// random discance, random angle X, random angle Y, (random angle Z?)

		var distanceFromCenter = 0;
		for ( var i = 0; i < this.particleCount; i ++ ) {
			var angleX = Math.random() * 2 * Math.PI;
			var x = Math.cos(angleX) * distanceFromCenter;
			var y = Math.sin(angleX) * distanceFromCenter;
			var z = 0.0;
			this.particleTranslationArray[i * 3 + 0] = x;
			this.particleTranslationArray[i * 3 + 1] = y;
			this.particleTranslationArray[i * 3 + 2] = z;
		}

		geometry.setAttribute( 'translate', new THREE.InstancedBufferAttribute( this.particleTranslationArray, 3 ) );


		var material = new THREE.RawShaderMaterial( {
			uniforms: {
				"map": { value: new THREE.TextureLoader().load( '/static/images/circle.png' ) },
				"time": { value: 0.0 }
			},
			vertexShader: '0.5',
			fragmentShader: '0.5',
			depthTest: true,
			depthWrite: true
		} );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( 500, 500, 500 );
		this.environment.scene.add( mesh );
		*/
		/*
		var material = new THREE.LineBasicMaterial( { color: 0x00ffff } );

		var points = [];
		points.push( new THREE.Vector3( - 10, 0, 0 ) );
		points.push( new THREE.Vector3( 0, 10, 0 ) );
		points.push( new THREE.Vector3( 10, 0, 0 ) );

		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		
		var line = new THREE.Line( geometry, material );
		this.environment.addToScene( line );
		*/
		/*
    	var material = new THREE.PointsMaterial({
			color: 0xFFFFFF,
			size: 20,
		});
		*/

		var geometry = new THREE.BufferGeometry();
		var vertices = [];

		var particleCount = 70000;
		this.particleCount = particleCount;

		/*
		var pointMaterial = new THREE.PointsMaterial({
			size: 30,
			sizeAttenuation: true,
			alphaTest: 1,
			transparent: false,
			vertexColors: true,
		});
		//material.color.setHSL( .50, 1.0, 0.5 );
		*/

		
		var texture = new THREE.TextureLoader().load( "/static/images/spark1.png" );
		var material = new THREE.ShaderMaterial( {
			uniforms: {
				color: { value: new THREE.Color( 0xffffff ) },
				pointTexture: { value: texture }
			},
			vertexShader: document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
		} );
		/* */

		/*
		let uniforms = {
			colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
			colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
		}
		let material =  new THREE.ShaderMaterial({
			uniforms: uniforms,
			fragmentShader: fragmentShader(),
			vertexShader: vertexShader(),
		})
		/* */


		/*
		// load particle texture and apply once loaded
		var sprite = new THREE.TextureLoader();
		sprite.load(
			'/static/images/disc.png',
			texture => {
				console.log("texture loaded");
				console.log(texture);
				// in this example we create the material when the texture is loaded
				//var material = new THREE.MeshBasicMaterial( {
				//	map: texture
				//} );

				pointMaterial.map = texture;
				//material.alphaMap = texture;
				pointMaterial.needsUpdate = true;
			},
			undefined,
			err => {
				console.error( 'An error occurred while loading texture.' );
			}
		);
		*/
		


		var colors = [];
		var color = new THREE.Color();
		var sizes = [];
		this.visibles = [];

		for (var p=0; p < particleCount; p++) {
			// calculate x, y, z, from angles
			// https://stackoverflow.com/a/29602921
			var distance = Math.pow(Math.random() * 20000000, 1/3);
			var angleX = Math.random() * 2 * Math.PI;
			var angleY = Math.random() * 2 * Math.PI;
			var angleZ = Math.random() * 2 * Math.PI;
			var pX = (Math.cos(angleZ) * Math.cos(angleX) ) * distance;
			var pY = (Math.sin(angleZ) * Math.cos(angleX) ) * distance;
			var pZ = (Math.sin(angleX) ) * distance;
			//var particle = new THREE.Vector3(pX, pY, pZ);
			vertices.push(pX, pY, pZ);

			color.setHSL( Math.random(), 1, 0.7 );
			colors.push( color.r, color.g, color.b );

			sizes.push( Math.random() * 50 );

			this.visibles.push(false);

		}

		geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		//geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
		geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ));

		geometry.setAttribute( 'ca', new THREE.Float32BufferAttribute( colors, 3 ) );

		var particles = new THREE.Points( geometry, material );


		this.particleLight = new THREE.Mesh(
			new THREE.SphereBufferGeometry( 4, 8, 8 ),
			new THREE.MeshBasicMaterial( { color: 0x999999 } )
		);
		this.environment.addToScene(this.particleLight);

		this.vertices = vertices;
		this.particles = particles;
		this.environment.addToScene(particles);
		this.geometry = geometry;
		this.lastUpdateTime = Date.now();
		//this.likelihoodOfBecomingVisible = 60 * (1000 / this.timeSinceLastUpdate) / this.particleCount;

	}

	render() {
		this.environment.render();
	}

	animate() {
		if (this.animationStartedAt == null) {
			this.animationStartedAt = Date.now();
		}
		var animationTime_s = (Date.now() - this.animationStartedAt) / 1000;
		//console.log(animationTime_s);
		var numToUnlockAtThisPoint =  Math.ceil(this.particleCount * (1.2 * Math.atan(animationTime_s/5 - 3)/Math.PI + 0.48));
		//console.log(numToUnlockAtThisPoint);

		//var timeSinceLastUpdate = Date.now() - this.lastUpdateTime;
		var time = Date.now() * 0.005;
		var sizes = this.geometry.attributes.size.array;
		for ( var i = 0; i < this.particleCount; i ++ ) {
			if (this.visibles[i] == true) {
				sizes[ i ] = 20 * ( 1 + Math.sin( 0.1 * i + time ) );
			} else {
				sizes[ i ] = 0;
				if (this.numUnlockedSoFar < numToUnlockAtThisPoint) {
					this.visibles[i] = true;
					this.numUnlockedSoFar += 1;
				}
			}
			if (this.selected) {
				sizes[this.selected] = 500;
				this.environment.camera.lookAt(this.vertices[i * 3], this.vertices[i * 3 + 1], this.vertices[i * 3 + 2]);
			} else {
				this.environment.camera.lookAt(0, 0, 0);
			}
		}
		this.geometry.attributes.size.needsUpdate = true;
		this.environment.animate();
		//this.lastUpdateTime += timeSinceLastUpdate;


		this.particleLight.position.x = Math.sin( time * 0.07 ) * 100;
		this.particleLight.position.y = Math.cos( time * 0.05 ) * 200;
		this.particleLight.position.z = Math.cos( time * 0.03 ) * 150;
	}

	onDocumentTouchStart(event) {
	}
	onDocumentTouchMove(event) {
	}
	onDocumentMouseMove(event) {
	}
}


var environment = new Environment();
var monument = new Covid19Monument(environment);

window.onload = function(onLoadEvent) {
    'use strict';
    // 'To actually be able to display anything with Three.js, we need three things:
    // A scene, a camera, and a renderer so we can render the scene with the camera.'
    // - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene

    var sceneScape = monument.initSceneScape();
    document.body.appendChild(monument.environment.renderer.domElement);

	window.addEventListener( 'resize', monument.environment.onWindowResize, false );
	document.addEventListener( 'mousemove', monument.onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', monument.onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', monument.onDocumentTouchMove, false );

    var prototypeParticle = monument.initializeParticlePrototype();
    monument.initObjects(prototypeParticle);

    monument.render();
	animate(monument);

    //animate();

}();


function animate() {

	requestAnimationFrame( animate );
	monument.animate();
	monument.render();

}


function vertexShader() {
  return `
  	/*
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
    /* */
    /*
	attribute float size;
	attribute vec3 ca;

	varying vec3 vColor;

	void main() {

		vColor = ca;

		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

		gl_PointSize = size * ( 300.0 / -mvPosition.z );

		gl_Position = projectionMatrix * mvPosition;

	}
	/* */

	attribute float size;
	varying vec3 vColor;
	void main() {
		vColor = color;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_PointSize = size * ( 300.0 / -mvPosition.z );
		gl_Position = projectionMatrix * mvPosition;
	}
	/* */
  `
}
function fragmentShader(argument) {
 return `
 	/*
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
      /* */
      /*
		uniform vec3 color;
		uniform sampler2D pointTexture;

		varying vec3 vColor;

		void main() {

			vec4 color = vec4( color * vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );

			gl_FragColor = color;

		}
	/* */

		uniform sampler2D pointTexture;
		varying vec3 vColor;
		void main() {
			gl_FragColor = vec4( vColor, 1.0 );
			gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
		}
		/* */
  `
}