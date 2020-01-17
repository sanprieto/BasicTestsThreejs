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
let startTime = 0;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  //cube = createMeshes( scene );

  texts = createParticlesText ( scene, 'l');
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

      mixer.push( intersects[0] );
      startTime = performance.now();

      INTERSECTED = intersects[ 0 ].index;
    }

  } else if ( INTERSECTED !== null ) {

    //console.log('pos no');
    INTERSECTED = null;
  }

  for ( let  x = 0; x < mixer.length; x ++ ) {
    updateInterpolation( mixer[x], startTime );
  }
}



const updateInterpolation = ( element, startTime ) => { //Time es la clave es lo que tengo que pasar 
  
    console.log( startTime )
    const time = ( .001 * (performance.now()-startTime));
    console.log( 'time', time, startTime );

    const theX = interpolation ( element.point.x , element.point.x + 1 , time );
    const theY = interpolation ( element.point.y, element.point.y + 1 ,  time );
    const theZ = interpolation ( element.point.z, element.point.z + 1 ,  time );

    const pos = element.object.geometry.attributes.position;
    var vec3 = new THREE.Vector3();

    vec3.x = theX ;
    vec3.y = theY;
    vec3.z = theZ;
    pos.setXYZ( element.index, vec3.x, vec3.y, vec3.z );

    pos.needsUpdate = true;
/*
  time += step;

  if (time <= 0 || time >=1){
    cont++;
    step = -step 

    
    if(cont == 2){

      for ( let  x = 0; x < mixer.length; x ++ ) {

        console.log( 'x', x, element.obj, element.index  )
        if( mixer[x].obj == element.obj){

          mixer.splice(x,1);
          console.log( mixer )
        }

      }
        
    }
  }*/

  ///fin del for mixer
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