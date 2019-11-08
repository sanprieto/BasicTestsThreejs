import * as THREE from 'three';
import { SVGLoader } from '/js/SVGLoader';

function myLoaderSVG( manager, urlData ){

	console.log( 'manager ', manager, 'urlData', urlData )

	let loader = new THREE.SVGLoader( manager );

	loader.load( urlData, function ( data ) {

	    var paths = data.paths;

	    var group = new THREE.Group();
	    group.scale.multiplyScalar( 0.25 );
	    group.position.x = - 70;
	    group.position.y = 70;
	    group.scale.y *= - 1;

	    const color = new THREE.Color( 0x19e8e8 );
	    color.convertSRGBToLinear();

	    for ( var i = 0; i < paths.length; i ++ ) {

	      var path = paths[ i ];

	      var material = new THREE.MeshPhongMaterial( {
	        color: color,
	        side: THREE.DoubleSide,
	        depthWrite: true,
	        //transparent: true
	        //wireframe: true
	      } );

	      var shapes = path.toShapes( true );

	      for ( var j = 0; j < shapes.length; j ++ ) {

	        var shape = shapes[ j ];
	        var geometry = new THREE.ShapeBufferGeometry( shape );
	        //var geometry = new THREE.ShapeGeometry( shape );
	        //geometry.applyMatrix(new THREE.Matrix4().makeScale ( 1, -1, 1 ))
	        var mesh = new THREE.Mesh( geometry, material );

	        group.add( mesh );

	      }

	    }
	    return group;
	    //scene.add( group );

	  },
	  // called when loading is in progresses
	  function ( xhr ) {

	    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	  },
	  // called when loading has errors
	  function ( error ) {

	    console.log( 'An error happened' );

	  }
	);

}

export { myLoaderSVG }
