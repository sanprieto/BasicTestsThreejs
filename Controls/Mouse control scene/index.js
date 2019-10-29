import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  //createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene );
  cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  stats.update();
	cube.rotation.z += 0.03;
	cube.rotation.x -= 0.01;

  camera.position.x += ( mouseX - camera.position.x )   * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );

}

function render() {

  renderer.render( scene, camera );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) /180;
  mouseY = ( event.clientY - windowHalfY ) /620;

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );
document.addEventListener( 'mousemove', onDocumentMouseMove );

init();