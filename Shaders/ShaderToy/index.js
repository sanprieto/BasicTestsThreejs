import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, uniforms, materialX, fragmentShader;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene );


  var geometry = new THREE.BoxGeometry( 3,3,3);

  fragmentShader = `
    #include <common>

    uniform vec3 iResolution;
    uniform float iTime;

    // By iq: https://www.shadertoy.com/user/iq  
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;

        // Time varying pixel color
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

        // Output to screen
        fragColor = vec4(col,1.0);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;
     uniforms = {
      iTime: { value: 0 },
      iResolution:  { value: new THREE.Vector3() },
    };
    materialX = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });

  cube = new THREE.Mesh( geometry, materialX );
  scene.add( cube );

  cube.position.y = 2;


  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  const time = 0.001 * performance.now();
  stats.update();
	cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
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

