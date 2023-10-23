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
// 5. 将摄像机与场景渲染的画布上面
// 6. 添加到 DOM 显示

// 1. 引入threejs
import * as THREE from "three"

// 定义全局变量, 保存摄像机实例、场景实例、渲染器(画布)的实例
let scene, camera, renderer

// 初始化加载场景与相机
function init() {
    // 2. 创建场景对象
    scene = new THREE.Scene();

    // 3. 创建摄像机(透视摄像机)
    // * 参数1: 垂直角度(建议75), 视野范围
    // * 参数2: 宽高比(建议与画布相同宽高), 物体绘制比例
    // * 参数3: 近截面距离摄像机距离
    // * 参数4: 远截面距离摄像机距离
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 4. 创建渲染器, 并设置画布大小 (创建canvas标签)
    renderer = new THREE.WebGLRenderer()
    // 设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 5. 将摄像机与场景渲染到画布上面(传入场景与摄像机, 并渲染到画面)
    renderer.render(scene, camera)

    // 6. 添加到DOM
    document.body.append(renderer.domElement)
}

// 调用初始化加载场景与相机的方法
init()
