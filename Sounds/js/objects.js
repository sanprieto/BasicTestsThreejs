import * as THREE from 'three';

function createMaterials() {

  const colorMat = new THREE.MeshPhongMaterial( {
    color: '#FFB5D9',
    side:THREE.DoubleSide
    //flatShading: true,
  } );

  colorMat.color.convertSRGBToLinear();

  return colorMat;

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