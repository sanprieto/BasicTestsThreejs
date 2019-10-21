import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera;
let container;
let renderer;
let scene;
let cube;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene );
  cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}
function lerp(a, b, t) { 

    return a + (b - a) * t 
}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
function easeInElastic(t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 }
function easeInOutElastic(t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
var t = 0, dt = 0.002;

function update() {
  stats.update();

  let up = lerp( 0, 2* Math.PI , t);

	cube.position.y = 2 * Math.cos( up );
	cube.position.x = 2 * Math.sin( up );

  t += dt;
  if (t <= 0 || t >=1){
    up = lerp( Math.random(), 2* Math.PI , t);
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

