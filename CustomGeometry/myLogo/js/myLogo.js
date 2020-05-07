import * as THREE from 'three';

function customGeo(){
        
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(-1, -1,  1),  // 0
      new THREE.Vector3( 1, -1,  1),  // 1
      new THREE.Vector3(-1,  1,  1),  // 2
      new THREE.Vector3( 1,  1,  1),  // 3
      new THREE.Vector3(-1, -1, -1),  // 4
      new THREE.Vector3( 1, -1, -1),  // 5
      new THREE.Vector3(-1,  1, -1),  // 6
      new THREE.Vector3( 1,  1, -1),  // 7
      new THREE.Vector3( 1,  -.6, 1),  // 8
      new THREE.Vector3( 1,  -.6, -1),  // 9
      new THREE.Vector3( .6,  -.6, 1),  // 10
      new THREE.Vector3( .6,  -.6, -1),  // 11
    );

    geometry.faces.push(
      // // front
      new THREE.Face3(0, 10, 2),
      new THREE.Face3(0, 1, 10),
      new THREE.Face3(10, 8, 3),
      new THREE.Face3(10, 3, 2),
      // // back
      new THREE.Face3(0, 2, 6),
      new THREE.Face3(0, 6, 4),
      // // right
      new THREE.Face3(8, 7, 3),
      new THREE.Face3(8, 9, 7),
      // // top
      new THREE.Face3(3, 7, 6),
      new THREE.Face3(3, 6, 2),

      // // bottom
      new THREE.Face3(1, 4, 5),
      new THREE.Face3(1, 0, 4),
      // // 
      new THREE.Face3(10, 9, 8),
      new THREE.Face3(10, 11, 9),
      // 
      new THREE.Face3(1, 5, 11),
      new THREE.Face3(1, 11, 10),
      // //
      new THREE.Face3(4, 6, 11),
      new THREE.Face3(4, 11, 5),
      new THREE.Face3(11, 6, 7),
      new THREE.Face3(11, 7, 9),

    );
      geometry.faceVertexUvs[0].push(

        [ new THREE.Vector2(0, 0), new THREE.Vector2( .8, .2), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2( 1,0 ), new THREE.Vector2(.8, .2) ],
        [ new THREE.Vector2(.8, .2), new THREE.Vector2( 1, .2), new THREE.Vector2(1, 1) ],
        [ new THREE.Vector2(.8, .2), new THREE.Vector2( 1, 1), new THREE.Vector2(0, 1) ],
        // back
        [ new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(1, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0) ],

        [ new THREE.Vector2(0, .2), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, .2), new THREE.Vector2(1, .2), new THREE.Vector2(1, 1) ],
        //Top
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1,1), new THREE.Vector2(0, 1) ],
        //bottom
        [ new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        [ new THREE.Vector2(0, 1), new THREE.Vector2(0,0), new THREE.Vector2(1, 0) ],

        [ new THREE.Vector2(0, .8), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, .8), new THREE.Vector2(1,.8), new THREE.Vector2(1, 1) ],

        [ new THREE.Vector2(0, .8), new THREE.Vector2(1, .8), new THREE.Vector2(1, 1) ],
        [ new THREE.Vector2(0, .8), new THREE.Vector2(1,1), new THREE.Vector2(0, 1) ],

        [ new THREE.Vector2(1,0), new THREE.Vector2( 1,1), new THREE.Vector2( .2, .2) ],
        [ new THREE.Vector2(1,0), new THREE.Vector2( .2, .2), new THREE.Vector2( 0,0) ],

        [ new THREE.Vector2(.2, .2), new THREE.Vector2( 1,1), new THREE.Vector2( 0,1) ],
        [ new THREE.Vector2(.2, .2), new THREE.Vector2( 0,1), new THREE.Vector2( 0, .2) ],
    
     


    );

      geometry.computeFaceNormals();

    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();

    // geometry.faces[ 0].color = new THREE.Color('red');
    // geometry.faces[ 1].color = new THREE.Color('red');
    // geometry.faces[ 2].color = geometry.faces[3].color = new THREE.Color('yellow');

    // geometry.faces.forEach((face, ndx) => {
    //   face.vertexColors = [
    //     (new THREE.Color()).setHSL(ndx / 20      , 1, 0.5),
    //     (new THREE.Color()).setHSL(ndx / 20 + 0.1, 1, 0.5),
    //     (new THREE.Color()).setHSL(ndx / 20 + 0.2, 1, 0.5),
    //   ];
    // });
  
    return geometry


}

export { customGeo }