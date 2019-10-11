import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import Stats from 'stats.js';
import { createTextByLines, createTextByLetters } from '/js/myTexts';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera;
let container;
let renderer;
let scene;
let cube;
let texts;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xB3CCFF );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  //texts = createTextByLines( scene, 'Everything you \ncan imagine \nis real' );
  texts = createTextByLetters( scene, 'Everything you \ncan imagine \nis real' );
  
  //cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  stats.update();

  texts.forEach( ( obj,i ) => {
 
    obj.rotation.y += 0.001 * i ;
    obj.rotation.x += 0.001 * i ;

  } );
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

