import './style.css'

// 目标：three.js 绘制立方体
// 1. 创建图形，宽高深为 1 单位
// 2. 创建材质，颜色为绿色 0x00ff00 
// 3. 创建网格物体对象，传入图形和材质
// 4. 把物体加入到场景中
// 注意1：摄像机需要拉远一些才能看到物体
// 注意2：渲染器需要调用 render 才能渲染画面（等待物体添加到场景后，再调用）

import * as THREE from "three"

let scene, camera, renderer

// 初始化加载场景与摄像机
function init() {
    // 创建场景
    scene = new THREE.Scene()

    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 改变摄像机z轴的位置, 把摄像机向后移动5个单位(移动摄像机向 z 轴5个单位, 默认摄像机和物体的坐标轴都在原点)
    camera.position.z = 2


    // 创建渲染器
    renderer = new THREE.WebGLRenderer()

    // 设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 将画布添加到DOM
    document.body.append(renderer.domElement)
}

// 创建立方体
function createCube() {
    // 1. 创建图形，宽高深为 1 单位 (创建立方缓冲几何体)
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // 2. 创建材质，颜色为绿色 0x00ff00 
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // 3. 创建网格物体对象，传入图形和材质
    const cube = new THREE.Mesh(geometry, material);


    // 4. 把物体加入到场景中
    scene.add(cube)

}

// 调用初始化加载场景与摄像机方法
init()

// 调用创建立方体方法
createCube()



// 将场景和摄像机渲染到画布
renderer.render(scene, camera)