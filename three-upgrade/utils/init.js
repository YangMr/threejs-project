// 目标: 场景、摄像机、渲染器、坐标轴、轨道控制器、循环渲染, 2d转3d文本渲染方法, 场景适配

// 引入threejs
import * as THREE from "three"

// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 2d转3d文本渲染方法
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';

// 声明全局变量
export let scene, camera, renderer, controls, css3dRenderer

// 初始化场景、摄像机、渲染器
(function init() {
    // 场景
    scene = new THREE.Scene();

    // 摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 设置摄像机位置
    camera.position.z = 10

    // 渲染器
    renderer = new THREE.WebGLRenderer({
        // 抗锯齿
        antialias: true
    })

    // 渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 添加到DOM
    document.body.appendChild(renderer.domElement)
})();

// 初始化坐标轴
(function createHelper() {
    // 创建坐标轴
    const axelHelper = new THREE.AxesHelper(5)
    // 添加到场景
    scene.add(axelHelper)
})();

// 初始化轨道控制器
(function createControl() {
    // 创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)

    // 开启阻尼效果
    controls.enableDamping = true
})();

// 初始化2d转3d的dom渲染方法
(function css3dRender() {
    // 创建文本3d渲染器
    css3dRenderer = new CSS3DRenderer();
    // 设置文本渲染器的大小
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    // 默认去除dom事件
    css3dRenderer.domElement.style.pointerEvents = "none"
    // 设置固定定位
    css3dRenderer.domElement.style.position = "fixed"
    // 设置距离左侧间距为0
    css3dRenderer.domElement.style.left = "0"
    // 设置距离上侧间距为0
    css3dRenderer.domElement.style.top = "0"
    // 添加到body中
    document.body.appendChild(css3dRenderer.domElement)
})();


// 循环渲染
(function renderLoop() {

    // 更新轨道控制器场景
    controls.update()

    // 将场景与摄像机渲染到渲染器上
    renderer.render(scene, camera)

    // 将场景与摄像机渲染到3D dom渲染器上
    css3dRenderer.render(scene, camera)

    // 循环更新
    requestAnimationFrame(renderLoop)

})();


// 场景适配
(function resizeRender() {
    window.addEventListener("resize", () => {
        //  重新设置3d渲染器画布大小
        renderer.setSize(window.innerWidth, window.innerHeight)
        //  重新设置3d dom渲染器画布大小
        css3dRenderer.setSize(window.innerWidth, window.innerHeight)
        // 重新设置摄像机宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        // 重新更新锥体空间
        camera.updateProjectionMatrix()
    })
})();