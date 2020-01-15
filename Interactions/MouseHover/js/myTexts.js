import * as THREE from 'three';
import fontJSON from '../fonts/Montserrat_Regular.typeface.json';

let line = [];
let fullText = [];
let letters;

let material = new THREE.MeshPhongMaterial( { color: 0x6699ff, wireframe: true } ); 
let letterSetting = {
	
    curveSegments: 12,
    steps: 10,
    depth: .1,
    bevelEnabled: false,
    bevelThickness: .03,
    bevelSize: .05,
    bevelSegments: 6
};
let PointMaterial = new THREE.PointsMaterial({
	color: 0x888888,
	size: .1
});


function createParticlesText( scene, contentText ){

	const loader = new THREE.FontLoader();
	const font = loader.parse( fontJSON );

	contentText = contentText.split('\n');
	console.log(contentText)

	for( var i = 0; i < contentText.length ; i ++ ){ 

		let shapes = font.generateShapes( contentText[i], 1 );

		const geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();

		let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		geometry.translate( xMid, 0, 0 );
		
		let holeShapes = [];

		for ( let q = 0; q < shapes.length; q ++ ) {

			let shape = shapes[ q ];

			if ( shape.holes && shape.holes.length > 0 ) {

				for ( let  j = 0; j < shape.holes.length; j ++ ) {

					let  hole = shape.holes[ j ];
					holeShapes.push( hole );

				}

			}

		}

		shapes.push.apply( shapes, holeShapes );
		
		var  lineText = new THREE.Object3D();

		for ( let  x = 0; x < shapes.length; x ++ ) {

			let shape = shapes[ x ];
			let points = shape.getSpacedPoints(1000);
			let geometry = new THREE.BufferGeometry().setFromPoints( points );

			geometry.translate( xMid, - ((i * 1) * 1.5), 0 );

			var starField = new THREE.Points( geometry, PointMaterial );
			lineText.add( starField );

		}
		scene.add( starField );
		console.log( starField );
		scene.add( lineText );
	}


}

function createLineText( scene, contentText ){

	const loader = new THREE.FontLoader();
	const font = loader.parse( fontJSON );

	contentText = contentText.split('\n');
	console.log(contentText)

	for( var i = 0; i < contentText.length ; i ++ ){ 

		let shapes = font.generateShapes( contentText[i], 1 );

		const geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();

		let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		geometry.translate( xMid, 0, 0 );
		
		let holeShapes = [];

		for ( let q = 0; q < shapes.length; q ++ ) {

			let shape = shapes[ q ];

			if ( shape.holes && shape.holes.length > 0 ) {

				for ( let  j = 0; j < shape.holes.length; j ++ ) {

					let  hole = shape.holes[ j ];
					holeShapes.push( hole );

				}

			}

		}

		shapes.push.apply( shapes, holeShapes );
		
		var  lineText = new THREE.Object3D();

		for ( let  x = 0; x < shapes.length; x ++ ) {

			let shape = shapes[ x ];

			let points = shape.getPoints();
			let geometry = new THREE.BufferGeometry().setFromPoints( points );

			geometry.translate( xMid, - ((i * 1) * 1.5), 0 );

			let lineMesh = new THREE.Line( geometry, matDark );
			lineText.add( lineMesh );

		}

		scene.add( lineText );
	}

	createParticles( lineText , scene );
	return fullText;
}

function createTextByLines( scene, contentText ){

	const loader = new THREE.FontLoader();
	const font = loader.parse( fontJSON );

	contentText = contentText.split('\n');

	for( var i = 0; i < contentText.length ; i ++ ){ 

		let geometry = new THREE.TextGeometry( contentText[i] , {
		  font: font,
		  size: 1,
		  height: .1,
		  curveSegments: 12,
		  steps:1,
		  bevelEnabled: false,
		  bevelThickness: 10,
		  bevelSize: 8,
		  bevelOffset: 0,
		  bevelSegments: 5
		} );

		geometry.center();
		
		line[i] = new THREE.Mesh( geometry, material.clone() );
		line[i].position.y -= i  * 1.7;
		scene.add( line[i] );
	}	
	return line;
}

function createTextByLetters( scene, contentText ){ 

	const loader = new THREE.FontLoader();
	const font = loader.parse( fontJSON );

	contentText = contentText.split('\n');

	for( var i = 0; i < contentText.length ; i ++ ){ 

		let shapes = font.generateShapes( contentText[i], 1 );

		const geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();

		let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		console.log( xMid )

		for ( var u = 0; u < shapes.length; u ++ ) {

		    const shape = shapes[ u ];
		    const geometrus = new THREE.ExtrudeGeometry( shape, letterSetting );
		    geometrus.translate( xMid, - ((i * 1) * 1.5) , 0 );
		    letters = new THREE.Mesh( geometrus, material.clone() );
		    
		    let centrer = new THREE.Vector3();
		    letters.geometry.computeBoundingBox();
		    letters.geometry.boundingBox.getCenter( centrer );
		    letters.geometry.center();
		    letters.position.copy(centrer);
			
		    scene.add( letters );
		    fullText.push( letters );
		}
	}
	createParticles( fullText, scene );
	return fullText;
}



export { createParticlesText };