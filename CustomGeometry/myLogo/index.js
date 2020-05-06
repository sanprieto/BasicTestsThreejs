import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images';
import { myLogo } from '/js/myLogo';


const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function ( ) {
    init( imgs );
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

  let stats = new Stats();
  document.body.appendChild( stats.dom );

  const container = document.querySelector( '#magic' );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  const camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  // createGridHelp( scene );

  // let cube = createMeshes( scene, imgs[0] );


  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors } );
  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors } );

  var material = new THREE.MeshPhongMaterial( { color: 0x6699FF }  );
  var logo = new THREE.Mesh( myLogo(), material );
  scene.add( logo );
  console.log( logo )

  // createImg( scene,0,-4,-11, imgs[1], .2);

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


