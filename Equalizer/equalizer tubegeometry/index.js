import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createPath, drawPath } from '/js/myPaths';
import { createMusic } from '/js/theMusic';
var SimplexNoise = require('simplex-noise');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera,container, renderer, scene, path, lines , lines2, axis, tangent, radians, beep, cubes ;
let up = new THREE.Vector3( 0, 1, 0 );
let circumference = 1;
let heightY = 20;
let amount = 16;
let noise = new SimplexNoise();

const urlData = require('./music/o.mp3');

document.getElementById('overlay').addEventListener('click', function() {
  this.style.display = "none";
  beep.sound.play();

});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x82C9D9 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene )
  //createMeshes( scene )

  beep = createMusic( camera, urlData );

  for ( let o = 0; o < amount ; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0x000000 );
    circumference = circumference + .8;

  }

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
function update() {
  stats.update();

  const time = ( (0.001 * performance.now())/15 ) % 15;

  for (let i = 0; i < amount ; i++) {

    if( beep.analyser.getFrequencyData()[i] >=1 ){

      //lines[i].rotation.z = THREE.Math.degToRad( beep.analyser.getFrequencyData()[i]  );
      lines[i].position.y = beep.analyser.getFrequencyData()[i] * 0.5;

    }
    if(( beep.analyser.getFrequencyData()[i] == 0)||(i > 127)){

      lines[i].material.color.setHSL( 0.57, 0.4, 0.3 );
      
      lines[i].rotation.y -= 0.005;
    }else{

      lines[i].material.color.setHSL( beep.analyser.getFrequencyData()[i]/255 , 0.3, 0.4 );
      
     
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

