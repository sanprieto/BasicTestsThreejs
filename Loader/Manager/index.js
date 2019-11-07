import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');
let imgOne, imgTwo, plane;

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = imgOne;
  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createImg( scene,0,-4,-11, imgTwo, .5);

  //cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();
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
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};
manager.onLoad = function ( ) {
  init();
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

  console.log( 'There was an error loading ' + url );

};


let loader = new THREE.TextureLoader(manager);
loader.load( urlData, function ( texture ) {
    texture.encoding = THREE.sRGBEncoding
    imgOne = texture;

} );

let loader2 = new THREE.TextureLoader( manager);
loader2.load( urlData2, function ( texture2 ) {
    texture2.encoding = THREE.sRGBEncoding
    imgTwo = texture2;

} );

