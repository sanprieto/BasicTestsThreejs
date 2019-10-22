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
let circumference = 11;
let heightY = 20;
let amount = 0;
let noise = new SimplexNoise();
let mesh;
let sphere;

const urlData = require('./music/o.mp3');

document.getElementById('overlay').addEventListener('click', function() {
  this.style.display = "none";
  beep.sound.play();

});

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene )
  mesh = createMeshes( scene )
  mesh.position.set(0,0,0);

  beep = createMusic( camera, urlData );
  console.log( beep );
  for ( let o = 0; o < amount ; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0x6699FF );
    circumference = circumference + .9;

  }
  var geometry = new THREE.SphereGeometry( 57, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xfbff00} );
  sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  console.log( mesh.position, sphere.position );


  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

const time = ( 0.001 * performance.now()%10) / 10;

  mesh.geometry.vertices.forEach(function(vertex, i) {

      let offset = mesh.geometry.parameters.radius;
      let amp = beep.analyser.getAverageFrequency()*0.1;
      let time = Date.now();
      vertex.normalize();
      let distance = offset + noise.noise3D(
          vertex.x + time * 0.0007,
          vertex.y + time * 0.0008,
          vertex.z + time * 0.0009
      ) * amp;
      vertex.multiplyScalar(distance);
   })
   

  
          mesh.rotation.y += beep.analyser.getFrequencyData()[6] * 0.0005 ;

          if((time>0.46) && (time<0.8)){

            mesh.material.color.setHSL( time , 0.9, 0.5 );

          }else{
           
            mesh.material.color.setHSL(  0.8 , 0.9, 0.5 );
          }
          if(beep.analyser.getFrequencyData()[12]<10){
            sphere.scale.setScalar( 1 );
           
          }else{

     
            sphere.scale.setScalar( beep.analyser.getFrequencyData()[12]*0.009 );
              //sphere.material.color.setHSL(  0.16 , 0.9, 0.5 );
          }
          
          

          


  for (let i = 0; i < 16 ; i++) {
    //console.log(beep.analyser.getFrequencyData()[i]/255);
//mesh.material.color.setHSL( beep.analyser.getFrequencyData()[i]/255, 0.8, 0.5 );

    //lines[i].rotation.z = THREE.Math.degToRad( beep.analyser.getFrequencyData()[i]) ;


      //lines[i].rotation.z = THREE.Math.degToRad( beep.analyser.getFrequencyData()[i] );

      //lines[i].position.y = beep.analyser.getFrequencyData()[i]*0.1;
      //lines[i].scale.set(beep.analyser.getFrequencyData()[i]/255,beep.analyser.getFrequencyData()[i]/255,beep.analyser.getFrequencyData()[i]/255);




      //lines[i].material.color.setHSL( time, 0.8, 0.5 );
      



  }
  

            mesh.geometry.verticesNeedUpdate = true;
          mesh.geometry.normalsNeedUpdate = true;
          mesh.geometry.computeVertexNormals();
          mesh.geometry.computeFaceNormals();


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

