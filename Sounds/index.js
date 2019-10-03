import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
//import { createMusic } from '/js/music';

let camera;
let container;
let renderer;
let scene;
let cube;
let data;


  
function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xC3B5FF );

  camera = createCamera( camera, container );
  createOrbitControls( camera, container );
  createLights( scene );
  cube = createMeshes( cube, scene );

  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );
  console.log( listener.context );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();

  audioLoader.load( 'dos.mp3' , function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
  });

document.querySelector('#push').addEventListener('click', function() {
  listener.context.resume().then(() => {
    console.log('Playback resumed successfully');
      sound.play();
  });
});

  renderer = createRenderer( renderer, container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  });

}

function update() {
  //console.log(data)
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

