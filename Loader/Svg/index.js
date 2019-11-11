import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
import { SVGLoader } from '/js/SVGLoader';
import Stats from 'stats.js';

const urlData = require('/img/starts.jpg');
const urlData2 = require('/img/brujula.jpg');
//const urlData3 = require('/img/hair.svg');
//const urlData3 = require('/img/tiger.svg');
const urlData3 = require('/img/test.svg');
let imgOne, imgTwo, plane;

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, myGroup;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x6699FF );
  scene.add( myGroup );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  plane = createGridHelp( scene );

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
loader.load( urlData2, function ( texture ) {

    imgOne = new THREE.MeshBasicMaterial( {
      map: texture
     } );

} );

let loader2 = new THREE.TextureLoader(manager);
loader2.load( urlData, function ( texture2 ) {

    imgTwo = new THREE.MeshBasicMaterial( {
      map: texture2
     } );

} );


var loader3 = new SVGLoader( manager );

loader3.load( urlData3, function ( data ) {

    var paths = data.paths;
          var group = new THREE.Group();
          group.scale.multiplyScalar( 0.25 );
          group.position.x = - 70;
          group.position.y = 70;
          group.scale.y *= - 1;
          for ( var i = 0; i < paths.length; i ++ ) {
            var path = paths[ i ];
            
            var fillColor = path.userData.style.fill;
      
              var material = new THREE.MeshBasicMaterial( {
                color: new THREE.Color().setStyle( fillColor ).convertSRGBToLinear(),
                opacity: path.userData.style.fillOpacity,
                transparent: path.userData.style.fillOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: false
              } );
              var shapes = path.toShapes( true );
              for ( var j = 0; j < shapes.length; j ++ ) {
                var shape = shapes[ j ];
                var geometry = new THREE.ShapeBufferGeometry( shape );
                var mesh = new THREE.Mesh( geometry, material );
                group.add( mesh );
              }
      
            var strokeColor = path.userData.style.stroke;

              var material = new THREE.MeshBasicMaterial( {
                color: new THREE.Color().setStyle( strokeColor ).convertSRGBToLinear(),
                opacity: path.userData.style.strokeOpacity,
                transparent: path.userData.style.strokeOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: false
              } );
              for ( var j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
                var subPath = path.subPaths[ j ];
                var geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
                if ( geometry ) {
                  var mesh = new THREE.Mesh( geometry, material );
                  group.add( mesh );
                }
              }
            
          }
          myGroup = group;
        } );



