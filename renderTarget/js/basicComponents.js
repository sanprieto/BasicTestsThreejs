import * as THREE from 'three';

function createCamera( container ) { 

  const cam = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 100 );

  // const cam = new THREE.OrthographicCamera( 
  //   container.clientWidth  / - 50, 
  //   container.clientWidth  / 50, 
  //   container.clientHeight / 50, 
  //   container.clientHeight / - 50, 
  //   1, 100 );
  
  cam.position.set( 0,0,20 );

  return cam;

}

function createRenderer( container ) {

  const renderer = new THREE.WebGLRenderer( { 
    preserveDrawingBuffer: true,
    antialias: true, 
    alpha: true,
    outputEncoding: THREE.sRGBEncoding,
    
  } );

  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  return renderer;

}

export { createCamera, createRenderer };