// 目标：立方体贴图：给六个面设置不同的图片
// 使用：
// 1.立方缓冲几何体

// 2.加载不同纹理图片并创建材质对象

// 3.创建网格物体并加入场景



import "./style.css"

// 引入three.js
import * as THREE from "three"

// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景、摄像机、渲染器(画布)的全局变量
let scene, camera, renderer
// 创建物体的全局变量
let cube
// 创建轨道控制器的全局变量
let controls

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
    //  创建图形
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 1. 加载不同纹理图片并创建材质对象 6 个,（x 正负，y 正负，z 正负）
    // const imgUrlArr = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']
    const imgUrlArr = ['x.jpg', '-x.jpg', 'y.jpg', '-y.jpg', 'z.jpg', '-z.jpg']
    // 2. 纹理加载器
    const textureLoader = new THREE.TextureLoader()

    // 设置当前纹理加载器公共的基础路径
    textureLoader.setPath('image/class/')

    // 创建材质
    const materialArr = imgUrlArr.map(item => {
        // 创建纹理图片对象
        const texture = textureLoader.load(item)
        return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
    })
    console.log("materialArr", materialArr)

    // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
    cube = new THREE.Mesh(geometry, materialArr);
    // 将物体添加到场景中
    scene.add(cube);
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

// 调用初始化加载场景与摄像机方法
init()

// 调用创建物体方法
createCube()

// 调用创建轨道控制器方法
createControl()

// 调用创建坐标轴方法
createHelper()

// 调用循环渲染方法
renderLoop()

// 调用3d场景适配方法
renderResize()