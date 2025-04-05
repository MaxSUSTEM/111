<!DOCTYPE html>
<html>
<head>
    <title>Three.js Cube with Mouse Camera Control</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>

    <script src="https://threejs.org/build/three.js"></script>
    <script src="https://threejs.org/examples/js/controls/OrbitControls.js"></script>

    <script>
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Cube geometry
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false }); // Fixed wireframe value
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // OrbitControls (Mouse Camera Control)
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;

        // WASD movement
        const moveSpeed = 0.1;
        const keys = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        };

        document.addEventListener('keydown', (event) => {
            keys[event.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (event) => {
            keys[event.key.toLowerCase()] = false;
        });

        function updateCubePosition() {
            if (keys['w']) {
                cube.position.z -= moveSpeed;
            }
            if (keys['s']) {
                cube.position.z += moveSpeed;
            }
            if (keys['a']) {
                cube.position.x -= moveSpeed;
            }
            if (keys['d']) {
                cube.position.x += moveSpeed;
            }
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            updateCubePosition();
            controls.update();

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resizing
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        });

    </script>

</body>
</html>
