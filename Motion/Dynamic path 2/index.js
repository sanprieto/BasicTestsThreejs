import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createPath, drawPath } from '/js/myPaths';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera;
let container;
let renderer;
let scene;
let cubes;
let path;
let up = new THREE.Vector3( 0, 1, 0 );
let axis, tangent, radians;
let circumference = 5;
let heightY = 5;
let line;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene )
  cubes = createMeshes( scene );

  path = new createPath( circumference ,heightY );

  line = drawPath( path, scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();
  
  const time = ((.001 * performance.now())  % 2 ) / 2;
  const point = path.getPoint( time );

  if( time >0.988){

    path = new createPath( circumference , heightY  );
    circumference = circumference - .05;
    heightY = heightY + .05;
    drawPath( path, scene );
   
  }
    cubes[0].position.x =  point.x;
    cubes[0].position.y =  point.y;
    cubes[0].position.z =  point.z;




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

