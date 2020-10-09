import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';

const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function ( ) {

    var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {

      init( imgs );

    }, false );
    
  };
  let imgs = [];
  const loader = new THREE.TextureLoader(manager).load( require('/img/starts.jpg'), function ( texture ) {
      texture.encoding = THREE.sRGBEncoding;
      imgs[0] = texture;

  } );
  let imgTwo
  const loader2 = new THREE.TextureLoader( manager);
  loader2.load( require('/img/brujula.jpg'), function ( texture2 ) {
      texture2.encoding = THREE.sRGBEncoding
      imgs[1] = texture2;

  } );
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  preload();

} else {
  document.addEventListener("DOMContentLoaded", preload); 

}

function init( imgs ) {
  var sample;
  var overlay = document.getElementById( 'overlay' );
  overlay.remove();

  let stats = new Stats();
  document.body.appendChild( stats.dom );

  const container = document.querySelector( '#magic' );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  const camera = createCamera( container );
  createOrbitControls( camera, container );

  var context = new AudioContext();

  // feed video into a MediaElementSourceNode, and feed that into AnalyserNode
  // due to a bug in Chrome, this must run after onload
  var videoElement = document.querySelector('video');
  var mediaSourceNode = context.createMediaElementSource(videoElement);
  var analyserNode = context.createAnalyser();
  analyserNode.fftSize = 256;
  console.log( analyserNode )
  mediaSourceNode.connect(analyserNode);
  analyserNode.connect(context.destination);


  // createLights( scene );

  const geometry = new THREE.PlaneGeometry( );
  let video = document.getElementById( 'video' );

  const sizes = new THREE.Vector2();
  const { width, height } = video.getBoundingClientRect();
  sizes.set( width, height );
  video.play();
  // video.pause();

  video.addEventListener('play', function() {

    this.currentTime = 3;
    video.volume = 0.3;

  }, false);

  var texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;

  const material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: THREE.DoubleSide } );
  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

  plane.scale.set( 450, 253 , 1)
  plane.position.y = 200

  createImg( scene,0,-200,-1, imgs[1], .2);

  const renderer = createRenderer( container );
  window.addEventListener( 'resize', onWindowResize );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  function update() {
    stats.update();

    sample = new Float32Array( analyserNode.frequencyBinCount );

    analyserNode.getFloatFrequencyData( sample )


    // const result = getAverageFrequency ( sample )

    // console.log( result )

    // plane.position.z = result;
    // console.log( sample, plane.position.z)
    // console.log( sample )

  }

  function render() {

    renderer.render( scene, camera );

  }

  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }

  function getAverageFrequency ( data ){

    var value = 0;

    for ( var i = 0; i < data.length; i ++ ) {

      value += data[ i ];

    }

    return value / data.length;

  }
}


