import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';


const preload = () => {

      var startButton = document.getElementById( 'startButton' );
      startButton.addEventListener( 'click', function () {

        init( );

      }, false );

}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  preload();

} else {
  document.addEventListener("DOMContentLoaded", preload); 

}

function init( ) {

  var overlay = document.getElementById( 'overlay' );
  overlay.remove();

  let stats = new Stats();
  document.body.appendChild( stats.dom );

  const container = document.querySelector( '#magic' );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  const camera = createCamera( container );
  createOrbitControls( camera, container );
  // createLights( scene );



  const geometry = new THREE.PlaneGeometry( );
  let video = document.getElementById( 'video' );

  const sizes = new THREE.Vector2();
  const { width, height } = video.getBoundingClientRect();
  sizes.set( width, height );
  video.play();
  console.log( video )
  video.addEventListener('play', function() {
            this.currentTime = 3;
  }, false);

  var texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  const material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: THREE.DoubleSide } );
  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

  plane.scale.set( sizes.x, sizes.y , 1)

  console.log( plane )



  const renderer = createRenderer( container );
  window.addEventListener( 'resize', onWindowResize );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  function update() {
    stats.update();

  }

  function render() {

    renderer.render( scene, camera );

  }

  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }
}


