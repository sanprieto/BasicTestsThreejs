import * as THREE from 'three';

function createCamera( container ) { 


  const perspective = 800;
  const fov = (180 * (2 * Math.atan(container.clientHeight / 2 / perspective))) / Math.PI;

  // console.log( 'fov', fov )

  const cam = new THREE.PerspectiveCamera( fov, container.clientWidth / container.clientHeight, 1, 10000 );
  cam.position.set( 0,0,perspective );

  return cam;

}

function createRenderer( container ) {

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

  return renderer;

}

export { createCamera, createRenderer };