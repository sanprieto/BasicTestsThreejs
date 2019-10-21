import * as THREE from 'three';

let lineas = [];

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

function drawPath( path, scene, color ) {


  var geometry = new THREE.TubeGeometry( path, 80, 3, 18, false );
  var material = new THREE.MeshPhongMaterial( { side:THREE.DoubleSide  ,color: color } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  lineas.push( mesh )

  /*

  const vertices = path.getSpacedPoints( 100 ) ;
  const lineGeometry = new THREE.Geometry();
  lineGeometry.vertices = vertices;
  const lineMaterial = new THREE.LineBasicMaterial({
    color: color
  });
  const line = new THREE.Line( lineGeometry, lineMaterial)
  scene.add(line);
  lineas.push( line )
  */

  return lineas;
}

export { createPath, drawPath }
