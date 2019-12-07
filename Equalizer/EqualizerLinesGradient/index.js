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
//document.body.appendChild( stats.dom );

let camera,container, renderer, scene, path, lines , lines2, axis, tangent, radians, beep, cubes ;
let up = new THREE.Vector3( 0, 1, 0 );
let circumference = 1;
let heightY = 15;
let amount = 512;

const urlData = require('./music/o.mp3');
//const urlData = require('./music/engine.mp3');

document.getElementById('thePlay').addEventListener('click', function() {

  document.getElementById('overlay').style.display = "none";
  //beep.sound.play();
  beep.sound.setVolume( 0.3 );


});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  beep = createMusic( camera, urlData );
  
  for ( let o = 0; o < amount ; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0x000000 );
    //circumference = circumference + .08;
    circumference = circumference + .005;

  }

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

  const time = ( 0.0001 * performance.now() ) % 15;

  for (let i = 0; i < amount ; i++) {

    if( beep.analyser.getFrequencyData()[i] >=1 ){

      lines[i].rotation.z = THREE.Math.degToRad( beep.analyser.getFrequencyData()[i]  )
      lines[i].rotation.x = THREE.Math.degToRad( beep.analyser.getFrequencyData()[i]  )
      lines[i].position.y = beep.analyser.getFrequencyData()[i] * 0.01;

    }
    if(( beep.analyser.getFrequencyData()[i] == 0)||(i > 512 )){

      lines[i].material.color.setHSL( time + i/200 , 1, 0.5 );
      lines[i].rotation.y -= 0.005;
    }else{

      lines[i].material.color.setHSL( beep.analyser.getFrequencyData()[i]/255 , 1, 0.4 );
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

