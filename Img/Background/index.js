import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { loadTexture } from '/js/images.js';
import Stats from 'stats.js';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, bgTexture, imgOne;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  
  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  const loader = new THREE.TextureLoader();
  bgTexture = loader.load( urlData );
  bgTexture.encoding = THREE.sRGBEncoding
  scene.background = bgTexture;

  imgOne = loadTexture( scene, urlData2 );

  //cube = createMeshes( scene );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update( bgTexture );
    render();

  } );

}

function update( bgTexture ) {
  stats.update();

  const canvasAspect = container.clientWidth / container.clientHeight;
  const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
  const aspect = imageAspect / canvasAspect;
    
  bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
  bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
    
  bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
  bgTexture.repeat.y = aspect > 1 ? 1 : aspect;

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

