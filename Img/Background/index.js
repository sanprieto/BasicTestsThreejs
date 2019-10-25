import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { loadImg } from '/js/images.js';
import Stats from 'stats.js';

const urlData = require('/img/starts.jpg');


let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, bgTexture;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  
  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  const loader = new THREE.TextureLoader();
  const bgTexture = loader.load(urlData );
  bgTexture.encoding = THREE.sRGBEncoding
  scene.background = bgTexture;

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

