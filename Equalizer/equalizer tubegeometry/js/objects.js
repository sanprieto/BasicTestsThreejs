import * as THREE from 'three';

let objects = [];

function createMaterials() {

  const mat = new THREE.MeshPhongMaterial( {
    color: 0x6699ff,
    side:THREE.DoubleSide

  } );

  mat.color.convertSRGBToLinear();

  return mat;

}

function createGeometries() {

  const box = new THREE.BoxGeometry(10,10,10);

  return box;
}

function createMeshes( scene ) {

  for ( var o = 0; o < 10; o++ ) {

      const materials = createMaterials();
      const geometries = createGeometries();

      let obj = new THREE.Mesh( geometries, materials );
      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.position.x -= o +10
      scene.add( obj );
      objects.push(obj)
    }

  return objects;

}

function createGridHelp( scene ){

  const size = 60;
  const divisions = 60;

  const gridHelper = new THREE.GridHelper( size, divisions );
  //scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 10 );
  //scene.add( axesHelper );

  var geometry = new THREE.PlaneGeometry( 860, 860, 32 );
  var material = new THREE.MeshPhongMaterial( {color: 0x6699FF, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = THREE.Math.degToRad(90);
  plane.position.y = -4;
  plane.receiveShadow = true;

  scene.add( plane )


}

export { createMeshes, createGridHelp };