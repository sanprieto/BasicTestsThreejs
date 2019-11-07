import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
import { SVGLoader } from '/js/SVGLoader';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { waves, wavesBuffer } from '/js/waves';

const urlData = require('/img/girl.png');
const urlData2 = require('/img/brujula.jpg');
const urlData3 = require('/img/hair.svg');
let imgOne, imgTwo, plane;
let objects =[];

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, myGroup, girl;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );
  scene.add( myGroup );
  console.log(myGroup)
  myGroup.position.set( -69, 78, -10)

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  plane = createGridHelp( scene );
  girl = createImg( scene,.99,-7.6,-11, imgOne, .2);
  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();
  waves( myGroup, 2,4);
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

var manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};
manager.onLoad = function ( ) {
  init();
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

  console.log( 'There was an error loading ' + url );

};

let loader = new THREE.TextureLoader(manager);
loader.load( urlData, function ( texture ) {
    texture.encoding = THREE.sRGBEncoding;
    imgOne = texture;

} );

var loader3 = new THREE.SVGLoader( manager );

loader3.load( urlData3, function ( data ) {

    var paths = data.paths;

    var group = new THREE.Group();
    group.scale.multiplyScalar( 0.25 );
    group.position.x = - 70;
    group.position.y = 70;
    group.scale.y *= - 1;

    const color = new THREE.Color( 0x19e8e8 );
    color.convertSRGBToLinear();

    for ( var i = 0; i < paths.length; i ++ ) {

      var path = paths[ i ];

      var material = new THREE.MeshPhongMaterial( {
        color: color,
        side: THREE.DoubleSide,
        depthWrite: true,
        //wireframe: true
      } );

      var shapes = path.toShapes( true );

      for ( var j = 0; j < shapes.length; j ++ ) {

        var shape = shapes[ j ];
        //var geometry = new THREE.ShapeBufferGeometry( shape );
        var geometry = new THREE.ShapeGeometry( shape );
        //geometry.applyMatrix(new THREE.Matrix4().makeScale ( 1, -1, 1 ))
        var mesh = new THREE.Mesh( geometry, material );

        group.add( mesh );

      }

    }
    myGroup = group;
    //scene.add( group );

  },
  // called when loading is in progresses
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
);

