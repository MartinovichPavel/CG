const Rtext=document.getElementById("textR");
const Gtext=document.getElementById("textG");
const Btext=document.getElementById("textB");
const ColorPicker=document.getElementById("colorPicker");
const Rslider=document.getElementById("sliderR");
const Gslider=document.getElementById("sliderG");
const Bslider=document.getElementById("sliderB");
const Ctext=document.getElementById("textC");
const Mtext=document.getElementById("textM");
const Ytext=document.getElementById("textY");
const Ktext=document.getElementById("textK");
const Cslider=document.getElementById("sliderC");
const Mslider=document.getElementById("sliderM");
const Yslider=document.getElementById("sliderY");
const Kslider=document.getElementById("sliderK");
const Htext=document.getElementById("textH");
const Stext=document.getElementById("textS");
const Vtext=document.getElementById("textV");
const Hslider=document.getElementById("sliderH");
const Sslider=document.getElementById("sliderS");
const Vslider=document.getElementById("sliderV");

r=0;
g=0;
b=0;
h=0;
s=0;
v=0;
c=0;
m=0;
y=0;
k=100;

function changeColorPicker() {
    ColorPicker.value=`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;  
}
function RGB2CMYK() {
    let rperc=r/255.0;
    let bperc=b/255.0;
    let gperc=g/255.0;
    kperc=1-Math.max(rperc,bperc,gperc);
    k=Math.round(kperc*100);
    if (kperc!=1) {
    c=Math.round((1-rperc-kperc)/(1-kperc)*100);
    m=Math.round((1-gperc-kperc)/(1-kperc)*100);
    y=Math.round((1-bperc-kperc)/(1-kperc)*100);
    } else {
        c=0;
        m=0;
        y=0;
    }
}
function RGB2HSV() {
    let rperc=r/255.0;
    let bperc=b/255.0;
    let gperc=g/255.0;
    let Cmax=Math.max(rperc,gperc,bperc);
    let Cmin=Math.min(rperc,gperc,bperc);
    v=(Cmax*100).toFixed(1);
    if (Cmax==0) {
        h=0;
        s=0;
    } else {
        let delta=Cmax-Cmin;
        s=((delta/Cmax)*100).toFixed(1);
        let hperc=0;
        if (delta==0) {
            hperc=0;
        } else if (Cmax==rperc) {
            hperc=60*(((gperc-bperc)/delta+6.0)%6.0);
        } else if (Cmax==gperc) {
            hperc=60*((bperc-rperc)/delta+2.0);
        } else {
            hperc=60*((rperc-gperc)/delta+4.0);
        }
        h=hperc.toFixed(1);
    }
}
function CMYK2RGB() {
    let cperc=c/100.0;
    let mperc=m/100.0;
    let yperc=y/100.0;
    let kperc=k/100.0;
    r=Math.round(255*(1-cperc)*(1-kperc));
    b=Math.round(255*(1-mperc)*(1-kperc));
    g=Math.round(255*(1-yperc)*(1-kperc));
}
function HSV2RGB() {
    let C=v*s/10000.0;
    let X=C*(1-Math.abs(((h/60.0)%2.0-1.0)))
    let m=v/100.0-C;
    rperc=0;
    bperc=0;
    gperc=0;
    if (h<60) {
        rperc=C;
        gperc=X;
        bperc=0;
    } else if (h<120) {
        rperc=X;
        gperc=C;
        bperc=0;
    } else if (h<180) {
        rperc=0;
        gperc=C;
        bperc=X;
    } else if (h<240) {
        rperc=0;
        gperc=X;
        bperc=C;
    } else if (h<300) {
        rperc=X;
        gperc=0;
        bperc=C;
    } else {
        rperc=C;
        gperc=0;
        bperc=X;
    }
    r=Math.round((rperc+m)*255);
    g=Math.round((gperc+m)*255);
    b=Math.round((bperc+m)*255);
}
function RGB2Other() {
   RGB2CMYK();
   myCMYK();
   RGB2HSV();
   myHSV(); 
}

function HSV2Other() {
    HSV2RGB();
    myRGB();
    RGB2CMYK();
    myCMYK();
}
function CMYK2Other() {
    CMYK2RGB();
    myRGB();
    RGB2HSV();
    myHSV();
}
function myRGB() {
    Rtext.value=`${r}`;
    Gtext.value=`${g}`;
    Btext.value=`${b}`;
    sliderR.value=r;
    sliderG.value=g;
    sliderB.value=b;
    changeColorPicker();
}
function myHSV() {
    Htext.value=`${h}`;
    Stext.value=`${s}`;
    Vtext.value=`${v}`;
    sliderH.value=h;
    sliderS.value=s;
    sliderV.value=v;
}
function myCMYK() {
    Ctext.value=`${c}`;
    Mtext.value=`${m}`;
    Ytext.value=`${y}`;
    Ktext.value=`${k}`;
    sliderC.value=c;
    sliderM.value=m;
    sliderY.value=y;
    sliderK.value=k;
}
function myRtext() {
    if (Number(Rtext.value)!=NaN && Number(Rtext.value)>-1 && Number(Rtext.value)<256) {
        r=Number(Rtext.value);
    }
    Rtext.value=`${r}`;
    sliderR.value=r;
    changeColorPicker();
    RGB2Other();
}
function myGtext() {
    if (Number(Gtext.value)!=NaN && Number(Gtext.value)>-1 && Number(Gtext.value)<256) {
        g=Number(Gtext.value);
    }
    Gtext.value=`${g}`;
    sliderR.value=g;
    changeColorPicker();
    RGB2Other();
}
function myBtext() {
    if (Number(Btext.value)!=NaN && Number(Btext.value)>-1 && Number(Btext.value)<256) {
        b=Number(Btext.value);
    }
    Btext.value=`${b}`;
    sliderB.value=b;
    changeColorPicker();
    RGB2Other();
}
function myRSlider() {
    r=Math.round(sliderR.value);
    Rtext.value=`${r}`;
    changeColorPicker();
    RGB2Other();
}
function myGSlider() {
    g=Math.round(sliderG.value);
    Gtext.value=`${g}`;
    changeColorPicker();
    RGB2Other();
}
function myBSlider() {
    b=Math.round(sliderB.value);
    Btext.value=`${b}`;
    changeColorPicker();
    RGB2Other();
}
function myColorPicker() {
    r=parseInt(ColorPicker.value.slice(1,3),16);
    g=parseInt(ColorPicker.value.slice(3,5),16);
    b=parseInt(ColorPicker.value.slice(5,7),16);
    myRGB();
    RGB2Other();
}
function myHSlider() {
    h=Math.round(sliderH.value);
    Htext.value=`${h}`;
    changeColorPicker();
    HSV2Other();
}
function mySSlider() {
    s=Math.round(sliderS.value);
    Gtext.value=`${s}`;
    changeColorPicker();
    HSV2Other();
}
function myVSlider() {
    v=Math.round(sliderV.value);
    Vtext.value=`${v}`;
    changeColorPicker();
    HSV2Other();
}
function myHtext() {
    if (Htext.value.length>1 && Htext.value[Htext.value.length-1]=='.' && Htext.value[Htext.value.length-2]!='.' ) {
        return;
    }
    if (Number(Htext.value)!=NaN && Number(Htext.value)>-1 && Number(Htext.value)<361) {
        h=Number(Htext.value);
    }
    Htext.value=`${h}`;
    sliderH.value=h;
    changeColorPicker();
    HSV2Other();
}
function myStext() {
    if (Stext.value.length>1 && Stext.value[Htext.value.length-1]=='.' && Stext.value[Htext.value.length-2]!='.' ) {
        return;
    }
    if (Number(Stext.value)!=NaN && Number(Stext.value)>-1 && Number(Stext.value)<101) {
        s=Number(Stext.value);
    }
    Stext.value=`${s}`;
    sliderS.value=s;
    changeColorPicker();
    HSV2Other();
}
function myVtext() {
    if (Vtext.value.length>1 && Vtext.value[Htext.value.length-1]=='.' && Vtext.value[Htext.value.length-2]!='.' ) {
        return;
    }
    if (Number(Vtext.value)!=NaN && Number(Vtext.value)>-1 && Number(Vtext.value)<101) {
        v=Number(Vtext.value);
    }
    Vtext.value=`${v}`;
    sliderV.value=v;
    changeColorPicker();
    HSV2Other();
}
function myCtext() {
    if (Number(Ctext.value)!=NaN && Number(Ctext.value)>-1 && Number(Ctext.value)<101) {
        c=Number(Ctext.value);
    }
    Ctext.value=`${c}`;
    sliderC.value=c;
    changeColorPicker();
    CMYK2Other();
}
function myMtext() {
    if (Number(Mtext.value)!=NaN && Number(Mtext.value)>-1 && Number(Mtext.value)<101) {
        m=Number(Mtext.value);
    }
    Mtext.value=`${m}`;
    sliderM.value=m;
    changeColorPicker();
    CMYK2Other();
}
function myYtext() {
    if (Number(Ytext.value)!=NaN && Number(Ytext.value)>-1 && Number(Ytext.value)<101) {
        y=Number(Ytext.value);
    }
    Ytext.value=`${y}`;
    sliderY.value=y;
    changeColorPicker();
    CMYK2Other();
}
function myKtext() {
    if (Number(Ktext.value)!=NaN && Number(Ktext.value)>-1 && Number(Ktext.value)<101) {
        k=Number(Ktext.value);
    }
    Ktext.value=`${k}`;
    sliderK.value=k;
    changeColorPicker();
    CMYK2Other();
}
function myCSlider() {
    c=Math.round(sliderC.value);
    Ctext.value=`${c}`;
    changeColorPicker();
    CMYK2Other();
}
function myMSlider() {
    m=Math.round(sliderM.value);
    Mtext.value=`${m}`;
    changeColorPicker();
    CMYK2Other();
}
function myYSlider() {
    y=Math.round(sliderY.value);
    Ytext.value=`${y}`;
    changeColorPicker();
    CMYK2Other();
}
function myKSlider() {
    k=Math.round(sliderK.value);
    Ktext.value=`${k}`;
    changeColorPicker();
    CMYK2Other();
}