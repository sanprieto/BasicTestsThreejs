import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import imageURL from './img/water.jpg';

let camera;
let container;
let renderer;
let scene;
let sphere;
let uniforms;
let displacement, noise;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  uniforms = {
    "amplitude": { value: 1.0 },
    "color": { value: new THREE.Color( 0xff2200 ) },
    "colorTexture": { value: new THREE.TextureLoader().load( imageURL ) }
  };
  uniforms[ "colorTexture" ].value.wrapS = uniforms[ "colorTexture" ].value.wrapT = THREE.RepeatWrapping;

  var radius = 50, segments = 128, rings = 64;

  let geometry = new THREE.SphereBufferGeometry( radius, segments, rings );

  displacement = new Float32Array( geometry.attributes.position.count );
  noise = new Float32Array( geometry.attributes.position.count );

  for ( var i = 0; i < displacement.length; i ++ ) {
    noise[ i ] = Math.random() * 5;
  }

  geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 1 ) );


  sphere = createMeshes( scene, uniforms, geometry );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  const time = 0.0005 * performance.now();
  sphere.rotation.y = sphere.rotation.z = time;

  uniforms[ "amplitude" ].value = 2.5 * Math.sin( sphere.rotation.y * 0.125 );
  uniforms[ "color" ].value.offsetHSL( 0.0001, 0, 0 );

  for ( var i = 0; i < displacement.length; i ++ ) {
    displacement[ i ] = Math.sin( 0.1 * i + (time*.05) );
    noise[ i ] += 0.5 * ( 0.5 - Math.random() );
    noise[ i ] = THREE.Math.clamp( noise[ i ], - 5, 5 );
    displacement[ i ] += noise[ i ];
  }
  sphere.geometry.attributes.displacement.needsUpdate = true;
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

