import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { createParticlesText } from '/js/myTexts';


let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, imgOne, imgTwo, texts, INTERSECTED ,intersects, mouse, raycaster;
let time = 0;
let step = 0.01;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  cube = createMeshes( scene );

  texts = createParticlesText ( scene, 'X\nO');

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  document.addEventListener( 'mousemove', onDocumentMouseMove );
  window.addEventListener( 'resize', onWindowResize );

}

function update() {
  stats.update();

  var theX = lerp ( cube.position.x , 4, time  );
  var theY = lerp ( cube.position.y , 4, time  );
  var theZ = lerp ( cube.position.z , 4, time  );

  cube.position.set( theX, theY, theZ );

  time += step;
  if (time <= 0 || time >=1)step = -step ;


 
  raycaster.setFromCamera( mouse, camera );
  raycaster.params.Points.threshold = .05;
  intersects = raycaster.intersectObjects( texts );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].index ) {


      console.log('eooooo Si', intersects[0].index )

      INTERSECTED = intersects[ 0 ].index;
    }

  } else if ( INTERSECTED !== null ) {

    console.log('pos no');

    INTERSECTED = null;

  }

}

function render() {

  renderer.render( scene, camera );

}
function lerp(a, b, t) {return a + (b - a) * t}

const interpolation = ( a, b , t ) => { 


  return a + ( b - a ) * t

};


function onDocumentMouseMove( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );

}




init();