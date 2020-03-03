import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

const urlData = require('./textures/bayer.png');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, plane, uniforms, materialX, fragmentShader, vertexShader;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  //createLights( scene );
  //createGridHelp( scene );

  var geometry = new THREE.PlaneGeometry( 30,20,1,1);

  fragmentShader = `
  #include <common>

    uniform vec3 iResolution;
    uniform float iTime;

    //********                ***********

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 p=(2.0*fragCoord.xy-iResolution.xy)/max(iResolution.x,iResolution.y);
      for(int i=1;i<10;i++)
      {
        vec2 newp=p;
        newp.x+=0.3/float(i)*sin(float(i)*p.y+iTime+0.3*float(i))+1.0;
        newp.y+=0.3/float(i)*sin(float(i)*p.x+iTime+0.3*float(i+10))-1.4;
        p=newp;
      }
      vec3 col=vec3(0.2,0.6-(sin(p.y)),sin(p.x+p.y));
      fragColor=vec4(col, 0.5);
    }

        //*********                **********

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;
    uniforms = {
      iTime: { value: 0 },
      iResolution:  { value: new THREE.Vector3(1, 1, 1) },

    };
    materialX = new THREE.ShaderMaterial({

      fragmentShader,
      uniforms,
    });

  plane = new THREE.Mesh( geometry, materialX );
  scene.add( plane );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  const time = 0.001 * performance.now();
  stats.update();
  uniforms.iResolution.value.set( container.clientWidth, container.clientHeight, 1);
  uniforms.iTime.value = time;

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

