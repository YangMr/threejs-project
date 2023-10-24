// 目标：使用 three.js 提供的附加组件 Stats，实现网页性能监视，辅助调试项目
// 使用：

// 1.单独引入 Stats 附加组件

// 2.创建性能监视器

// 3.设置监视器面板类型（0， 1， 2）

// 4.设置监视器位置并添加 DOM



import "./style.css"

// 引入three.js
import * as THREE from "three"

// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入性能监视器的stats组件
import Stats from 'three/examples/jsm/libs/stats.module.js'

// 创建场景、摄像机、渲染器(画布)的全局变量
let scene, camera, renderer
// 创建物体的全局变量
let cube
// 创建轨道控制器的全局变量
let controls
// 创建性能监视器全局变量
let stats

// 初始化加载场景与摄像机
function init() {
    //  创建场景
    scene = new THREE.Scene()

    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


    camera.position.z = 5


    // 创建渲染器(画布 canvas)
    renderer = new THREE.WebGLRenderer({
        // 开启抗锯齿
        antialias: true
    })

    // 设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight)


    // 将画布添加到DOM
    document.body.append(renderer.domElement)

}

// 创建立方体
function createCube() {
    // 创建一个数组, 保存多个立方体的数据
    const cubeInfoArr = []

    // 问题: 生成一个随机到0-255的数字
    // let random = Math.floor(Math.random() * (255 - 0 + 1) + 0)
    // console.log("random", random)
    for (let i = 0; i < 5; i++) {

        const obj = {
            color: `rgb(${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)})`,
            w: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            h: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            d: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            x: Math.floor(Math.random() * (5 - -5 + 1) + -5),
            y: Math.floor(Math.random() * (5 - -5 + 1) + -5),
            z: Math.floor(Math.random() * (5 - -5 + 1) + -5),
        }
        cubeInfoArr.push(obj)
    }

    console.log('cubeInfoArr', cubeInfoArr)

    cubeInfoArr.map(item => {
        // 创建图形
        const geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        // 创建材质
        const material = new THREE.MeshBasicMaterial({ color: item.color });
        // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
        cube = new THREE.Mesh(geometry, material);
        // 设置立方体的坐标
        cube.position.set(item.x, item.y, item.z)
        // 将物体添加到场景中
        scene.add(cube);
    })

    //  创建图形
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建材质
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
    // cube = new THREE.Mesh(geometry, material);

    // 将物体添加到场景中
    // scene.add(cube);

}

// 创建轨道控制器
function createControl() {
    //  创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    // 开启阻尼效果
    controls.enableDamping = true
}

// 创建循环渲染方法
function renderLoop() {
    // 循环渲染
    requestAnimationFrame(renderLoop)
    // 手动更新场景(调用控制器的update方法)
    controls.update()
    // 手动更新性能监视器
    stats.update()
    // 将场景与摄像机渲染到画布上
    renderer.render(scene, camera)
}

// 创建坐标轴
function createHelper() {
    const axesHelper = new THREE.AxesHelper(10)
    scene.add(axesHelper)
}

// 创建场景适配适配方法
function renderResize() {
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })
}

// 创建性能监视器方法
function createStats() {
    // 实例化性能监视器方法
    stats = new Stats()

    // 3. 设置监视器面板类型（0：fps-每秒传输帧数，1：ms-每帧刷新用时，2：mb-内存占用）
    stats.setMode(0)
    stats.domElement.position = "fixed"
    stats.domElement.style.left = "0"
    stats.domElement.style.top = "0"
    document.body.appendChild(stats.domElement)
}

// 调用初始化加载场景与摄像机方法
init()

// 调用创建物体方法
createCube()

// 调用创建轨道控制器方法
createControl()

// 调用创建坐标轴方法
createHelper()

// 调用性能监视器方法
createStats()

// 调用循环渲染方法
renderLoop()



// 调用3d场景适配方法
renderResize()