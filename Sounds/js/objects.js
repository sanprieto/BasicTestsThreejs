import * as THREE from 'three';

let objects = [];

function createMaterials() {

  const mat = new THREE.MeshPhongMaterial( {
    color: 0x6699FF,
    side:THREE.DoubleSide

  } );

  mat.color.convertSRGBToLinear();

  return mat;

}

function createGeometries() {

  const box = new THREE.BoxBufferGeometry();
  box.translate( 0, 0.5, 0 );

  return box;
}

function createMeshes( scene ) {

  for ( var i = 0; i < 16; i ++ ) {

    const materials = createMaterials();
    const geometries = createGeometries();

    let obj = new THREE.Mesh( geometries, materials );
    obj.position.x = i-8;
    obj.position.y = -5;
    scene.add( obj );
    objects.push(obj)

  }

  return objects;

}

export { createMeshes };