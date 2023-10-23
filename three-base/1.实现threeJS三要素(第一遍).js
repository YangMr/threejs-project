import './style.css'

// 目标：three.js 三要素 (场景、相机、渲染器)
// 1. 下载并引入 three 库
// 2. 创建场景对象
// 3. 创建摄像机对象
// 参数1：垂直角度（建议 75），视野范围
// 参数2：宽高比（建议与画布相同宽高），物体绘制比例
// 参数3：近截面距离摄像机距离
// 参数4：远截面距离摄像机距离
// 4. 创建渲染器，并设置画布大小
// 5. 添加到 DOM 显示
// 6. 将摄像机与场景渲染的画布上面

// 1. 下载并导入整个 three.js核心库
import * as THREE from 'three';
let scene, camera, renderer

// 2. 创建场景
function createScene() {
    scene = new THREE.Scene();
}

// 3. 创建摄像机
function createCamera() {
    // 参数1：垂直角度（建议 75），视野范围
    // 参数2：宽高比（建议与画布相同宽高），物体绘制比例
    // 参数3：近截面距离摄像机距离
    // 参数4：远截面距离摄像机距离
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
}

// 4. 创建渲染器(画布)
function render() {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)
}

// 5. 添加到DOM
function addDOM() {
    document.body.append(renderer.domElement)
}

// 6. 初始化加载
function init() {
    createScene()
    createCamera()
    render()
    addDOM()
}
init()

