import * as THREE from 'three';

function createImg( scene, x, y, z, texture, scale, sizeX, sizeY, alpha ){

    x = typeof x  === 'undefined' ? 0 : x;
    y = typeof y  === 'undefined' ? 0 : y;
    z = typeof z  === 'undefined' ? 0 : z;
    scale = typeof scale === 'undefined' ? 1 : scale;
    sizeX = typeof sizeX === 'undefined' ? 40 : sizeX;
    sizeY = typeof sizeY === 'undefined' ? 40 : sizeY;
    alpha = typeof alpha === 'undefined' ? 0 : alpha;

    const geometry = new THREE.PlaneBufferGeometry( sizeX, sizeY, sizeX, sizeY );
    const material = new THREE.MeshPhongMaterial( { 
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: alpha 
    } );
    const plane = new THREE.Mesh( geometry, material );
    const proporcion = texture.image.width /  texture.image.height;
    plane.scale.x = scale;
    plane.scale.y = scale/ proporcion ;

    plane.position.set( x,y,z);
    scene.add(plane);

    return plane;
}


export {  createImg };