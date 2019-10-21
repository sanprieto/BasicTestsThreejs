import * as THREE from 'three';

function createMaterials() {

  const logoBlue = new THREE.MeshPhongMaterial( {
    color: 0x6699ff,
    side:THREE.DoubleSide

  } );

  logoBlue.color.convertSRGBToLinear();

  return logoBlue;

}

function createGeometries() {

  const box = new THREE.BoxBufferGeometry( );

  return box;
}

function createMeshes( scene ) {

  const materials = createMaterials();
  const geometries = createGeometries();

  const obj = new THREE.Mesh( geometries, materials );
  scene.add( obj );

  return obj;

}

function createGridHelp( scene ){

  const size = 60;
  const divisions = 60;

  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );

}


export { createMeshes , createGridHelp };