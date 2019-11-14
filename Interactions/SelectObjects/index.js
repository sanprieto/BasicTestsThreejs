import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import DragControls from '/js/myDragControls';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, cube2, imgOne, imgTwo;
let cubeOne = false;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let objects = [];

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  //createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene );

  cube = createMeshes( scene, imgOne );
  cube.name='cubeOne';
  objects.push( cube );

  cube2 = createMeshes( scene, imgOne );
  cube2.name = 'cubeTwo';
  cube2.position.x = 2;
  objects.push( cube2 );

  createImg( scene,0,-4,-11, imgTwo, .2);
  
  renderer = createRenderer( container );
  const dragControls = new DragControls( objects, camera, renderer.domElement);

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

  if( cubeOne ){

    cube.rotation.z += 0.03;
    cube.rotation.x -= 0.01;

  }
  cube2.rotation.z += 0.03;
  cube2.rotation.x -= 0.01;

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

let loader = new THREE.TextureLoader( manager );
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

function changeBoolean(value){
  cubeOne = value;
}
export { cubeOne, changeBoolean };