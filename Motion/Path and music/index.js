import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createPath, drawPath } from '/js/myPaths';
import { createMusic } from '/js/theMusic';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera,container, renderer, scene, path, lines , lines2, axis, tangent, radians, beep, cubes ;
let up = new THREE.Vector3( 0, 1, 0 );
let circumference = 1;
let heightY = 15;

const urlData = require('./music/o.mp3');
//const urlData = require('./music/engine.mp3');

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  beep = createMusic( camera, urlData );
  
  for ( let o = 0; o < 200; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0x000000 );
    circumference = circumference + .12;
    //heightY = heightY - .1;
  }
  console.log( lines );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

  const time = ( 0.0001 * performance.now() ) % 15;

  for (let i = 0; i < 200; i++) {



    

    if( beep.getFrequencyData()[i] >=1 ){

      lines[i].rotation.z = THREE.Math.degToRad( beep.getFrequencyData()[i]  )
      lines[i].position.y = beep.getFrequencyData()[i] * 0.05;
      //lines[i].position.y = beep.getFrequencyData()[i] * 0.09;

    }
    if(( beep.getFrequencyData()[i] == 0)||(i > 127)){

      lines[i].material.color.setHSL( time + i/200 , 0.9, 0.7 );
      lines[i].rotation.y -= 0.005;
    }else{

      lines[i].material.color.setHSL( beep.getFrequencyData()[i]/255 + i/200 , 0.9, 0.5 );
      lines[i].rotation.y -= 0.01;
    }

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

