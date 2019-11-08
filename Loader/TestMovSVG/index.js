import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
//import { SVGLoader } from '/js/SVGLoader';
import { myLoaderSVG } from '/js/myLoaderSVG';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { waves, wavesBuffer } from '/js/waves';

const urlData = require('/img/girl.png');
const urlData2 = require('/img/brujula.jpg');
const urlData3 = require('/img/hair.svg');
const urlData4 = require('/img/1.png');
let imgOne, imgTwo, plane;
let objects =[];

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, myGroup, girl;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );
  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  scene.add( myGroup );

  myGroup.position.set( -69, 78, -10)

  plane = createGridHelp( scene );
  girl = createImg( scene,.99,-7.6,-11, imgOne, .2);
  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();
 // wavesBuffer( myGroup, 1,4);
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
    texture.encoding = THREE.sRGBEncoding;
    imgOne = texture;

} );
let loader2 = new THREE.TextureLoader( manager );
loader2.load( urlData2, function ( texture2 ) {
    texture2.encoding = THREE.sRGBEncoding;
    imgTwo = texture2;

} );

myGroup = myLoaderSVG( manager, urlData3 )



