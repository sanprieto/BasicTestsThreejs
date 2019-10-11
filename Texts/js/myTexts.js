import * as THREE from 'three';
import fontJSON from '../fonts/Montserrat_Regular.typeface.json';

let line = [];
let letters;
let fullText = [];
let material = new THREE.MeshPhongMaterial( {color: 0x6699ff} ); 
let letterSetting = {
	
    curveSegments: 12,
    steps: 10,
    depth: .1,
    bevelEnabled: false,
    bevelThickness: .03,
    bevelSize: .05,
    bevelSegments: 6
};

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
		  bevelEnabled: false,
		  bevelThickness: 10,
		  bevelSize: 8,
		  bevelOffset: 0,
		  bevelSegments: 5
		} );

		geometry.center();
		

		line[i] = new THREE.Mesh( geometry, material.clone()  );
		line[i].position.y -= i  * 1.7;

		scene.add( line[i] );
		fullText.push( line[i]);

	}

	 return fullText;
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
	console.log( fullText );

	return fullText;
}

export { createTextByLines, createTextByLetters };