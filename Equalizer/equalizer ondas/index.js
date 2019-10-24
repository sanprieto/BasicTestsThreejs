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
let heightY = 1;
let amount = 64;
let noise = new SimplexNoise();
let mesh;
let sphere;
let amp;
let particles;
let objects =[];

function createMaterials() {

  const mat = new THREE.MeshPhongMaterial( {
    color: 0x6699FF,
    side:THREE.DoubleSide

  } );

  mat.color.convertSRGBToLinear();

  return mat;

}

function createGeometries() {

  const box = new THREE.BoxBufferGeometry();
  box.translate( 0, 0.5, 0 );

  return box;
}

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
  //createGridHelp( scene )
  //mesh = createMeshes( scene )
  particles  = createMeshes( scene );


  beep = createMusic( camera, urlData );
  console.log( beep );
  for ( let o = 0; o < amount ; o++ ) {

    path = new createPath( circumference ,heightY );
    lines = drawPath( path, scene, 0xeef120 );
    circumference = circumference + .9;

  }
  console.log(lines[0].geometry.vertices)

  for ( var i = 0; i < 32; i ++ ) {

    const materials = createMaterials();
    const geometries = createGeometries();

    let obj = new THREE.Mesh( geometries, materials );
    obj.position.x = i-8;
    obj.position.y = -5;
    //scene.add( obj );
    objects.push(obj)

  }

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();

  const theTime = ( 0.0001 * performance.now() ) % 15;



    particles [0].rotation.z = .00005 * performance.now();



for (let i = 0; i< amount ; i++) {

  lines[i].geometry.vertices.forEach(function(vertex,eo) {

      let offset = 10 +(i*0.005);
      if((eo >= 10)&&(eo<=70)){

        if((i >= 0)&&(i<=30)){
          amp = beep.analyser.getFrequencyData()[i]* 0.01;

        }else{
          amp = beep.analyser.getFrequencyData()[i]* 0.03;
          lines[i].material.color.setHSL( 0.83 , 0.8, 0.5 );
        }
      }else{
        amp = 0;
      }

      let time = Date.now();
      vertex.normalize();

      let distance = offset + noise.noise3D(
          vertex.x  + i + time * 0.0007,
          vertex.y + i + time * 0.0001,
          vertex.z + i + time * 0.0001
      ) * amp;
      vertex.multiplyScalar(distance);
   });
   lines[i].geometry.verticesNeedUpdate = true;
   lines[i].geometry.normalsNeedUpdate = true;
   lines[i].geometry.computeVertexNormals();
   lines[i].geometry.computeFaceNormals();

    if(beep.analyser.getAverageFrequency()>70){

      if((i >= 0)&&(i<=30)){
        
        lines[i].material.color.setHSL( beep.analyser.getFrequencyData()[i]/255 ,0.8 , 0.5 );
        lines[i].rotation.z += beep.analyser.getFrequencyData()[i] * 0.0003 ;

      }else{

        lines[i].material.color.setHSL( 0.48 , 0.8, 0.5 );
        lines[i].rotation.z += beep.analyser.getAverageFrequency() * 0.0001 ;
      }
      
      lines[i].rotation.x +=  beep.analyser.getFrequencyData()[i] * 0.000002;
      
    }else if(beep.analyser.getAverageFrequency()>30){


      lines[i].rotation.z += beep.analyser.getAverageFrequency() * 0.0005 ;

    }else{
      lines[i].rotation.z +=  0.009;
      lines[i].rotation.x -=  beep.analyser.getFrequencyData()[i] * 0.000001;
    }
//lines[i].rotation.z =  0;
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

