
let phase, amplitude, frequency, spacing, dotSize;

let t = 0; // 时间变量
let maxPointSize = 5; // 圆点的最大大小
let lineY = 0; // 直线的y坐标
let myInput; //variable for input field
let val; //variable for input value


//variables for sliders
let frequencySlider, spacingSlider, amplitudeSlider;
//variables for labels
let frequencyLabel, spacingLabel, amplitudeLabel;
let frequencyVal,spacingVal,amplitudeVal;

let blueButton,RedButton;

let distortionLayer;
let applyDistortionFlag = false;

let font;
//let mySound;

function preload() {
 font = loadFont('CourierPrime-Regular.ttf');
}

// function preload(){
//    mySound = loadSound("1.mp3");
// }


function setup() {
  createCanvas(windowWidth,windowHeight);
  frequency = 1; //frequency defines how often the wave repeats描述波浪重复的频率 (= 1/PERIOD)
  amplitude = 300; //amplitude defines the range波的高度 震动幅度
  phase = 0; //phase defines the starting position 开始位置
  spacing = 10; //spacing between points 点之间的距离
  //frameRate(1)
  pixelDensity(1); // 避免在高DPI屏幕上出现问题
  textFont(font);

  //输入框
  myInput = createInput(" ");
  myInput.position(29,175);
  //resize the input
  myInput.size(255);
  myInput.attribute('maxlength', '30'); //set maximum length for input field
  myInput.style('border', '1px solid rgb(0,255,0)');
  myInput.style('background-color', 'black');
  myInput.style('height', '30px');
  myInput.style('color', 'white');
 
  //滑动1myInput
  frequencySlider = createSlider(1,5,random(1,5));
  frequencySlider.position(12,240);
  frequencyLabel = createP("");
  frequencyLabel.position(150,10);
  //滑动2
  spacingSlider = createSlider(5,40,random(1,10));
  spacingSlider.position(12,270);
  spacingLabel = createP("");
  spacingLabel.position(150,10);

    //滑动2
    amplitudeSlider = createSlider(100,height-60,random(100,300));
    amplitudeSlider.position(12,300);
    amplitudeLabel = createP("");
    amplitudeLabel.position(150,10);

    // 蓝色按钮
   // blueButton.style('background-color', 'blue')；
    blueButton = createButton("BULE");
    blueButton.position(12,height-70);
    blueButton.mousePressed(() => {
      createDistortionLayer();
      applyDistortionFlag = true; // 开始应用干扰效果
    });

    //红色按钮
    RedButton = createButton("RED");
    RedButton.position(152,height-70);
    RedButton.style('background-color', 'rgb(81,32,44)'); 
    RedButton.mousePressed(() => {
      distortionLayer = null;
      applyDistortionFlag = false; // 停止应用干扰效果
    });
}

function draw() {
  background(0,10);
  val = myInput.value();
  frequencyVal = frequencySlider.value();
  spacingVal =spacingSlider.value();
  amplitudeVal = amplitudeSlider.value();
  //mySound.play();
  // push();
  // fill(0,255,0);
  //   //textAlign(CENTER);
  //   textSize(50);
  //   text("The Matrix Playground",15,400);
  //   pop();

    push();
    fill(0,255,0);
      //textAlign(CENTER);
      textSize(20);
      text("Type something here.",40,165);
      pop();
  

  // 点状背景
  push();
    noStroke();
  // 在整个画布上创建随机大小的圆点
  for (let y = 20; y < height-20; y += 7) {
    for (let x = 300; x < width-20; x += 15) {
      // 使用Perlin噪声计算圆点的大小
      let noiseVal = noise(x * 0.01, y * 0.01, t);
      let pointSize = noiseVal * maxPointSize;
      fill(0,255,20,20);

      // 绘制圆点
      rect(x, y, pointSize, pointSize);
    }
  }

  // 更新时间变量，以改变Perlin噪声的形状
  t += 0.01;
  pop();

  //主要循环
  push();
  translate(0, height / 2);
  //loop through the coordinates on x-axis
  for (let x = 310; x < width-30; x += spacingVal) {
    //calculate the angle based on x position: 根据x的位置计算角度
    //fit the entire wave from 0 to 2*PI in the width of the canvas
    let angle = map(x, 0, width-30, 0, TWO_PI);
    //calculate the y coordinate for each point
    let y = sin(angle * frequencyVal + phase) * amplitudeVal;
    //draw a circle
    let c = map(sin(angle), -1, 1, 0, 255);
    //fill(0,c,0);
    noFill();

    for(let i =0;i<width/2;i=i+100){
        //rect(x+i,y,10);
      //text(floor(random(2)), x+i, y);
      text(val, x+i, y);
     }

    //rect(x+100,y,10);
    //text(floor(random(2)), x + 50, y);
    //ellipse(x + 200, y, 10);
    ellipse(x, -y, 10);
    ellipse(x, y, 10);
    //ellipse(x - 100, y, 10);
    //ellipse(x - 200, y, 10);
    stroke(0, c, 0);
    beginShape();
    //vertex(x + 100, y);
    //vertex(x + 200, y);
    endShape();
  }
  //move the wave along by changing phase
  phase += 0.03;
  
  pop();
  
    //直线
  push();
  stroke(0,255,0,80);
  // 绘制水平直线
  line(300, lineY, width-20, lineY);

  // 更新直线的y坐标，以模拟滚动
  lineY += 2;

  // 如果直线滚动到屏幕底部，重新从屏幕顶部开始
  if (lineY > height-20) {
    lineY = 0;
  }
  pop();

    //背景布局
    push()
    noFill()
    stroke(0,255,0);
    strokeWeight(10)
    rect(300,20,windowWidth-320,windowHeight-40)
    rect(20,20,280,200);
    pop()
    push()
    stroke(0);
    noFill()
    strokeWeight(29)
    rect(0,0,windowWidth,windowHeight);
    pop();

    // 持续应用干扰效果
  if (applyDistortionFlag) {
    applyDistortion();
  }

  // 绘制图层
  if (distortionLayer) {
    image(distortionLayer, 0, 0);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createDistortionLayer() {
  distortionLayer = createGraphics(width, height);

  distortionLayer.background(255); // 设置图层背景为白色
  distortionLayer.pixelDensity(1);
}


function applyDistortion() {


  if (distortionLayer) {
    distortionLayer.loadPixels();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // 在整个图层内应用干扰效果
        if (x < windowWidth-20 && x>300 && y < windowHeight-20 && y>20){
        let index = (x + y * width) * 4;
        if (random() < 0.01) {
          distortionLayer.pixels[index] = 0; // 红色通道
          distortionLayer.pixels[index + 1] = floor(random(255)); // 绿色通道
          distortionLayer.pixels[index + 2] = 0; // 蓝色通道
          distortionLayer.pixels[index + 3] = 255; // 不透明
        }
      }
      }
    }
    distortionLayer.updatePixels();
  }
  push()
  rectMode(CENTER);
  fill(0);
  stroke(0,255,0);
  strokeWeight(3)
  rect((windowWidth+300)/2,windowHeight/2,300,50);
  pop();
push();
fill(0,255,0);
  textAlign(CENTER);
  textSize(30);
  text("SYSTEM FAILURE",(windowWidth+300)/2,windowHeight/2+10);
  pop();

}
