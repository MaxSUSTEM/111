
<!DOCTYPE html>
<html>
<head>
    <title>Three.js WebGL 1 Example</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>

    <script src="https://threejs.org/build/three.js"></script>
    <script>
        // 1. Создаем canvas и получаем WebGL 1 контекст
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            alert("WebGL 1 не поддерживается в вашем браузере.");
        }

        // 2. Создаем рендерер Three.js с использованием WebGL 1 контекста
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, context: gl });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 3. Создаем сцену, камеру и куб (как обычно)
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 4. Цикл анимации
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    </script>

</body>
</html>
