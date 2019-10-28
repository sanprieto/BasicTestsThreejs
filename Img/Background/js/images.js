import * as THREE from 'three';


function loadTexture( scene, urlImg, type ){

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
        // resource URL
        urlImg,
        // onLoad callback
        function ( texture ) {
            // in this example we create the material when the texture is loaded

            if(type == 0){

            	texture.encoding = THREE.sRGBEncoding;
            	scene.background = texture;
            	console.log( 'load', texture.image.width);

            	return texture;
            }
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