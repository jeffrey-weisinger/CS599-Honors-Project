//Plane Project: 
//Press q/e to tilt back and forth (along z axis)
//Press a/d to rotate left and right (along y axis)
//Press w/s to rotate front and back (along x axis)

//Basic Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//basic setup
const scene = new THREE.Scene();

//Citing Source for texture:
//https://hdri-haven.com/hdri/beautiful-sunrise-at-coast/backplates
//Specific Backplate: https://hdri-haven.com/hdri/beautiful-sunrise-at-coast/backplates/6831
//Used for the background of the scene if textures are enabled.
let sceneBackground = new THREE.TextureLoader().load("./sunset.jpg");
//we set it as a default here:
scene.background = sceneBackground
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 20, 5 );
//getting the div that is shown when we collide: when clicked, it will take us to restart.
let restart = document.getElementById("restart")
//this is going to be a checkbox in the html that the user can use to toggle textures
let textures = document.getElementById("textures");
//by default, this should be false.
let addTextures = textures.checked;

//Citing Source for Texture:
//https://polyhaven.com/a/snow_01
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_01/snow_01_diff_1k.png
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_01/snow_01_nor_gl_1k.png
let groundTextureColor = new THREE.TextureLoader().load("./groundTextureColor.png");
let groundTextureNormal = new THREE.TextureLoader().load("./groundTextureNormal.png");
//This allows me to repeat the texture across the plane multiple times,
// instead of only having one texture that gets stretched.
groundTextureColor.repeat.set(0.99, 2/3)

//based on whethere there are textures or not, we will first figure out what 
//kind of material we should have for the ground, what background to have for the scene
let planeMaterial = null;
if (!addTextures){
    scene.background = new THREE.Color("#636363"); 
    //this is the GROUND not a flying plane 
    planeMaterial = new THREE.MeshStandardMaterial( {color: "darkgray",side: THREE.DoubleSide})//, map: groundTextureColor, normal: groundTextureNormal} );

}else{
    //this will be the sunrise, and the ground texture we imported above, respectively.
    scene.background = sceneBackground
    planeMaterial = new THREE.MeshStandardMaterial( {color: "white",side: THREE.DoubleSide, map: groundTextureColor, normal: groundTextureNormal} );

}

//here, we define the ground, and initialize it.
const planegeo = new THREE.PlaneGeometry( 5000, 5000 );
const plane = new THREE.Mesh( planegeo, planeMaterial );
//we make it so that it's horizontal
plane.rotateX(Math.PI/2)
plane.position.y = -1 
//we add it to the scene.
scene.add( plane );
//textures is the text box. If we check it, we should add/remove textures, using
//the same logic as before:
textures.onclick = () => {
    //first, we will see if it is checked or not.
    addTextures = textures.checked;
    restartFunc();
    //this is the same logic as earlier
    if (!addTextures){
        scene.background = new THREE.Color("#636363"); 
        planeMaterial = new THREE.MeshStandardMaterial( {color: "darkgray",side: THREE.DoubleSide})//, map: groundTextureColor, normal: groundTextureNormal} );

    }else{
        scene.background = sceneBackground
        planeMaterial = new THREE.MeshStandardMaterial( {color: "white",side: THREE.DoubleSide, map: groundTextureColor, normal: groundTextureNormal} );
    }
    //instead of initializing a new plane, we can just change the material of the existing plane.
    plane.material = planeMaterial
}

//defining our renderer.
const renderer = new THREE.WebGLRenderer();
//we give it the size of the window for proportions, and add it to the document.
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
//this "axes helper" just helps me see which direction is x, y, and z. 
//i included it in the final product to help users physically orient themselves in the scene.
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//CITING TEXTURE (general link, color map, normal map)
//https://polyhaven.com/a/snow_02
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_02/snow_02_diff_1k.png 
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_02/snow_02_nor_gl_1k.png
let snowTextureColor = new THREE.TextureLoader().load("./snowTextureColor.png");
let snowTextureNormal = new THREE.TextureLoader().load("./snowTextureNormal.png");

//CITING TEXTURE
//TEXTURE 2: (general link, color map, normal map)
//https://polyhaven.com/a/snow_03
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_03/snow_03_diff_1k.png
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/snow_03/snow_03_nor_gl_1k.png
let snowTextureColor2 = new THREE.TextureLoader().load("./snowTextureColor2.png");
let snowTextureNormal2 = new THREE.TextureLoader().load("./snowTextureNormal2.png");
//TEXTURE 3: (general link, color map, normal map)
//https://polyhaven.com/a/asphalt_snow
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/asphalt_snow/asphalt_snow_diff_1k.png
//https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/asphalt_snow/asphalt_snow_nor_gl_1k.png
let snowTextureColor3 = new THREE.TextureLoader().load("./snowTextureColor3.png");
let snowTextureNormal3 = new THREE.TextureLoader().load("./snowTextureNormal3.png");

//CITING TEXTURE:
//I got my color map and normal map from the 1k download option on:
//https://www.texturecan.com/details/611/
let metalTextureColor = new THREE.TextureLoader().load("./metalTextureColor.jpg");
let metalTextureNormal = new THREE.TextureLoader().load("./metalTextureNormal.png");

//defining the box for the plane
const _1_geometry = new THREE.BoxGeometry( 6, 1.5, 10 );
const _1_material = new THREE.MeshStandardMaterial( {color: "gray",map: metalTextureColor, normalMap: metalTextureNormal} );
const _1_cube = new THREE.Mesh( _1_geometry, _1_material );
scene.add( _1_cube );

//adding detail to plane
const geoside1 = new THREE.CylinderGeometry( 1.5, 1.5, 5, 10 );
const matside1= new THREE.MeshStandardMaterial( {color: "lightgray",map: metalTextureColor, normalMap: metalTextureNormal} );
const side1 = new THREE.Mesh( geoside1, matside1 );
side1.rotateY(Math.PI/6)
//adding detail to plane

const geoside2 = new THREE.CylinderGeometry( 1.5, 1.5, 5, 10);
const matside2= new THREE.MeshStandardMaterial( {color: "lightgray",map: metalTextureColor, normalMap: metalTextureNormal} );
const side2 = new THREE.Mesh( geoside2, matside2 );
side2.rotateY(-Math.PI/6)
side1.rotateX(Math.PI/2)
side2.rotateX(Math.PI/2)

//adding detail to plane

const geoBoost1 = new THREE.CylinderGeometry( 1.4, 0.3, 2, 10 );
const matBoost1 = new THREE.MeshStandardMaterial( {color: "gray",map: metalTextureColor, normalMap: metalTextureNormal} );
const boost1 = new THREE.Mesh( geoBoost1, matBoost1 );
//adding detail to plane
const geoBoost2 = new THREE.CylinderGeometry( 1.4, 0.3, 2, 10);
const matBoost2= new THREE.MeshStandardMaterial( {color: "gray",map: metalTextureColor, normalMap: metalTextureNormal} );
const boost2 = new THREE.Mesh( geoBoost2, matBoost2 );

//adding detail to plane
const middleGeo = new THREE.CylinderGeometry( 1.35, 0.5, 7, 10);
const middleMat = new THREE.MeshStandardMaterial( {color: "white",map: metalTextureColor, normalMap: metalTextureNormal} );
const middle = new THREE.Mesh( middleGeo, middleMat );

//adding detail to plane
const frontGeo = new THREE.CylinderGeometry( 1.9, 0.5, 7, 10);
const frontMat = new THREE.MeshStandardMaterial( {color: "#5c5c5c",map: metalTextureColor, normalMap: metalTextureNormal} );
const front = new THREE.Mesh( frontGeo, frontMat );
//adding detail to plane
front.position.y -= 0.4
//adding detail to plane
const side2_1Geo = new THREE.BoxGeometry( 4, 1.8, 3.5);
const side2_1Mat = new THREE.MeshStandardMaterial( {color: "#4a4a4a",map: metalTextureColor, normalMap: metalTextureNormal} );
const side2_1 = new THREE.Mesh( side2_1Geo, side2_1Mat );
//adding detail to plane
const side2_2Geo = new THREE.BoxGeometry( 4, 1.8, 3.5);
const side2_2Mat = new THREE.MeshStandardMaterial( {color: "#4a4a4a",map: metalTextureColor, normalMap: metalTextureNormal} );
const side2_2 = new THREE.Mesh( side2_2Geo, side2_2Mat );
//adding detail to plane
const wing_mat = new THREE.MeshStandardMaterial({color: "#5c5c5c",map: metalTextureColor, normalMap: metalTextureNormal})
const wing1_geo = new THREE.BoxGeometry(4.5, 1, 6)
const wing2_geo = new THREE.BoxGeometry(4.5, 1, 6)
const wing1 = new THREE.Mesh( wing1_geo, wing_mat );
const wing2 = new THREE.Mesh( wing2_geo, wing_mat );

const wing_mat2 = new THREE.MeshStandardMaterial({color: "#545454",map: metalTextureColor, normalMap: metalTextureNormal})

//adding detail to plane
const wing2_2_geo = new THREE.BoxGeometry(11.3, 0.9, 4)
const wing2_2 = new THREE.Mesh( wing2_2_geo, wing_mat2 );
wing2_2.position.z += 0.2
wing1.rotateY(Math.PI/2.7)
wing2.rotateY(-Math.PI/2.7)

//adding detail to plane
let back1mat = new THREE.MeshStandardMaterial({color: "gray",map: metalTextureColor, normalMap: metalTextureNormal})
let back1_1geo = new THREE.CylinderGeometry(1.8, 0.5, 4)
let back1_1 = new THREE.Mesh(back1_1geo, back1mat)
//adding detail to plane
let back1_2geo = new THREE.CylinderGeometry(1.8, 0.5, 4)
let back1_1mat = new THREE.MeshStandardMaterial({color: "gray",map: metalTextureColor, normalMap: metalTextureNormal})
let back1_2 = new THREE.Mesh(back1_1geo, back1_1mat)
//adding detail to plane


let back2_1mat = new THREE.MeshStandardMaterial({color: "#5a5c5c",map: metalTextureColor, normalMap: metalTextureNormal})
let back2_1geo = new THREE.BoxGeometry(7, 1.2, 2)
let back2_1 = new THREE.Mesh(back2_1geo, back2_1mat)
//adding detail to plane

let back2_2geo = new THREE.BoxGeometry(7, 1.2, 2)
let back2_2 = new THREE.Mesh(back2_2geo, back2_1mat)
//adding detail to plane

let back2_3geo = new THREE.BoxGeometry(4.7, 1.1, 9.3)
let back2_3 = new THREE.Mesh(back2_3geo, back2_1mat)
//adding detail to plane

let blobgeo = new THREE.CylinderGeometry(2, 0.5, 7)
let blobMat = new THREE.MeshStandardMaterial({color: "white",map: metalTextureColor, normalMap: metalTextureNormal})
let blob = new THREE.Mesh(blobgeo, blobMat)
scene.add(blob)
//Changing the rotations/positions of the various pieces of the plane
//So they can come together into one cohesive plane.
blob.position.y += 1
blob.rotateX(Math.PI/2)
blob.position.z += 2.5
blob.position.y -= 1.2


wing1.position.z -= 0.7
wing2.position.z -= 0.7
wing1.position.x += 4
wing2.position.x -= 4

scene.add( side1 );
scene.add( side2 );
scene.add( side2_1 );
scene.add( side2_2 );

scene.add( wing1 );
scene.add( wing2 );

scene.add( wing2_2 );

scene.add( back1_1 );
scene.add( back1_2 );

scene.add( back2_1 );
scene.add( back2_2 );
scene.add( back2_3 );



back1_1.rotateX(Math.PI/2)
back1_2.rotateX(Math.PI/2)
back1_1.position.x += 2.3
back1_2.position.x -= 2.3

back1_1.position.y -= 1.7
back1_2.position.y -= 1.7
back1_1.position.z += 8
back1_2.position.z += 8
side2_1.rotateY(Math.PI/6)
side2_2.rotateY(-Math.PI/6)

side2_1.position.z -= 2.5
side2_2.position.z -= 2.5
side2_1.position.x += 2.2
side2_2.position.x -= 2.2
back2_1.position.z += 6
back2_2.position.z += 6
back2_1.position.x += 2.4
back2_2.position.x -= 2.4
back2_1.rotateY(-1.3)
back2_2.rotateY(1.3)
back2_1.position.y -= 0.5
back2_2.position.y -= 0.5
back2_3.position.y -= 0.5

back2_3.position.z += 5


front.rotateX(Math.PI/2)


boost1.rotateX(Math.PI/2)
boost2.rotateX(Math.PI/2)

side1.position.z -= 4
side2.position.z -= 4
side1.position.x -= 1
side2.position.x += 1

boost1.position.x -= 2.6
boost2.position.x += 2.6
boost1.position.z -= 7
boost2 .position.z -= 7

boost1.rotateZ(-0.45)
boost2.rotateZ(0.45)

scene.add( boost1 );
scene.add( boost2 );

middle.rotateX(Math.PI/2)
// 
scene.add(middle)

middle.position.z -= 6

scene.add( front );
front.position.z -= 7




//Having a basic ambient light to light our scene
const light = new THREE.AmbientLight(0xffffff, 2.1); 
scene.add(light);

//This is a variable that allows us to denote whether 
//the scene is "frozen", or in other words if it's currently paused
//so that the user can't input anything
//used when there is a collision.
let frozen = false;

//this is an object that groups all of the parts of the plane.
let center = new THREE.Object3D()
center.position.y = 6

//Adding everything to the "center" group.
center.add(_1_cube)

center.add(_1_cube)
center.add(blob)

center.add( side1 );
center.add( side2 );
center.add( side2_1 );
center.add( side2_2 );

center.add( wing1 );
center.add( wing2 );

center.add( wing2_2 );

center.add( back1_1 );
center.add( back1_2 );

center.add( back2_1 );
center.add( back2_2 );
center.add( back2_3 );

center.add( boost1 );
center.add( boost2 );
center.add( front );
center.add(middle)

//We can assign different roles to different groups, so that
//we can have changes that work hierarchically.
//In other words, different groups each control different parts of the position/rotation,
//and this makes it easier for us to divide our work by seeing which part is doing what.
//center controls the side to side tilting.
//normalRotateObject controls the left to right rotating
let normalRotateObject = new THREE.Object3D();
//position object controls the position
let positionObject = new THREE.Object3D();
//just assinging it hierarchically -- so that position is "above" rotation which is "above" tilt
//this is done so that the less broad position/rotation changes can simply add themselves to the
//rotation/position changes "above" them, making the coding process more simple.
positionObject.add(normalRotateObject);
normalRotateObject.add(center);
//adding the highest hierarchical position to the scene.
scene.add(positionObject)
//changing camera settings
camera.zoom = 40;
//Pivot Point:
//This will dictate where the tetrahedrons will spawn every time we call "populateRocks" (for the left side of the mountains)
//We actually make it a sphere for debugging purposes, so we can see where it is.
const pivotGeometry = new THREE.SphereGeometry(0, 30, 20);
const pivotMaterial = new THREE.MeshBasicMaterial({color:"purple"})
let pivot = new THREE.Mesh(pivotGeometry, pivotMaterial)
// scene.add(pivot)
pivot.rotateZ(-Math.PI/2.8)
pivot.position.x = -27.25 
pivot.position.y = 7*2+4
pivot.position.z = -50

// //Pivot Point 2:
//Again, this dictates where the tetrahedrons will spawn, but for the right side of the mountains.
const pivotGeometry2 = new THREE.SphereGeometry(0, 30, 20);
const pivotMaterial2 = new THREE.MeshBasicMaterial({color:"purple"})
let pivot2 = new THREE.Mesh(pivotGeometry2, pivotMaterial2)
// scene.add(pivot2)
pivot2.rotateZ(Math.PI/2.8)
pivot2.position.x += 19
// pivot2.position.y += 2
pivot2.position.z -= 50
//we add both to scene.
scene.add(pivot)
scene.add(pivot2)

//there is no built-in vector subtraction, so we do it ourselves 
let subtract = (A, B) => {
    return new THREE.Vector3(A.x-B.x, A.y-B.y, A.z-B.z)
}
//this just allows us to find the center of two points, which can be valuable when doing work with tetrahedrons
//which have four vertices.
let findCenter = (A, B, C, D) => {
    return new THREE.Vector3((A.x+B.x+C.x+D.x)/4, (A.y+B.y+C.y+D.y)/4, (A.z+B.z+C.z+D.z)/4);
}

//stores information for various groups
let allGroups = []
//keeps tetras so that we can remove later
let tetraList = []
//keeps lines so that we can remove later
let lineList = []
//keeps all data, used for collisions.
let allInfo = {} //the allInfo stores its data like this ---- group: [[group pos], [[all normals], [vertices on tetrahedron]]]
//a regular tetrahedron material for when one isn't defined explicitly.
let regularTetraMat = new THREE.MeshStandardMaterial({color:"#ffffff"})//, map: currTextureColor, normalMap:currTextureNormal, metalness: 0.01, roughness:0.99})
//tetrahedron materials using the textures defined above.
let snowTetraMat = new THREE.MeshStandardMaterial({color:"#ffffff", map: snowTextureColor, normalMap:snowTextureNormal, metalness: 0.01, roughness:0.99})
let snowTetraMat2 = new THREE.MeshStandardMaterial({color:"#ffffff", map: snowTextureColor2, normalMap:snowTextureNormal2, metalness: 0.01, roughness:0.99})
let snowTetraMat3 = new THREE.MeshStandardMaterial({color:"#ffffff", map: snowTextureColor3, normalMap:snowTextureNormal3, metalness: 0.01, roughness:0.99})
// let snowTetraMat4 = new THREE.MeshStandardMaterial({color:"#ffffff", map: snowTextureColor4, normalMap:snowTextureNormal4, metalness: 0.01, roughness:0.99})

//these will be used in populate rocks.
//we put them here to save computational power.
const genericSphereMat = new THREE.MeshBasicMaterial({color:"yellow"})
const genericSphereGeo = new THREE.SphereGeometry(0.05, 30, 20);

//this function takes in both pivots and "backwards", an argument
//to help us understand what direction the pivots should be facing.
//it will give us a building block for a mountain range that
//we can use to create more complex mountain ranges
let populateRocks = (pivot, pivot2, backwards=false) => {
    //we will add the previous length of allInfo to the group number
    // just allows us to make it so we don't overwrite previous groups when this is called many times.
    let adder = Object.keys(allInfo).length

    //we will iterate over all rows and all columns
    for (let i = 0; i < 24; i+=3){     //8 rows
        for (let j = 0; j < 18; j+=3){  //6 columns
            //then, in each row/col pair, we will iterate over the left and right
            for (let m = 0; m < 2; m++){
                //this is the left and right part -- depending on if we are left or right,
                //we will choose a different pivot.
                let currPivot = null;
                if (m == 0){
                    currPivot = pivot
                }else{
                    currPivot = pivot2
                }
    
                //we will first pur our "generic sphere" somewhere relative to the pivot
                //this will help us to place our tetrahedron later
                let genericSphere = new THREE.InstancedMesh(genericSphereGeo, genericSphereMat)
                //depending on the row/col, we will place in different places
                genericSphere.position.x = i;
                genericSphere.position.z = j;
                currPivot.add(genericSphere)
    
        
                const pos = new THREE.Vector3();
                genericSphere.getWorldPosition(pos);
        
                //this just helps us tweak the variables without having to hard-code
                let groupsPerRow = 3;
                let groupsPerColumn = 2;
                //spacing is the amount of space between each tetra
                let spacing = 3;
                
                //each group contains a certain amount of tetras.
                //it was actually quite tricky to code this part, but it really helps 
                //with efficiency when doing collision detection
                let group = Math.floor((i)/12)*groupsPerRow + Math.floor(j/(groupsPerColumn*spacing))

                //this will just help us see if we are on the first member of the group (then we will take its position)
                let groupRegular =(((i)/12*groupsPerRow + j/(groupsPerColumn*spacing)) == group)

                //figuring out what texture to use for tetras:
                let tetraMat = null;
                let rand = Math.random();
                //if textures are enabled, we will use something random.
                if (addTextures){
                    if (rand <= 1/3){

                        tetraMat = snowTetraMat
                    }else if (rand <= 2/3){
                        tetraMat = snowTetraMat2
    
                    }else{

                        tetraMat = snowTetraMat3
                    }
                 //otherwise, if they are not enabled, then we will use the default tetraMat
                }else{
                    tetraMat = regularTetraMat
                }
               
                let tetra = null
        
                //we actually define the tetra here, randomizing its size as well
                //and we will change its position to where we put the generic sphere earlier.
                let radius = Math.random()*7 + 3   
                let tetraGeo = new THREE.TetrahedronGeometry(radius, 0)

                tetra = new THREE.Mesh(tetraGeo, tetraMat);
                tetra.position.x = pos.x
                tetra.position.y = pos.y
                tetra.position.z = pos.z
                // }


                //this will just allow us to rotate the tetra along the y axis, if we are "mirroring" it.
                if (backwards){
                    tetra.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2)
                }

                //depending on whether it is the left or right group, we should rotate the mountain ranges in different ways.
                if (m == 0){
                    tetra.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1-(+Math.PI/3 + 0.3))
                }else{
                    tetra.rotateOnAxis(new THREE.Vector3(1, 0, 0), (+Math.PI/3 + 0.3))
                }
    

                //adding it to the list so we can remove it later.
                tetraList.push(tetra)

                    
                //now, we will want to calculate the normals so we can do collisions later:
                let posArr = tetraGeo.attributes.position.array 
                let k=3
                //manual normal calculations:
                tetra.updateMatrixWorld()
                //first, we will get all of the points.
                //the "applyMatrix4(tetra.matrixWorld)" will make it so that the positions are no longer local.
                //by applying the matrix world, we will make it global, so we can get the actual position of the tetra
                //the matrix4 is because (like we learned in class), the transformations in 4 space make the 
                //changes for spaces 3 and below much easier
                let A = new THREE.Vector3(posArr[0], posArr[1], posArr[2]).applyMatrix4(tetra.matrixWorld)
                let B = new THREE.Vector3(posArr[k + 0], posArr[k + 1], posArr[k + 2]).applyMatrix4(tetra.matrixWorld)
                let C = new THREE.Vector3(posArr[2*k + 0], posArr[2*k + 1], posArr[2*k + 2]).applyMatrix4(tetra.matrixWorld)
                let D = new THREE.Vector3(posArr[3*k + 0], posArr[3*k + 1], posArr[3*k + 2]).applyMatrix4(tetra.matrixWorld)
    
                
                //if it is the first tetra in the group, we can just get its position for the "group position"
                //define the group.
                if (groupRegular){
                    allGroups.push([i, j])
                    allInfo[adder + group + m*5] = [findCenter(A, B, C, D), [[], []]]
                }
    
    
                //we will get all normals here.
                //NOTE that we have to clone before using the cross product, or else it will actually
                //change the Vector3's.
                //We figure out the vectors for each face, and then take the cross product.
                //We know which vectors to use via the right hand rule (the two vectors should result in your thumb facing out)

                //ABC, ADB, ACD, CBD
                //triangle ABC
                let AB = subtract(B, A)
                let AC = subtract(C, A)
    
                let N1 = (AB.clone()).cross(AC.clone())
    
                //triangle ADB
                let AD = subtract(D, A)
                // AB
                let N2 = (AD.clone().cross(AB.clone()))
    
                //triangle ACD
                //AC
                //AD
                let N3 = (AC.clone().cross(AD.clone()))
    
                //triangle CBD
                let CB = subtract(B, C)
                let CD = subtract(D, C)
                //AD
                let N4 = (CB.clone().cross(CD.clone()))
    
                allInfo[adder + group + m*5][1][0].push([N1, N2, N3, N4])

                allInfo[adder + group + m*5][1][1].push([A, B]) //A is present in first 3 normal calculations, NOT in last.
    
            tetraList.push(tetra)
            scene.add(tetra)   
            //if textures are enabled, we will use THREE.LineSegments to add a line. 
            if (addTextures){
                const line  = new THREE.LineSegments(tetraGeo, new THREE.LineBasicMaterial({color:"#737373"}))

                tetra.add(line)
                lineList.push(line);
            }

            }
        }
    }

}

//allows us to populate in different styles.
//really, this is just tweaing the positions and rotations
//in order to see what works for each artistic mountain style.

//specifically -- we first will maneuver around the pivot/pivot2
//into the correct location.
//then, we use populateRocks as building blocks for each style.
let populateStyle = (pivot, pivot2, type) =>{
    // console.log(type)
    //just a linear mountain range along the z axis.
    if (type == 1){
        pivot.x += 15
        pivot2.x += 15
        populateRocks(pivot, pivot2);
        // let newPivot1 = new Object3D;
        pivot.position.z -= 18
        pivot2.position.z -= 18
        
        populateRocks(pivot, pivot2);
        pivot.position.z -= 18
        pivot2.position.z -= 18
        populateRocks(pivot, pivot2);
        pivot.position.z -= 18
        pivot2.position.z -= 18
        populateRocks(pivot, pivot2);
        pivot.position.z -= 18
        pivot2.position.z -= 18
        populateRocks(pivot, pivot2);
        pivot.position.z -= 18
        pivot2.position.z -= 18
        populateRocks(pivot, pivot2);
        pivot.position.z -= 18
        pivot2.position.z -= 18
        populateRocks(pivot, pivot2);
    }
    //left curve
    if (type == 2){
        // console.log(pivot.position.x)
        // console.log(pivot2.position.x)

        populateRocks(pivot, pivot2);

        pivot.position.x -= 5.5
        pivot2.position.x -=4.5
        //pivot1: -5.5, pivot2: -4.5
        pivot.position.z -= 18
        pivot2.position.z -= 18
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        populateRocks(pivot, pivot2);
        pivot.position.z -= 13
        pivot2.position.z -= 15
        pivot.position.x -= 12
        pivot2.position.x -= 10
        //pivot1: -17.5, pivot2: -14.5
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.3)
        populateRocks(pivot, pivot2);

        pivot.position.z -= 5
        pivot2.position.z -= 15
        pivot.position.x -= 16
        pivot2.position.x -= 16

        //pivot1: -33.5, pivot2: -30.5
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.25)
        populateRocks(pivot, pivot2);
        pivot.position.z += 1
        pivot2.position.z -= 10
        pivot.position.x -= 12
        pivot2.position.x -= 16
        //pivot1: -45.5, pivot2: -46.5
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.25)
        populateRocks(pivot, pivot2);

        pivot.position.z += 5
        pivot2.position.z -= 8
        pivot.position.x -= 8
        pivot2.position.x -= 8
        //pivot1: -53.5, pivot2: -54.5
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.25)
        pivot2.position.z +=2 
        pivot2.position.x -= 3
        //pivot1: -53.5, pivot2: -57.5
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.25)
        populateRocks(pivot, pivot2);
        pivot.position.z -=14
        pivot.position.x -= 14
        //pivot1: -67.5, pivot2: -57.5

        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -3.1)
        pivot2.position.z -=5 
        pivot2.position.x -= 14
        //pivot1: -67.5, pivot2: -71.5

        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.8)
        populateRocks(pivot, pivot2);
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 10
        pivot2.position.x -= 10
        //pivot1: -67.5, pivot2: -81.5

        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.5)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 3
        pivot2.position.x -= 6
        //pivot1: -67.5, pivot2: -87.5

        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.4)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 5
        pivot2.position.x -= 6
        //pivot1: -67.5, pivot2: -93.5

        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 6
        pivot2.position.x -= 2

        //pivot1: -67.5, pivot2: -95.5


        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 8
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 8
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2);
        pivot2.position.z -= 9
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        pivot.position.z -=6
        pivot.position.x += 2
        //pivot1: -67.5, pivot2: -95.5
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.6)
        populateRocks(pivot, pivot2);
        pivot.position.z += 5
        pivot.position.x += 10
        //pivot1: -57.5, pivot2: -95.5

        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1)
        populateRocks(pivot, pivot2);
        pivot.position.z -= 2
        pivot.position.x -= 25
        //pivot1: -83.5, pivot2: -95.5

        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0),  2.9)
        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x -= 5
        //pivot1: -88.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x -= 2
        //pivot1: -93.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x -= 3
        //pivot1: -98.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x -= 2
        //pivot1: -102.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x -= 3
        //pivot1: -104.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 9
        populateRocks(pivot, pivot2);
        pivot.position.z -= 9
        populateRocks(pivot, pivot2);

    pivot.position.z -= 13

    }
    //for the right mountain range.
    if (type == 3){
        populateRocks(pivot, pivot2, true);

        pivot.position.x += 5.5
        pivot2.position.x +=4.5
        pivot.position.z -= 18
        pivot2.position.z -= 18
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.45)
        populateRocks(pivot, pivot2, true);
        pivot.position.z -= 13
        pivot2.position.z -= 15
        pivot.position.x += 12
        pivot2.position.x += 10
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.3)
        populateRocks(pivot, pivot2, true);

        pivot.position.z -= 5
        pivot2.position.z -= 15
        pivot.position.x += 16
        pivot2.position.x += 16
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.25)
        populateRocks(pivot, pivot2, true);
        pivot.position.z += 1
        pivot2.position.z -= 10
        pivot.position.x += 12
        pivot2.position.x += 16
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.25)
        populateRocks(pivot, pivot2, true);

        pivot.position.z += 5
        pivot2.position.z -= 8
        pivot.position.x += 8
        pivot2.position.x += 8
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.45)
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.25)
        pivot2.position.z +=2 
        pivot2.position.x += 3
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.25)
        populateRocks(pivot, pivot2, true);
        pivot.position.z -=14
        pivot.position.x += 14
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 3.1)
        pivot2.position.z -=5 
        pivot2.position.x += 14
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.8)
        populateRocks(pivot, pivot2, true);
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 10
        pivot2.position.x += 10
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.5)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 3
        pivot2.position.x += 6
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.4)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 5
        pivot2.position.x += 6
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 6
        pivot2.position.x += 2
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 8
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 8
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        populateRocks(pivot, pivot2, true);
        pivot2.position.z -= 9
        pivot2.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0)
        pivot.position.z -=6
        pivot.position.x -= 2
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.6)
        populateRocks(pivot, pivot2, true);
        pivot.position.z += 5
        pivot.position.x -= 10
        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1)
        populateRocks(pivot, pivot2, true);
        
        pivot.position.z -= 2
        pivot.position.x += 25
        //pivot1: -83.5, pivot2: -95.5

        pivot.rotateOnAxis(new THREE.Vector3(1, 0, 0),  -2.9)
        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x += 5
        //pivot1: -88.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x += 2
        //pivot1: -93.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x += 3
        //pivot1: -98.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x += 2
        //pivot1: -102.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 8
        pivot.position.x += 3
        //pivot1: -104.5, pivot2: -95.5

        populateRocks(pivot, pivot2);
        pivot.position.z -= 9
        populateRocks(pivot, pivot2);
        pivot.position.z -= 9
        populateRocks(pivot, pivot2);
        pivot.position.z -= 13

    }
    

}

//we are getting the pivot set up for the very first call to populateStyle, 
//which will always be style 2.
pivot.rotation.set(0, 0, 0);
pivot2.rotation.set(0, 0, 0);
pivot.rotateZ(-Math.PI/2.8)
pivot2.rotateZ(Math.PI/2.8)

//calling style 2 to start the game
populateStyle(pivot, pivot2, 2)

//figuring out the orbit controls for our main camera
const controls = new OrbitControls( camera, renderer.domElement );

//we need to set this in order for us to figure out which camera to use.
let currCamera = camera;

//we will also set the back camera but without orbit controls
const backCamera = new THREE.PerspectiveCamera(75, 6/3, 0.001, 1000)
backCamera.position.set(0, 20, 15)
// backCamera.lookAt(new THREE.Vector3(-100, -10 ,-10))

// backCamera.up.set(new THREE.Vector3(-1, 1, 0))
// backCamera.lookAt(_1_planeHead)
scene.add(backCamera)
backCamera.zoom = 40


//For all of these cameras, note that I will essentially initialize
//them in the same way, and that they will all be positioned arbitrarily
//because they will be changed in the animate function

const leftCamera = new THREE.PerspectiveCamera(75, 6/3, 0.001, 1000)
leftCamera.position.set(0, 20, 15)
//adding to scene
scene.add(leftCamera)
leftCamera.zoom = 40

const rightCamera = new THREE.PerspectiveCamera(75, 6/3, 0.001, 1000)
rightCamera.position.set(0, 20, 15)
//adding to scene
scene.add(rightCamera)
rightCamera.zoom = 40

const pilotCamera = new THREE.PerspectiveCamera(75, 6/3, 0.001, 1000)
pilotCamera.position.set(0, 20, 15)
scene.add(pilotCamera)
pilotCamera.zoom = 40


//keydown event -- based on whether what key you use, move the plane somehow.
document.addEventListener('keydown', (event) => {
    //if we're in a "frozen" state, then we won't even allow for rotations or any movement
    if (frozen){
        return;
    }

    //w will rotate along the x axis, using the normalRotateObject 
    if (event.key === 'w') {

        normalRotateObject.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI/100)
    //same, except rotating in opposite direction
    }else if (event.key === "s"){
        normalRotateObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/100)

    }
        //w will rotate along the y axis, using the normalRotateObject 
    if (event.key == "a"){
        normalRotateObject.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/100)
        // sphere.position.z -= 0.2
        //w will rotate along the y axis, using the normalRotateObject, but we will go in the opposite direction
    }else if (event.key == "d"){
        normalRotateObject.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI/100)
        // sphere.position.z += 0.2

    }
    
    //I will move along the current direction of the rotation of our x/y axes
    //I do this by copying the quaternion of the normalRotateObject onto the amount we want to move it 
    //in its local z-axis.
    if (event.key === "v"){
        //if this were to move the plane too far up, then I will not allow this. 
        //i will simulate the movement first with an object3D, and then I will do my own movement if it is allowed.
        let testObj = new THREE.Object3D();
        testObj.position.set(positionObject.position.x, positionObject.position.y, positionObject.position.z)
        testObj.position.add(new THREE.Vector3(0, 0, -2).applyQuaternion(normalRotateObject.quaternion))

        if (testObj.position.y <= 18){
            //this movement is the same as the "test" movement
            positionObject.position.add(new THREE.Vector3(0, 0, -2).applyQuaternion(normalRotateObject.quaternion))
        }
    }

    //this tilts along the z axis
    if (event.key == "q"){
        // sphere.position.y += 0.2
        center.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/100)
        
    //this tilts along the z axis, in the opposite direction
    }else if (event.key == "e"){
        // sphere.position.y -= 0.2

        center.rotateOnAxis(new THREE.Vector3(0, 0, 1), -Math.PI/100)
    }

    //here, we're just registering keys to see what camera we should use
    if (event.key == "1"){
        currCamera = camera;
        //we get the global position of the plane so we can reset the camera's position relative to it
        let globalPlane = new THREE.Vector3();
        center.getWorldPosition(globalPlane)
        //i had issues with the orbital controls where the position of the camera would move in unexpected places 
        //, so i just decided to reset it every time.
        camera.position.set(globalPlane.x, globalPlane.y +20, globalPlane.z + 5)
    }else if (event.key == "2"){
        currCamera = backCamera
    }else if (event.key == "3"){
        currCamera = leftCamera
    }else if (event.key == "4"){
        currCamera = rightCamera
    }else if (event.key == "5"){
        currCamera = pilotCamera
    }


});


//this tells us the previous style for when we're doing animation
// in case we need to alter our current style
let prevType = 1

//this allows us to not look at irrelevant (deleted) groups 
//after we have removed them.
let infoStartPos = 0

//these nodes represent the "bounding box" of the plane
//in other words, they determine the "shape" of the plane
//in how it collides with the mountain

//every frame, we will see if any of these nodes collide with the mountain
let backNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let frontNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let leftNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let rightNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let topNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let bottomNodeGeo = new THREE.SphereGeometry(0, 10, 10);
let nodeMaterial = new THREE.MeshStandardMaterial({color: "green"});

let backNode = new THREE.Mesh(backNodeGeo, nodeMaterial);
let frontNode = new THREE.Mesh(frontNodeGeo, nodeMaterial);
let leftNode = new THREE.Mesh(leftNodeGeo, nodeMaterial);
let rightNode = new THREE.Mesh(rightNodeGeo, nodeMaterial);
let topNode = new THREE.Mesh(topNodeGeo, nodeMaterial);
let bottomNode = new THREE.Mesh(bottomNodeGeo, nodeMaterial);

//adding all of the nodes to the scene -- they are invisible right now, 
//but they can be expanded to be viewed for testing.
scene.add(backNode)
scene.add(frontNode)
scene.add(leftNode)
scene.add(rightNode)
scene.add(topNode)
scene.add(bottomNode)


// leftNode.position.add(new THREE.Vector3(0, 0, 3).applyQuaternion(center.quaternion))

//the animate function that's called once per second.
function animate() {

    //if we have too many tetrahedrons on the screen,
    //we will remove the earliest 1000 tetrahedrons.
    if (tetraList.length >= 10000){
        // infoStartPos += 1000 
        for (let i = 0; i < 1000; i++){
            //this makes sure that we aren't saving memory for unnecessary 
            //instances of the material or geometry in the scene
            tetraList[i].material.dispose()
            tetraList[i].geometry.dispose()
            //we should also remove the object itself from the scene so that it is no longer visible
            scene.remove(tetraList[i])
            // infoStartPos += Math.floor(1000/8)
        }
        //then, we will remove the first 1000 tetrahedrons from the tetra list.
        tetraList = tetraList.slice(1000)

    }
    
    //we get the world position of the aircraft
    //it often isn't enough for us to to just take the local position of the plane.
    //this seems like the most efficient way
    let planeCenter = new THREE.Vector3();
    center.getWorldPosition(planeCenter)

    //this is also the global position of the plane, 
    //it is used when checking relative node position, as well as determining the
    //pivot positions for when we are generating the mountain ranges
    //the "planeCenter" variable is used for distance measurements in collision handling.
    let centerCurrentPos = new THREE.Vector3();
    center.getWorldPosition(centerCurrentPos)

    //first, we set the six nodes for the bounding box at the center of the aircraft.
    backNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    frontNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    leftNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    rightNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    topNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    bottomNode.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)

    //then, we make an object that uses both the rotations from the center (tilting left and right)
    //and from the normalRotateObject (rotating on x and y axes)
    //we will do this by applying the quaternions of both (which are the rotations) to a new object 
    //that combines both rotations.
    let combinedRotateObject = new THREE.Object3D();
    combinedRotateObject.applyQuaternion(center.quaternion)
    combinedRotateObject.applyQuaternion(normalRotateObject.quaternion)

    //next, using this combined rotation, we will move the six points in directions relative to the aircraft
    //we will move two points in the x direction for the wings, 
    //and we will move two points in the y direction for the top and bottom, 
    //and two points in the z direction for the nose and tail of the aircraft.
    backNode.position.add(new THREE.Vector3(0, 0, 5*2).applyQuaternion(combinedRotateObject.quaternion))
    frontNode.position.add(new THREE.Vector3(0, 0, -5*2).applyQuaternion(combinedRotateObject.quaternion))
    leftNode.position.add(new THREE.Vector3(-3.7*2, 0, 0).applyQuaternion(combinedRotateObject.quaternion))
    rightNode.position.add(new THREE.Vector3(3.7*2, 0, 0).applyQuaternion(combinedRotateObject.quaternion))
    topNode.position.add(new THREE.Vector3(0, 0.6*2, 0).applyQuaternion(combinedRotateObject.quaternion))
    bottomNode.position.add(new THREE.Vector3(0, -0.6*2, 0).applyQuaternion(combinedRotateObject.quaternion))

    //again, it's very useful to have the global positions for these points
    let backNodeGlobal = new THREE.Vector3();
    let frontNodeGlobal = new THREE.Vector3();
    let leftNodeGlobal = new THREE.Vector3();
    let rightNodeGlobal = new THREE.Vector3();
    let topNodeGlobal = new THREE.Vector3();
    let bottomNodeGlobal = new THREE.Vector3();

    //we will do this with the getWorldPosition command on the nodes, as we did before.
    backNode.getWorldPosition(backNodeGlobal)
    frontNode.getWorldPosition(frontNodeGlobal)
    leftNode.getWorldPosition(leftNodeGlobal)
    rightNode.getWorldPosition(rightNodeGlobal)
    topNode.getWorldPosition(topNodeGlobal)
    bottomNode.getWorldPosition(bottomNodeGlobal)


    //if any points on the bounding box are underneath the plane, then we should determine that there is a collsion as well.
    if (backNode.position.y < 0 || frontNode.position.y < 0 || leftNode.position.y < 0 || rightNode.position.y < 0 || topNode.position.y < 0 || bottomNode.position.y < 0){
        //this makes the restart button visible.
        restart.style.display = "flex"
        //we "freeze" so that the user cannot input anything, because there has been a collision
        frozen = true;
    }

    //we will use this array in order to iterate through all of the points when checking for more complex collisions.
    let globalNodePositions = [
        backNodeGlobal, frontNodeGlobal, leftNodeGlobal, rightNodeGlobal, topNodeGlobal, bottomNodeGlobal
    ];


    //another global position variable for the center, 
    //this time used by the cameras.
    let cubeCurrentPos = new THREE.Vector3();
    _1_cube.getWorldPosition(cubeCurrentPos)

    //we will check one of the pivots to see if we are close enough to it on 
    //the z axis -- so we need the global pivot position for the left pivot.
    let globalPivotPos = new THREE.Vector3();
    pivot.getWorldPosition(globalPivotPos)

    //if we are close enough on the z-axis to the pivot,
    //then we should generate terrain.
    if (Math.abs(centerCurrentPos.z - globalPivotPos.z ) <= 80){
        //we should refresh the pivot rotations
        pivot.rotation.set(0, 0, 0);
        pivot2.rotation.set(0, 0, 0);

        //and also we will randomly select a style 0 through 2.
        let style = Math.floor(Math.random()*3 +1);

        //depending on what style we pick,
        //we must do some adjustments so that all of the pieces fit together.
        if (style == 1 || style == 2){

            pivot.rotation.set(0, 0, 0);
            pivot2.rotation.set(0, 0, 0);
            pivot.rotateZ(-Math.PI/2.8)
            pivot2.rotateZ(Math.PI/2.8)
            if (style == 2 && prevType == 3){
                pivot.position.z += 8
                pivot2.position.z += 8

            }
        }else if (style == 3){
            pivot.rotation.set(0, 0, 0);
            pivot2.rotation.set(0, 0, 0);
            pivot.rotateZ(Math.PI/2.8)
            pivot2.rotateZ(-Math.PI/2.8)

            pivot.rotateZ(-Math.PI)
            pivot2.rotateZ(-Math.PI)
            pivot.position.x += 60
            pivot2.position.x -= 45
            pivot.position.z += 5
            pivot2.position.z += 5

        }


        //assigning prevType to the current type, 
        //which will be the prevType on the next iteration.
        //this is useful in making logic for the connections of
        //specific pieces.
        prevType = style;
        //we will use the two styles to call populateStyle
        populateStyle(pivot, pivot2, style);

        //we are editing the pivot positions to ensure that it is ok on the next iteration
        //since 3 is a mirror of 2, it has some strange properties that we adjust for here.
        if (style == 3){
            pivot.position.x -= 60
            pivot2.position.x += 45
            pivot2.position.y = 0

        }

    }

    //for all cameras, we follow a relatively simple procedure. 
    //first, we will set the camera to the current global position of the aircraft, which we already determined.
    //next, we will figure out which direction to move in, and by how much.
    //we will apply a quaternion for the normalRotateObject, which tells us how much the aircraft has rotated.
    //this allows us to determine the relative direction to move in.
    //finally, we will set the lookAt target as the global center of the aircraft, so that all cameras can look back at the aircraft
    
    //the only difference between the cameras is the relative direction that they move in from the center of the aircraft.

    backCamera.position.set(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)
    backCamera.position.add(new THREE.Vector3(0, 0, 14).applyQuaternion(normalRotateObject.quaternion))
    backCamera.lookAt(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)
    //we also have to remember to set the orbit controls to be relative to the aircraft's current position.
    controls.target.set(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)

    leftCamera.position.set(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)
    leftCamera.position.add(new THREE.Vector3(-12, 0, 0).applyQuaternion(normalRotateObject.quaternion))
    leftCamera.lookAt(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)
    
    rightCamera.position.set(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)
    rightCamera.position.add(new THREE.Vector3(12, 0, 0).applyQuaternion(normalRotateObject.quaternion))
    rightCamera.lookAt(cubeCurrentPos.x, cubeCurrentPos.y, cubeCurrentPos.z)



    pilotCamera.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z)
    pilotCamera.position.add(new THREE.Vector3(0, 0, -6.5).applyQuaternion(normalRotateObject.quaternion))

    //i did this slightly differently here, but the procedure is the same:
    //for the pilot's view, we don't want to look directly at the center.
    //instead, we want to look at some position far away from the aircraft that is in the 
    //center of the aircraft's "vision".
    //to do this, we will set the lookAt point 100 units away from the front of the plane, 
    //in the relative z-direction (100 units away in the center of the aircraft's "view")
    let lookAtPoint = new THREE.Object3D()
    lookAtPoint.position.set(centerCurrentPos.x, centerCurrentPos.y, centerCurrentPos.z);
    lookAtPoint.position.add(new THREE.Vector3(0, 0, -100).applyQuaternion(normalRotateObject.quaternion))
    
    let lookAtCurrentPos = new THREE.Vector3();
    lookAtPoint.getWorldPosition(lookAtCurrentPos)

    //finally, we apply our "lookAt" here.
    pilotCamera.lookAt(lookAtCurrentPos.x, lookAtCurrentPos.y, lookAtCurrentPos.z)

    //move the position of the aircraft slightly in the direction it's pointing
    //this is the same thing that is done in the onclick method -- we first test to make sure that 
    //moving the aircraft's new location won't be above a certain point.
    //then, we can move the aircraft in that direction -- this time, slightly.
    let testObj = new THREE.Object3D();
    testObj.position.set(positionObject.position.x, positionObject.position.y, positionObject.position.z)
    testObj.position.add(new THREE.Vector3(0, 0, -0.25).applyQuaternion(normalRotateObject.quaternion))
    if (testObj.position.y <= 18){
        positionObject.position.add(new THREE.Vector3(0, 0, -0.25).applyQuaternion(normalRotateObject.quaternion))
    }

    //this will be calculation rotation:
    //we will start at the first location that hasn't been removed in the allInfo dict, 
    //and we will iterate over all of the groups
    for (let i = infoStartPos; i < Object.keys(allInfo).length; i++){
        //we get information about our current group 
        let infoGroup = allInfo[i]
        //we get the position, info about the normal, and
        //information about the vertices which we will use in calculating
        //what side of the face we're on .
        let pos = infoGroup[0]
        let normalInfo = infoGroup[1]
        let normals = normalInfo[0]
        let normalPoints = normalInfo[1]


        //first, we calculate the distance from our group to the center of the plane.
        let dist = Math.sqrt((pos.x - planeCenter.x)**2 + (pos.y - planeCenter.y)**2 + (pos.z - planeCenter.z)**2)

        //if this distance is close enough, then we will calculate for collision.
        if (dist <= 25){
            //we will iterate through all points on the bounding box
            for (let i = 0; i < globalNodePositions.length; i++){
                //the currentPos is just the bounding box position that we're currently 
                //looking t
                let currentPos = globalNodePositions[i]
                //this iterates through every normal on the face.
                for (let j = 0; j < normals.length; j++){
                    //we get the actual normal,
                    let normal = normals[j]
                    // and then we also get points that the we will rely on for our calculation
                    let normalPoint = normalPoints[j]
                    let B = normalPoint[0]
                    let A = normalPoint[1]
                    //for each of these, we need to calculate:
                    //(bounding box point - point on face)*(normal for that face)
                    //this will give us a number -- if the number is positive, 
                    //it indicates that we are on the outward side of the face
                    //otherwise, we are on the inward side of the face
                    let normalRes1 = Math.sign(subtract(currentPos, B).dot(normal[0]))
                    let normalRes2 = Math.sign(subtract(currentPos, B).dot(normal[1]))
                    let normalRes3 = Math.sign(subtract(currentPos, B).dot(normal[2]))
                    let normalRes4 = Math.sign(subtract(currentPos, A).dot(normal[3]))
                    //when all points are on the inward side of the fae, then we can say 
                    //that we are inside the box (collision)
                    if (normalRes1 == -1 && normalRes2 == -1 && normalRes3 == -1 && normalRes4 == -1){
                        //this will just show the restart screen
                        restart.style.display = "flex"
                        //and this will freeze to make sure that the user can't input any other plane commands.
                        frozen = true;

                    }else{
                    }
    
                }
            }

         }

    }  
    
    //this should happen every frame, so we will request another frame
	requestAnimationFrame( animate );

    //we will update the orbit controls
	controls.update();

    //and every frame, we need to update the scene using the current camera, which is 
    //just the camera that we have currently selected.
	renderer.render( scene, currCamera );

}

//when the restart button is clicked, it should take us to the restartFunc, which is defined below:
restart.onclick = () => restartFunc();

//this function will essentially restart the whole game
function restartFunc(){

    //first, it will reset the positions and rotations of the pivots
    pivot.position.set(-27.25, 7*2+4, -50)
    pivot2.position.set(19, 0, -50)
    pivot.rotation.set(0, 0, 0);
    pivot2.rotation.set(0, 0, 0);
    pivot.rotateZ(-Math.PI/2.8)
    pivot2.rotateZ(Math.PI/2.8)
    
    //then, it will reset the positions of the center object (controls tilt along z axis), of the 
    //normalRotateObject (controls rotation along x/y axis), and the position object (controls position)
    center.position.set(0, 6, 0)
    normalRotateObject.position.set(0, 0, 0)
    positionObject.position.set(0, 0, 0)
    center.rotation.set(0, 0, 0)
    normalRotateObject.rotation.set(0, 0, 0)
    positionObject.rotation.set(0, 0, 0)

    // console.log("reset here.")
    //every tetrahedron on the screen should be contained in the tetraList.
    //we will remove it
    for (let i = 0; i < tetraList.length; i++){
        let tetra = tetraList[i];
        //as shown before, we will remove the geometry completely, so that we aren't taking up memory
        tetra.geometry.dispose();
        //we will also remove the material completely, so that we aren't taking up memory
        tetra.material.dispose();
        //actually removing it from the scene
        scene.remove(tetra)
    }
    //removing the data structures used to save information about the tetrahedrons,
    //and for storing them
    allInfo = {}
    tetraList = []

    //resetting our camera, unfreezing the scene, and making the button visible again
    currCamera = camera;
    frozen = false;
    restart.style.display = "none";
    //regenerating the default mountain range
    populateStyle(pivot, pivot2, 2)
    // console.log("TESTER")
    // console.log(tetraList)
    // console.log(allInfo)
    //resetting the position of the camera, and making it look at the plane.
    camera.position.set(0, 40, 20)
    camera.lookAt(center);
}

//this will start the first call to animate, which will recursively call itself.
requestAnimationFrame( animate );

