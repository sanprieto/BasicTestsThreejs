import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createParticles } from '/js/objects';
import Stats from 'stats.js';

const urlData = require('/img/spark1.png');
const urlData2 = require('/img/spark2.png');
const urlData3 = require('/img/piece.png');

let camera;
let container;
let renderer;
let scene;
let particles, imgOne, imgTwo, imgThree ;

let stats = new Stats();
document.body.appendChild( stats.dom );

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  particles  = createParticles( scene, imgTwo, 1, 1,1,10, .8 , .9, .5, .001);

  particles  = createParticles( scene, imgTwo, 10000, 200,200,200, .8 , .9, 0.99, 1);

  particles  = createParticles( scene, imgTwo, 10000, 200,200,200, .5 , .9, .5, 1);

  particles  = createParticles( scene, imgTwo, 1, 4,1,1, .5 , .9, .5, .001);

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

  const time =  Date.now() * 0.00025;

  const geometry = particles[0].geometry;
  const geometry2 = particles[3].geometry;
  const attributes = geometry.attributes;
  const attributes2 = geometry2.attributes;

  for ( var r = 0; r < attributes.size.array.length; r ++ ) {

    attributes.size.array[ r ] = 25 + 16 * Math.sin( 0.5 * r + time );
    attributes2.size.array[ r ] = 20 + 10 * Math.sin( 0.5 * r + time );

  }
  attributes.size.needsUpdate = true;
  attributes2.size.needsUpdate = true;

  particles[0].rotation.y = time * -0.02;

  particles[1].rotation.y = time * -0.015;
  particles[1].rotation.x = time * 0.0055;


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


let manager = new THREE.LoadingManager();

manager.onLoad = function ( ) {
  init();
};

let loader = new THREE.TextureLoader(manager);
loader.load( urlData, function ( texture ) {

    imgOne = texture;


} );
let loader2 = new THREE.TextureLoader(manager);
loader2.load( urlData2, function ( texture2 ) {

    imgTwo = texture2;

} );
let loader3 = new THREE.TextureLoader(manager);
loader3.load( urlData3, function ( texture3 ) {

    imgThree = texture3;

} );