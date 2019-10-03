import * as THREE from 'three';

function createCamera( container ) { 

  const cam = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 100 );
  cam.position.set( -5, 5, 7 );

  return cam;

}

function createRenderer( container ) {

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

  return renderer;

}

export { createCamera, createRenderer };