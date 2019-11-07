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

const urlData = require('/img/girl.png');
const urlData2 = require('/img/brujula.jpg');
const urlData3 = require('/img/hair.svg');
let imgOne, imgTwo, plane;

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, myGroup;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );
  scene.add( myGroup );
  console.log(myGroup.position)
  myGroup.position.set( -69, 78, -10.6)

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  plane = createGridHelp( scene );

  createImg( scene,.3,-8,-11, imgOne, .2);

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

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

    for ( var i = 0; i < paths.length; i ++ ) {

      var path = paths[ i ];

      var material = new THREE.MeshBasicMaterial( {
        color: path.color.convertSRGBToLinear(),
        opacity: 1,
        transparent: true ,
        side: THREE.DoubleSide,
        depthWrite: false
      } );

      var shapes = path.toShapes( true );

      for ( var j = 0; j < shapes.length; j ++ ) {

        var shape = shapes[ j ];
        var geometry = new THREE.ShapeBufferGeometry( shape );
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

