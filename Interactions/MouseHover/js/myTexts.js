import * as THREE from 'three';
import fontJSON from '../fonts/Montserrat_Regular.typeface.json';

let line = [];
let fullText = [];
let letters;
let allParticles =[];

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
	size: .2,
});
let particles;


function createParticlesText( scene, contentText, Allstar ){

	const loader = new THREE.FontLoader();
	const font = loader.parse( fontJSON );

	contentText = contentText.split('\n');
	var lineText = []
	var points, xMid;

	for( let i = 0; i < contentText.length ; i ++ ){ 

		let shapes = font.generateShapes( contentText[i],3);

		const geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();

		xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
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
			
		for ( let  x = 0; x < shapes.length; x ++ ) {

			let shape = shapes[ x ];
			let points = shape.getSpacedPoints(10);
			let geometry1 = new THREE.Geometry().setFromPoints( points );
			geometry1.translate( xMid, - ((i * 1) * 3.5), 0 );

			var vertices = geometry1.vertices;
			var positions = new Float32Array( vertices.length * 3 );
			var vertex;

			for ( var ix = 0, l = vertices.length; ix < l; ix ++ ) {

				vertex = vertices[ ix ];
				vertex.toArray( positions, ix * 3 );

			}
			var geometryParty = new THREE.BufferGeometry();
			geometryParty.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

			particles = new THREE.Points( geometryParty, PointMaterial );
			lineText.push( particles );
			scene.add( particles );
		}
	}
	return lineText;

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

	return fullText;
}
}



export { createParticlesText };