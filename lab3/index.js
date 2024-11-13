var myScale=24;
const myCanvas=document.getElementById("myCanvas");
const myHeight=myCanvas.height;
const myWidth=myCanvas.width;
const myContext=myCanvas.getContext("2d");
const text1=document.getElementById("textInput1");
const text2=document.getElementById("textInput2");
const text3=document.getElementById("textInput3");
const text4=document.getElementById("textInput4");
const text1Label=document.getElementById("textLabel1");
const text2Label=document.getElementById("textLabel2");
const text3Label=document.getElementById("textLabel3");
const text4Label=document.getElementById("textLabel4");
const selectOption=document.getElementById("selectOption");
const logger=document.getElementById("log");
const style4=text4.style.display;
var textValues=["0","0","0","0",];
var myDelay=0;
function drawAxis(scale) {
    myScale=scale;
    myContext.clearRect(0,0,myWidth,myHeight)
    myContext.strokeStyle = "rgb(50 50 50 / 100%)";
    myContext.lineWidth=1;
    for (let i=0; i<myHeight/2; i+=myScale) {
        myContext.beginPath();
        myContext.moveTo(0,myHeight/2+i);
        myContext.lineTo(myWidth,myHeight/2+i);
        myContext.stroke();
        myContext.beginPath();
        myContext.moveTo(0,myHeight/2-i);
        myContext.lineTo(myWidth,myHeight/2-i);
        myContext.stroke();
    }
    for (let i=0; i<myWidth/2; i+=myScale) {
        myContext.beginPath();
        myContext.moveTo(myWidth/2+i,0);
        myContext.lineTo(myWidth/2+i,myHeight);
        myContext.stroke();
        myContext.beginPath();
        myContext.moveTo(myWidth/2-i,0);
        myContext.lineTo(myWidth/2-i,myHeight);
        myContext.stroke();
    }
    myContext.strokeStyle = "rgb(0 0 0 / 100%)";
    myContext.lineWidth=2;
    myContext.beginPath();
    myContext.moveTo(0,myHeight/2);
    myContext.lineTo(myWidth,myHeight/2);
    myContext.stroke();

    myContext.beginPath();
    myContext.moveTo(myWidth/2,0);
    myContext.lineTo(myWidth/2,myHeight);
    myContext.stroke();

    myContext.beginPath();
    myContext.moveTo(myWidth/2,0);
    myContext.lineTo(myWidth/2-10,10);
    myContext.lineTo(myWidth/2+10,10);
    myContext.fill()

    myContext.beginPath();
    myContext.moveTo(myWidth,myHeight/2);
    myContext.lineTo(myWidth-10,myHeight/2-10);
    myContext.lineTo(myWidth-10,myHeight/2+10);
    myContext.fill()

    myContext.font="15px serif"
    myContext.fillStyle="rgb(0 0 0 / 100%)";
    for (let i=0; i<myHeight/2; i+=myScale) {
        myContext.beginPath();
        myContext.moveTo(myWidth/2-5,myHeight/2+i);
        myContext.lineTo(myWidth/2+5,myHeight/2+i);
        myContext.stroke();
        myContext.beginPath();
        myContext.moveTo(myWidth/2-5,myHeight/2-i);
        myContext.lineTo(myWidth/2+5,myHeight/2-i);
        myContext.stroke();
        if (i!=0) {
        myContext.fillText("-"+Math.round(i/myScale),myWidth/2+5,myHeight/2+i+5);
        myContext.fillText(Math.round(i/myScale),myWidth/2+5,myHeight/2-i+5);
        }
    }
    for (let i=0; i<myHeight/2; i+=myScale) {
        myContext.beginPath();
        myContext.moveTo(myWidth/2+i,myHeight/2-5);
        myContext.lineTo(myWidth/2+i,myHeight/2+5);
        myContext.stroke();
        myContext.beginPath();
        myContext.moveTo(myWidth/2-i,myHeight/2-5);
        myContext.lineTo(myWidth/2-i,myHeight/2+5);
        myContext.stroke();
        if (i!=0) {
        myContext.fillText("-"+Math.round(i/myScale),myWidth/2-i-3,myHeight/2+20);
        myContext.fillText(Math.round(i/myScale),myWidth/2+i-3,myHeight/2+20);
        }
    }
}
function log(str) {
    let str2=logger.value.split('\n');
    let newtext=str2.reverse().slice(0,40);
    logger.value=newtext.reverse().join('\n')+"\n"+str;
}
function changeScale() {
    const mySlider=document.getElementById("mySlider");
    const labelScale=document.getElementById("scaleLabel");
    labelScale.innerText=`Scale: ${Number(mySlider.value)}`;
    drawAxis(Number(mySlider.value))
    log(`Scale changed`);
}
function changeDelay() {
    const mySlider=document.getElementById("mySliderSleep");
    const labelDelay=document.getElementById("delayLabel");
    myDelay=Number(mySlider.value)*2;
    labelDelay.innerText=`Delay: ${myDelay}ms`;
    log(`Delay changed`);
}
function delay() {
    return new Promise(resolve => setTimeout(resolve, myDelay));
  }
function drawSquare(x,y,color) {
    myContext.fillStyle=color;
    myContext.fillRect(x*myScale+myWidth/2,-y*myScale+myHeight/2-myScale,myScale,myScale);
    log(`Draw square at ${x}, ${y}`);
}
drawAxis(myScale)

function restrictText(num) {
    let text=document.getElementById("textInput"+(num+1));
    if (text.value=="0-") {
        text.value="-";
        return;
    }
    if (text.value=="-") {
        text.value="0";
        return;
    }
    if (Number(text.value)!=NaN && Number(text.value)<100 && Number(text.value)>-100) {
        textValues[num]=Number(text.value);
    }
    text.value=`${textValues[num]}`;
}
async function stepByStep(x1,y1,x2,y2) {
    if (Math.abs(y1-y2)>Math.abs(x1-x2)) {
        min=Math.min(y1,y2)
        k=(x2-x1)/(y2*1.0-y1);
        b=x1-k*y1;
        for (let i=0;i<=Math.abs(y1-y2);i++) {
            drawSquare(Math.round((min+i)*k+b),min+i,"rgb(0 0 0 / 100%)");
            await delay();
        }
    } else {
        min=Math.min(x1,x2)
        k=(y2-y1)/(x2*1.0-x1);
        b=y1-k*x1;
        for (let i=0;i<=Math.abs(x1-x2);i++) {
            drawSquare(min+i,Math.round((min+i)*k+b),"rgb(0 0 0 / 100%)");
            await delay();
        }
    }
}
function run() {
    const selectedIndex=selectOption.selectedIndex;
    switch (selectedIndex) {
        case 0:
            stepByStep(Number(text1.value),Number(text2.value),Number(text3.value),Number(text4.value));
        break;
        case 1:
            BresenhamLine(Number(text1.value),Number(text2.value),Number(text3.value),Number(text4.value));
        break;
        case 2:
            DDA(Number(text1.value),Number(text2.value),Number(text3.value),Number(text4.value));
        break;
        case 3:
            BresenhamCircle(Number(text1.value),Number(text2.value),Number(text3.value));
        break;
        case 4:
            Vu(Number(text1.value),Number(text2.value),Number(text3.value),Number(text4.value));
        break;
    }
}

async function BresenhamLine(x1,y1,x2,y2) {
    log("Bresenham method started");
    let yRise=false
    if (Math.abs(y1-y2)>Math.abs(x1-x2)) {
        yRise=true;
        temp=x1;
        x1=y1;
        y1=temp;
        temp=x2;
        x2=y2;
        y2=temp;          
    }
    let downLine=false;
    if ((x2-x1)*(y2-y1)<0) {
        downLine=true;
    }
    let x=Math.min(x1,x2);
    if (downLine) {
        y=Math.max(y1,y2);
    } else {
        y=Math.min(y1,y2);
    }
    let xEnd=Math.max(x1,x2);
    let dx=xEnd-x;
    let dy=Math.max(y1,y2)-Math.min(y1,y2);
    let error=dx/2;
    for (let i=x;i<=xEnd;i++) {
        if (yRise) {
            drawSquare(y,i,"rgb(0 0 0 / 100%)");
        } else {
            drawSquare(i,y,"rgb(0 0 0 / 100%)");
        }
        error-=dy;
        if (error<0) {
            error+=dx;
            if (downLine) {
                y--;
            } else {
                y++;
            }
        }
        await delay();
    }
    log("Bresenham method finished");
}
async function DDA(x1,y1,x2,y2) {
    log("DDA method started");
    let l=Math.max(Math.abs(x1-x2),Math.abs(y1-y2));
    xl=(x2-x1)*1.0/l;
    yl=(y2-y1)*1.0/l;
    x0=x1*1.0;
    y0=y1*1.0;
    for (let i=0;i<=l;i++) {
        drawSquare(Math.round(x0),Math.round(y0),"rgb(0 0 0 / 100%)");
        x0+=xl;
        y0+=yl;
        await delay();
    }
    log("DDA method finished");
}
async function BresenhamCircle(x1,y1,r) {
    log("Bresenham circle method started");
    y=r;
    x=0;
    error=3-2*r;
    while (x<=y) {
        drawSquare(x1+x,y1+y);
        await delay();
        drawSquare(x1+x,y1-y);
        await delay();
        drawSquare(x1-x,y1+y);
        await delay();
        drawSquare(x1-x,y1-y);
        await delay();
        drawSquare(x1+y,y1+x);
        await delay();
        drawSquare(x1-y,y1+x);
        await delay();
        drawSquare(x1+y,y1-x);
        await delay();
        drawSquare(x1-y,y1-x);
        await delay();
        if (error>0) {
        error=error+4*(x-y)+10;
        x+=1;
        y-=1;
        } else {
            error=error+4*x+6;
            x=x+1;
        }
    }
    log("Bresenham circle method ended");
}
function selectChange() {
    const selectedIndex=selectOption.selectedIndex;
    if (selectedIndex==3) {
        text4.style.display="none";
        text1Label.innerText="x:";
        text2Label.innerText="y:";
        text3Label.innerText="r:";
        text4Label.innerText="";
    } else {
        text4.style.display=style4;
        text1Label.innerText="x1:";
        text2Label.innerText="y1:";
        text3Label.innerText="x2:";
        text4Label.innerText="y2:";
    }
}
function trunc(x) {
    if (x>=0) {
        return Math.trunc(x);
    } else {
        if (Math.trunc(x)-x==0) {
            return Math.trunc(x);
        } else {
        return Math.trunc(x)-1;
        }
    }
}
async function Vu(x1,y1,x2,y2) {
    log("Vu method started");
    if (Math.abs(x2-x1)<Math.abs(y2-y1)) {
    if (y1>y2) {
        let temp=x1;
        x1=x2;
        x2=temp;
        temp=y1;
        y1=y2;
        y2=temp;
    }
    drawSquare(x1,y1,"rgb(0,0,0 / 100%)");
    drawSquare(x2,y2,"rgb(0,0,0 / 100%)");
    grad=(x2-x1)*1.0/(y2-y1);
    let intery=x1+grad;
    for (let i=y1+1;i<y2;i++) {
        let light=Math.round((intery-trunc(intery))*100);
        if (light>90) {
            light=90;
        }
        drawSquare(trunc(intery),i,`rgb(0 0 0 / ${100-light+10}%)`);
        drawSquare(trunc(intery)+1,i,`rgb(0 0 0 / ${light+10}%)`);
        intery+=grad;
        await delay();
    }
   } else {
    if (x1>x2) {
        let temp=x1;
        x1=x2;
        x2=temp;
        temp=y1;
        y1=y2;
        y2=temp;
    }
    drawSquare(x1,y1,"rgb(0,0,0 / 100%)");
    drawSquare(x2,y2,"rgb(0,0,0 / 100%)");
    grad=(y2-y1)*1.0/(x2-x1);
    let intery=y1+grad;
    for (let i=x1+1;i<x2;i++) {
        let light=Math.round((intery-trunc(intery))*100);
        if (light>90) {
            light=90;
        }
        drawSquare(i,trunc(intery),`rgb(0 0 0 / ${100-light+10}%)`);
        drawSquare(i,trunc(intery)+1,`rgb(0 0 0 / ${light+10}%)`);
        intery+=grad;
        await delay();
    }
   }
   log("Vu method ended");
}
