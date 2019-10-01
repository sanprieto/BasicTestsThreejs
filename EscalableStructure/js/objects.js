import * as THREE from 'three';

function createMaterials() {

  const logoBlue = new THREE.MeshPhongMaterial( {
    color: 0xce17da,
    side:THREE.DoubleSide
    //flatShading: true,
  } );

  logoBlue.color.convertSRGBToLinear();

  return logoBlue;

}

function createGeometries() {

  const box = new THREE.BoxBufferGeometry( 2, 2.25, 1.5 );

  return box;
}

function createMeshes( obj, scene ) {

  const materials = createMaterials();
  const geometries = createGeometries();

  obj = new THREE.Mesh( geometries, materials );
  scene.add( obj );

  return obj;

}

export { createMeshes };