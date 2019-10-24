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

let camera,container, renderer, scene, path, lines , beep, cubes, sphere, amp, particles, mesh ;
let up = new THREE.Vector3( 0, 1, 0 );
let circumference = 1;
let heightY = 1;
let amount = 64;
let noise = new SimplexNoise();
let objects =[];

const urlData = require('./music/o.mp3');

document.getElementById('overlay').addEventListener('click', function() {
  this.style.display = "none";
  beep.sound.play();

});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  particles  = createMeshes( scene );

  beep = createMusic( camera, urlData );

  for ( let o = 0; o < amount ; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0xeef120 );
    circumference = circumference + 4.9;

  }

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  stats.update();

  const average = beep.analyser.getAverageFrequency();
  const frequency = beep.analyser.getFrequencyData();
  const theTime = ( 0.0001 * performance.now() ) % 15;
  
  particles [0].rotation.z = .00005 * performance.now();

  for (let i = 0; i< amount ; i++) {

    lines[i].geometry.vertices.forEach(function( vertex, eo ) {

        if(( eo >= 10 )&&( eo <= 70 )){

          if(( i >= 0 )&&( i <= amount/2 )){

            if( average > 60 ){ 
              amp = frequency[i] * 0.005;
            }else{
              amp = frequency[i] * 0.01;
            }
          }else{
            amp = frequency[i]* 0.035;
            lines[i].material.color.setHSL( 0.83 , 0.8, 0.5 );
          }

        }else{
          amp = 0;
        }

        let time = Date.now();
        vertex.normalize();
        let offset = 10 +(i*0.005);

        let distance = offset + noise.noise3D(
            vertex.x + i + time * 0.0007,
            vertex.y + i + time * 0.0001,
            vertex.z + i + time * 0.0001
        ) * amp;
        vertex.multiplyScalar(distance);
     });

      if( average > 65 ){

        if( i > amount/2 ){
          
          lines[i].rotation.z += frequency[i] * 0.0002;

        }else{

          lines[i].position.z += 0.001;
       
        }

        lines[i].material.color.setHSL( 0.48 , 0.8, 0.5 );
        
      }else if(( average > 30 )&&(( i >= 0)&&( i<= amount/2))){

        lines[i].rotation.z +=  0.009;
        lines[i].material.color.setHSL( 0.18 ,0.7 , 0.5 );

      }
      lines[i].rotation.z +=  0.003;
      
      if( frequency[1]==255){
          lines[i].rotation.z +=  0.02;
      }

      if( lines[0].scale.x <= 0 ){ }else{

       lines[i].scale.x -= frequency[i] * 0.00003;
       lines[i].scale.y -= frequency[i] * 0.00003;
       lines[i].scale.z -= frequency[i] * 0.00003;

      }

      if(( average >105 )&&(( i > amount/2 ))){

        lines[i].scale.setScalar( 1 );
        lines[i].material.color.setHSL( 0.18 ,0.7 , 0.9 );

      }else if( average >105 ){

        lines[i].scale.setScalar( 1 );
        lines[i].material.color.setHSL( 0.18 ,0.7 , 0.5 );
      }

    lines[i].geometry.verticesNeedUpdate = true;
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

