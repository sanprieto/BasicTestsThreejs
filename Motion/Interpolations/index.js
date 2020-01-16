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

var t = 0, dt = 0.01;

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, imgOne, imgTwo ;

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

}

function update() {
  stats.update();

  var newX = lerp( -4, 4, ease(t));   // interpolate between a and b where
  var newY = lerp( 0, 0, ease(t));   // t is first passed through a easing
  var newZ = lerp( 0, 0, ease(t));   // function in this example.
  cube.position.set( newX, newY, newZ );
  t += dt;
  if (t <= 0 || t >=1) dt = - dt;

}

function render() {

  renderer.render( scene, camera );

}

function lerp(a, b, t) {return a + (b - a) * t}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}


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