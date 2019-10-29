import * as THREE from 'three';


function loadTexture( scene, urlImg ){

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
        // resource URL
        urlImg,
        // onLoad callback
        function ( texture ) {
            // in this example we create the material when the texture is loaded

            texture.encoding = THREE.sRGBEncoding;
            const material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );
            const geometry = new THREE.PlaneGeometry( 40, 40, 32 );
            const plane = new THREE.Mesh( geometry, material );
            const proporcion = texture.image.width / texture.image.height;
            plane.scale.x = 1;
            plane.scale.y = 1/ proporcion ;

            scene.add( plane );

            return plane;
            
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
}


export {  loadTexture };