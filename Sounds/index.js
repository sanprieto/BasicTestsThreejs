import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';

let camera;
let container;
let renderer;
let scene;
let cube;

document.querySelector('button').addEventListener('click', function() {

  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();

  audioLoader.load( './dos.ogg', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
  });
  console.log( listener.context.state )
});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x5C8AE6 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

	cube.rotation.z += 0.03;
	cube.rotation.x -= 0.01;
}

function render() {

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();

