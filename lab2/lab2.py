from flask import Flask, render_template, request, send_file
import numpy as np
from PIL import Image
import io
import cv2
app = Flask(__name__)

@app.route("/")
def main():
   return render_template('index.html')
@app.route("/img/", methods=['POST'])
def renderImages():
    index=request.form.get('renderIndex')
    imgstr = request.files.get('image','').read()
    imgbytes=np.fromstring(imgstr, np.uint8)
    img = cv2.imdecode(imgbytes, cv2.IMREAD_COLOR)
    if (index=="0"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGBA2GRAY)
        text1=request.form.get('text1')
        text2=request.form.get('text2')
        text3=request.form.get('text3')
        try:
            m=float(text1)
        except ValueError:
            m=255
        try:
            b=int(text2)
            if (b%2==0): 
                b=21
        except ValueError:
            b=21
        try:
            c=float(text3)
        except ValueError:
            c=10
        img=cv2.adaptiveThreshold(gray, m,
	cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, b, c)
    elif(index=="1"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGBA2GRAY)
        text1=request.form.get('text1')
        text2=request.form.get('text2')
        text3=request.form.get('text3')
        try:
            m=float(text1)
        except ValueError:
            m=255
        try:
            b=int(text2)
            if (b%2==0): 
                b=7
        except ValueError:
            b=7
        try:
            c=float(text3)
        except ValueError:
            c=0.1
        img=cv2.ximgproc.niBlackThreshold(gray,m,cv2.THRESH_BINARY,b,c)

    elif(index=="2"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGBA2GRAY)
        kernel1=np.array([[-1,-1,-1],[-1,8,-1],[-1,-1,-1]])
        img=cv2.convertScaleAbs(cv2.filter2D(src=gray,ddepth=-1,kernel=kernel1))
    elif(index=="3"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
        kernel1=np.array([[-1,-1,-1],[2,2,2],[-1,-1,-1]])
        kernel2=np.array([[-1,2,-1],[-1,2,-1],[-1,2,-1]])
        kernel3=np.array([[2,-1,-1],[-1,2,-1],[-1,-1,2]])
        kernel4=np.array([[-1,-1,2],[-1,2,-1],[2,-1,-1]])
        abs1=cv2.convertScaleAbs(cv2.filter2D(gray,ddepth=-1,kernel=kernel1))
        abs2=cv2.convertScaleAbs(cv2.filter2D(gray,ddepth=-1,kernel=kernel2))
        abs3=cv2.convertScaleAbs(cv2.filter2D(gray,ddepth=-1,kernel=kernel3))
        abs4=cv2.convertScaleAbs(cv2.filter2D(gray,ddepth=-1,kernel=kernel4))
        vert=cv2.addWeighted(abs1,0.5,abs2,0.5,0)
        diag=cv2.addWeighted(abs3,0.5,abs4,0.5,0)
        img=cv2.addWeighted(vert,1,diag,1,0)
    elif(index=="4"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGBA2GRAY)
        kernel1=np.array([[-1,-1,-1],[0,0,0],[1,1,1]])
        kernel2=np.array([[-1,0,1],[-1,0,1],[-1,0,1]])
        prewX=cv2.filter2D(gray,ddepth=-1,kernel=kernel1)
        prewY=cv2.filter2D(gray,ddepth=-1,kernel=kernel2)
        absX=cv2.convertScaleAbs(prewX)
        absY=cv2.convertScaleAbs(prewY)
        grad=cv2.addWeighted(absX,0.5,absY,0.5,0)
        img=grad
    elif(index=="5"):
        gray=cv2.cvtColor(img,cv2.COLOR_RGBA2GRAY)
        sobelX=cv2.Sobel(gray,-1,1,0,ksize=3,scale=1,delta=0,borderType=cv2.BORDER_DEFAULT)
        sobelY=cv2.Sobel(gray,-1,0,1,ksize=3,scale=1,delta=0,borderType=cv2.BORDER_DEFAULT)
        absX=cv2.convertScaleAbs(sobelX)
        absY=cv2.convertScaleAbs(sobelY)
        grad=cv2.addWeighted(absX,0.5,absY,0.5,0)
        img=grad
    if (index=="6"):
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        pilImage=Image.fromarray(img.astype('uint8'))
        fileObj=io.BytesIO()
        pilImage.save(fileObj,'JPEG')
        fileObj.seek(0)
        return send_file(fileObj,mimetype='image/JPEG')
    pilImage=Image.fromarray(img.astype('uint8'))
    fileObj=io.BytesIO()
    pilImage.save(fileObj,'PNG')
    fileObj.seek(0)
    return send_file(fileObj,mimetype='image/PNG')