import './style.css'

/**
 * 目标: 借助 GUI 工具辅助调试 3D 物体
 * 作用: 使用图形界面调整物体参数等
 * 步骤: 
 * 1.下载并引入 dat.gui 
 * 2.创建 GUI 对象
 * 3.添加具体控制器
 * 
*/

import * as THREE from "three"

// 1. 引入轨道控制器构造函数
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 引入dat.gui
import * as dat from 'dat.gui';



let scene, camera, renderer
let controls
let cube

// 初始化加载场景与摄像机
function init() {
    // 创建场景
    scene = new THREE.Scene()

    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 改变摄像机z轴的位置, 把摄像机向后移动5个单位(移动摄像机向 z 轴5个单位, 默认摄像机和物体的坐标轴都在原点)
    camera.position.z = 5

    // 创建渲染器
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
    // 1. 创建图形，宽高深为 1 单位 (创建立方缓冲几何体)
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // 2. 创建材质，颜色为绿色 0x00ff00 
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // 3. 创建网格物体对象，传入图形和材质
    cube = new THREE.Mesh(geometry, material);

    //4. 把物体加入到场景中
    scene.add(cube)
}

// 2. 创建轨道控制器
function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    // 开启阻尼效果
    controls.enableDamping = true
    // 开启轨道控制器自动旋转
    // controls.autoRotate = true
    // 设置轨道控制器自动旋转的速度
    // controls.autoRotateSpeed = 100.0
    // 设置垂直旋转角度的上限
    // controls.maxPolarAngle = Math.PI
    // 设置垂直旋转角度的下限
    // controls.minPolarAngle = 1.5

    // 设置水平旋转角度的上限
    // controls.maxAzimuthAngle = 1.5 * Math.PI
    // 设置水平旋转角度的下限
    // controls.minAzimuthAngle = 0.5 * Math.PI

    // 设置摄像机向外移动的距离
    controls.maxDistance = 20
    // 设置摄像机向内移动的距离
    controls.minDistance = 3
}

// 3. 在循环渲染中更新场景
function renderLoop() {
    // 循环渲染(根据当前计算机浏览器刷新帧率,(默认60次 / 秒), 不断调用此函数渲染最新画面状态, )
    // 好处是: 当前页面切换到后台, 暂停递归
    requestAnimationFrame(renderLoop);

    // cube.rotation.x += 0.1

    // 更新(手动js代码更新摄像机信息,必须调用轨道控制器 update 方法)
    controls.update();

    // 将场景和摄像机渲染到画布
    renderer.render(scene, camera);
}

// 1. 创建坐标轴
function createHelper() {
    //  创建坐标轴
    const axesHelper = new THREE.AxesHelper(10)
    // 将坐标轴添加到场景中
    scene.add(axesHelper)
}

// 1. 创建适配方法, 方法作用: 浏览器发生变化, 画布大小随着浏览器的变化而变化
function renderResize() {
    window.addEventListener("resize", () => {
        // 重新设置画布大小
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 重新设置摄像机宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        // 重新更新锥体空间
        camera.updateProjectionMatrix()
    })
}

// 1. 移动物体
function moveCube() {
    // 在x轴进行移动
    cube.position.x = 10
    // 设置物体渲染
    // cube.rotation.x = Math.PI / 6
    // 设置物体缩放 x y z, 缩放 scale 属性（Vector3 三维向量对象，中心原点不动，向 2 边拉伸/缩小）
    cube.scale.z = 0.5
}

// 1. 创建GUI工具
function createGUI() {
    // 2. 创建gui对象
    const gui = new dat.GUI();
    // 3. 添加具体控制器
    // 添加一个标题控制器
    gui.add(document, "title")
    // 控制物体显示或者隐藏
    gui.add(cube, "visible")
    // 重置轨道控制器
    gui.add(controls, 'reset')
    console.log('cube', cube)
    // 添加颜色
    const colorObj = {
        "col": `#${cube.material.color.getHexString()}`
    }
    gui.addColor(colorObj, "col").onChange((val) => {
        console.log("val", val)
        cube.material.color = new THREE.Color(val)
    })

    // 添加分组
    const group = gui.addFolder("位移")
    // 参数3：最小值范围，参数4：最大值范围，参数5：步长 （数字->进度条）
    group.add(cube.position, "x", 0, 10, 1)
    group.add(cube.position, "y", 0, 10, 1)
    group.add(cube.position, "z", 0, 10, 1)

    // 3.5 下拉菜单(关键：第三个参数为对象时->下拉菜单)
    // 对象中属性名->下拉菜单选项名
    // 初始值匹配后会影响下拉菜单默认选中哪一项
    gui.add({ type: "1" }, "type", { '方案1': '1', '方案2': '2' }).onChange((val) => {
        console.log("val", val)
        switch (val) {
            case "1":
                cube.position.x = 10
                break;
            case "2":
                cube.position.x = 5
                break;
        }
    })
}

// 调用初始化加载场景与摄像机方法
init()

// 调用创建立方体方法
createCube()

// 调用创建轨道控制器方法
createControls()

// 调用创建坐标轴方法
createHelper()

// 调用移动物体方法
moveCube()

// 调用循环渲染中更新场景方法
renderLoop()

// 调用创建GUI工具
createGUI()

// 调用适配方法
renderResize()




