
// import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
//     import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/RGBELoader.js';
// 	import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js';

// 			let camera, scene, renderer;

// 			init();
// 			render();

// 			function init() {

// 				const container = document.createElement( 'div' );
// 				document.body.appendChild( container );

// 				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
// 				camera.position.set( - 1.8, 0.6, 2.7 );

// 				scene = new THREE.Scene();

// 				new RGBELoader()
// 					.setPath( 'textures/equirectangular/' )
// 					.load( 'royal_esplanade_1k.hdr', function ( texture ) {

// 						texture.mapping = THREE.EquirectangularReflectionMapping;

// 						scene.background = texture;
// 						scene.environment = texture;

// 						render();

// 						// model

// 						const loader = new OBJLoader().setPath( 'models/DamagedHelmet/obj/' );
// 						loader.load( 'qweqewqew.obj', function ( gltf ) {

// 							scene.add( gltf.scene );

// 							render();

// 						} );

// 					} );

// 				renderer = new THREE.WebGLRenderer( { antialias: true } ); 
// 				renderer.setPixelRatio( window.devicePixelRatio );
// 				renderer.setSize( window.innerWidth, window.innerHeight );
// 				renderer.toneMapping = THREE.ACESFilmicToneMapping;
// 				renderer.toneMappingExposure = 1;
// 				renderer.outputColorSpace = THREE.SRGBColorSpace;
// 				container.appendChild( renderer.domElement );

// 				const controls = new OrbitControls( camera, renderer.domElement );
// 				controls.addEventListener( 'change', render ); // use if there is no animation loop
// 				controls.minDistance = 2;
// 				controls.maxDistance = 10;
// 				controls.target.set( 0, 0, - 0.2 );
// 				controls.update();

// 				window.addEventListener( 'resize', onWindowResize );

// 			}

// 			function onWindowResize() {

// 				camera.aspect = window.innerWidth / window.innerHeight;
// 				camera.updateProjectionMatrix();

// 				renderer.setSize( window.innerWidth, window.innerHeight );

// 				render();

// 			}

// 			//

// 			function render() {

// 				renderer.render( scene, camera );

// 			}

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/RGBELoader.js';

let camera, scene, renderer;

init();
render();

function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    new RGBELoader()
        .setPath('textures/equirectangular/')
        .load('royal_esplanade_1k.hdr', function (texture) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            render();

            // model

            const loader = new OBJLoader().setPath( 'models/DamagedHelmet/obj/' );
			loader.load( 'qweqewqew.obj', function (object) {

    // Calculate the bounding box after the model has loaded
    const boundingBox = new THREE.Box3().setFromObject(object);
    
    // Get the center of the bounding box
    const center = boundingBox.getCenter(new THREE.Vector3());
    
    // Move the model's position to center it
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);

	// After loading the model

const size = boundingBox.getSize(new THREE.Vector3());

// Calculate the max dimension of the bounding box
const maxDim = Math.max(size.x, size.y, size.z);
let fov = camera.fov * (Math.PI / 180);
let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

cameraZ *= 2; // Optional: Increase the multiplier to give more "breathing space" around the model



camera.updateProjectionMatrix();

// Optionally, if you're using OrbitControls, update the target to the center of the model
controls.target.set(center.x, center.y, center.z);
controls.update();

render();

                scene.add(object);

                render();

            });

        });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function render() {

    renderer.render(scene, camera);

}
