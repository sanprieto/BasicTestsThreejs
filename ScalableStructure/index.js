import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, imgOne, imgTwo ;

const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function ( ) {
    init();
    console.log( 'begint init()')
  };

  let loader = new THREE.TextureLoader(manager);
  loader.load( urlData, function ( texture ) {
      texture.encoding = THREE.sRGBEncoding;
      imgOne = new THREE.MeshBasicMaterial( {
        map: texture
       } );

  } );
  let loader2 = new THREE.TextureLoader( manager);
  loader2.load( urlData2, function ( texture2 ) {
      texture2.encoding = THREE.sRGBEncoding
      imgTwo = texture2;

  } );
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {

  preload();
  console.log( 'begin preload')
} else {
  document.addEventListener("DOMContentLoaded", preload); 
  console.log( 'begin preload')
}

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene );

  cube = createMeshes( scene, imgOne );
  createImg( scene,0,-4,-11, imgTwo, .2);

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );
  window.addEventListener( 'resize', onWindowResize );

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



