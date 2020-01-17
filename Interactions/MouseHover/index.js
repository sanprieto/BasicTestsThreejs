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
let step = 0.009;
let executionInter = false;
let cont = 0;
let mixer = [];
let startTime = [];
let time = [];

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  //cube = createMeshes( scene );

  texts = createParticlesText ( scene, 'l\nJ');
  console.log( texts )

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

  raycaster.setFromCamera( mouse, camera );
  raycaster.params.Points.threshold = .05;
  intersects = raycaster.intersectObjects( texts );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].index ) {

      mixer.push( intersects[0]);
      startTime.push( performance.now() )


      INTERSECTED = intersects[ 0 ].index;
    }

  } else if ( INTERSECTED !== null ) {

    //console.log('pos no');
    INTERSECTED = null;
  }




  for ( let  x = 0; x < mixer.length; x ++ ) {

    const time = ( .001 * ( performance.now()- startTime[x] )) % 6;

    const zigzag = Math.sin( time * Math.PI );
    //console.log( time )

    const theX = interpolation ( mixer[x].point.x , mixer[x].point.x + 1 , zigzag );
    const theY = interpolation ( mixer[x].point.y, mixer[x].point.y + 1 ,  zigzag );
    const theZ = interpolation ( mixer[x].point.z, mixer[x].point.z + 1 ,  zigzag );

    const pos = mixer[x].object.geometry.attributes.position;
    var vec3 = new THREE.Vector3();

    vec3.x = theX ;
    vec3.y = theY;
    vec3.z = theZ;
    pos.setXYZ( mixer[x].index, vec3.x, vec3.y, vec3.z );
    pos.needsUpdate = true;

  }
}


function render() {

  renderer.render( scene, camera );

}


const interpolation = ( a, b , t ) => { return a + ( b - a ) * t };
const ease = ( t ) => { return t<0.5 ? 2*t*t : -1+(4-2*t)*t }

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