import * as THREE from 'three';
import { Line2 } from './lines/Line2.js';
import { LineMaterial } from './lines/LineMaterial.js';
import { LineGeometry } from './lines/LineGeometry.js';
import { GeometryUtils } from './utils/GeometryUtils.js';

let lineas = [];
let lineFat;
let positions = [];
let colors = [];
let matLine, matLineBasic, matLineDashed;

function createPath( scale, height ) {

  THREE.Curve.call( this );
  this.height = ( height === undefined ) ? 1 : height;
  this.scale = ( scale === undefined ) ? 1 : scale;

}

createPath.prototype = Object.create( THREE.Curve.prototype );
createPath.prototype.constructor = createPath;

createPath.prototype.getPoint = function ( t ) {

  t = t * 2 * Math.PI; // normalized to 0..1
  const a = this.scale / 2;

  const x = a *  Math.cos( t );
  const y = ( Math.sin( t *2) % this.height ) / this.height ;
  //const y = this.height;
  const z = a * Math.sin( t );

  return new THREE.Vector3( x, y, z ).multiplyScalar( this.scale );

};

function drawPath( path, scene, colores ) {

  let spline = path;
  let color = new THREE.Color();

  for ( let i = 0, l = 700; i < l; i ++ ) {

    let point = spline.getPoint( i / l );
    positions.push( point.x, point.y, point.z );

    color.setHSL( i / l, 1.0, 0.5 );
    colors.push( color.r, color.g, color.b );

  }

  let geometry = new LineGeometry();
  geometry.setPositions( positions );
  geometry.setColors( colors );
  matLine = new LineMaterial( {
    color: 0xffffff,
    linewidth: 0.5, // in pixels
    vertexColors: THREE.VertexColors,
    //resolution:  // to be set by renderer, eventually
    dashed: false
  } );
  lineFat = new Line2( geometry, matLine );
  lineFat.computeLineDistances();
  lineFat.scale.set( 1, 1, 1 );
  scene.add( lineFat);

  return lineas;
}

export { createPath, drawPath }
