import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
import Stats from 'stats.js';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');
let imgOne, imgTwo, plane;

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  cube = createMeshes( scene );
  cube.material = imgOne;
  console.log( imgOne.map.image.width );
  plane = createGridHelp( scene );
  plane.material = imgTwo;
  console.log( imgTwo.map.image.height );

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

var manager = new THREE.LoadingManager();
manager.onLoad = function ( ) {
  init();
};

let loader = new THREE.TextureLoader(manager);
loader.load( urlData2, function ( texture ) {

    imgOne = new THREE.MeshBasicMaterial( {
      map: texture
     } );

} );

let loader2 = new THREE.TextureLoader(manager);
loader2.load( urlData, function ( texture ) {

    imgTwo = new THREE.MeshBasicMaterial( {
      map: texture
     } );

} );
