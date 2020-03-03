import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import Stats from 'stats.js';

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

// const urlData = require('/img/starts.jpg');
// const urlData2 = require('/img/brujula.jpg');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, renderer, scene, cube, imgOne, imgTwo, rtScene, rtCamera ;

const preload = () => {

  init()

  // let manager = new THREE.LoadingManager();
  // manager.onLoad = function ( ) {
  //   init();
  // };

  // // let loader = new THREE.TextureLoader(manager);
  // // loader.load( urlData, function ( texture ) {
  // //     texture.encoding = THREE.sRGBEncoding;
  // //     imgOne = new THREE.MeshBasicMaterial( {
  // //       map: texture
  // //      } );

  // // } );
  // // let loader2 = new THREE.TextureLoader( manager);
  // // loader2.load( urlData2, function ( texture2 ) {
  // //     texture2.encoding = THREE.sRGBEncoding
  // //     imgTwo = texture2;

  // // } );

}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  preload();

} else {
  document.addEventListener("DOMContentLoaded", preload); 

}

function init() {

  const container = document.querySelector( '#magic' );
  renderer = createRenderer( container );

  // render target

  const rtWidth = 512;
  const rtHeight = 512;

  const renderTarget = new THREE.WebGLRenderTarget( rtWidth, rtHeight, { 

    // minFilter: THREE.LinearFilter,
    // magFilter: THREE.LinearFilter,
    // format: THREE.RGBAFormat,
    // stencilBuffer: true 

  });

  const rtAspect = rtWidth / rtHeight;

  rtCamera = new THREE.PerspectiveCamera( 65, rtAspect, 0.1, 100);
  rtCamera.position.z = 5;

  rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color('red');

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  cube = new THREE.Mesh( geometry, material );
  rtScene.add( cube );

  //normal renderer ----> ----->

  scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  //createLights( scene );
  // createGridHelp( scene );

  const geometry1 = new THREE.PlaneGeometry( 25, 25 );
  const material1 = new THREE.MeshBasicMaterial( { 
    map: renderTarget.texture, 
    transparent: true, 
    alphaTest: .9
  } );

  const plane = new THREE.Mesh( geometry1, material1 );
  scene.add( plane );

  const geometry2 = new THREE.TorusGeometry( 5, 3, 16, 100 );
  const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const torus = new THREE.Mesh( geometry2, material2 );
  torus.position.z = -4
  scene.add( torus );

  //renderer.setAnimationLoop( () => {

  function animate(){

    requestAnimationFrame( animate );

    update();
  };

  function update() {

    stats.update();

    // torus.rotation.x += 0.02

    renderer.setRenderTarget( renderTarget );
    renderer.clear();
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.position.x += 0.005;

    renderer.render( scene, camera );

  }

  animate();
  


  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }
  window.addEventListener( 'resize', onWindowResize );
  document.addEventListener("click", function() {
    
    renderer.autoClearColor = false;
    //renderer.autoClearDepth = false;
  });

}

