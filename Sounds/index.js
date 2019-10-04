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

document.querySelector('button').addEventListener('click', function() {
  init();
});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );

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

    if(beep.getFrequencyData()[i] >=1 ){
      cubes[i].scale.y = beep.getFrequencyData()[i]*0.05;
    }
    console.log ();
    cubes[i].material.color.setHSL( beep.getFrequencyData()[i] /100 +0.2 , 0.9, 0.6 );
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

//init();

