import * as THREE from 'three';

let objects = [];

function createMaterials() {

 const starsMaterial = new THREE.PointsMaterial( { color: 0xFFFFFF , size: .03, transparent: true, alphaTest: .5 } );
 return starsMaterial;

}

function createGeometries() {

  const starsGeometry = new THREE.BufferGeometry();
  var positions = [];

  for ( let i = 0; i < 5500; i ++ ) {

    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 120 );
    star.y = THREE.Math.randFloatSpread( 120 );
    star.z = THREE.Math.randFloatSpread( 120 );

    positions.push( star.x, star.y, star.z );

  }
  starsGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );


  return starsGeometry;

}

function createMeshes( scene ) {


   for (let i = 0; i < 1; i++) {

    const materials = createMaterials();
    const geometries = createGeometries();

    const obj = new THREE.Points( geometries, materials );
    scene.add( obj );
    objects.push(obj)

   }


  return objects;

}

export { createMeshes };