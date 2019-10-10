import * as THREE from 'three';

function createMaterials() {

  const logoBlue = new THREE.MeshPhongMaterial( {
    color: 0xce17da,
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

export { createMeshes };