import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import { createMusic } from '/js/theMusic';

const urlData = require('./music/dos.ogg');
let camera;
let container;
let renderer;
let scene;
let cubes;
let beep;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x5C8AE6 );

  camera = createCamera( container );

  beep = createMusic( camera, urlData );
  console.log( beep );

  createOrbitControls( camera, container );
  createLights( scene );
  cubes = createMeshes( scene );
  console.log(scene)

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  for ( var i = 0; i < 16; i ++ ) {

    cubes[i].position.y = beep.getFrequencyData()[i];
  }
  //console.log( beep.getFrequencyData() )

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

