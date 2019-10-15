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

  const box = new THREE.SphereGeometry(.2);

  return box;
}

function createMeshes( scene ) {

  for ( var o = 0; o < 1; o++ ) {

      const materials = createMaterials();
      const geometries = createGeometries();

      let obj = new THREE.Mesh( geometries, materials );
      obj.rotation.y = Math.random()
      scene.add( obj );
      objects.push(obj)
    }

  return objects;

}

function createGridHelp( scene ){

  const size = 60;
  const divisions = 60;

  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );

}

export { createMeshes, createGridHelp };