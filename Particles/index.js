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
let particles;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  particles  = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  const time = ((.001 * performance.now())  % 15 ) / 15;

  for (let i = 0; i < 3; i++) {

    particles [i].rotation.z = .0001 * performance.now() + i ;
    particles [i].rotation.y = .00003 * performance.now() + i ;
    particles [i].rotation.x = .00003 * performance.now() * i ;
    particles [i].material.color.setHSL(  time + (i*.2) , 0.9, 0.6 );

  }

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

