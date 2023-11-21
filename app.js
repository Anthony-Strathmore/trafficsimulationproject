import * as THREE from 'three';



// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Load external OBJ model
const loader = new THREE.OBJLoader();

// Array to store 3D objects
const objects = [];

// Load multiple OBJ models
loader.load('Body.obj', (object) => {
    objects.push(object);
    scene.add(object);
});

loader.load('Skeleton.obj', (object) => {
    objects.push(object);
    // Initially hide this object
    object.visible = false;
    scene.add(object);
});

let currentObjectIndex = 0;

function toggleObject() {
    // Hide the current object
    objects[currentObjectIndex].visible = false;

    // Increment the index and wrap around if needed
    currentObjectIndex = (currentObjectIndex + 1) % objects.length;

    // Show the new current object
    objects[currentObjectIndex].visible = true;
}


// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Set up camera position
camera.position.z = 5;

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the human body
    humanBody.rotation.x += 0.01;
    humanBody.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}

animate();
