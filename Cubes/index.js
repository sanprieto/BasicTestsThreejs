import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import Stats from 'stats.js';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera;
let container;
let renderer;
let scene;
let cubes;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xB3CCFF );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  cubes = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

   const theTime = performance.now() * 0.001;

      for ( var o = 0; o < cubes.length; o++ ) {

          var center = new THREE.Vector2(0,6);
          var vLength = cubes[o].geometry.vertices.length;
          for (var i = 0; i < vLength; i++) {
            var v = cubes[o].geometry.vertices[i];
            var dist = new THREE.Vector2(v.x, v.y).sub(center);

              v.z = Math.sin(dist.length()/- 4 + (theTime)) * 3;
          }

         cubes[o].geometry.verticesNeedUpdate = true;
         cubes[o].position.x += 0.009;

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

