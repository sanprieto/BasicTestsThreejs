import * as THREE from 'three';

function createImg( scene, x, y, z, texture, scale  ){

    console.log( texture );
    x = typeof x  === 'undefined' ? 0 : x;
    y = typeof y  === 'undefined' ? 0 : y;
    z = typeof z  === 'undefined' ? 0 : z;

    scale = typeof scale === 'undefined' ? 1 : scale;

    const geometry = new THREE.PlaneBufferGeometry( 40, 40, 180, 180 );
    const material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    const proporcion = texture.image.width /  texture.image.height;
    plane.scale.x = scale;
    plane.scale.y = scale/ proporcion ;

    plane.position.set( x,y,z);
    scene.add(plane);

    return plane;
}


export {  createImg };