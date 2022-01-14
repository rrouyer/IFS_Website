import os
import random as rand
import math
import json
import numpy as np
from PIL import Image

import mpoint
import coloring


class IFS():

    def __init__(self,matrix,params,imageID):

        self._scale= int(params["scale"])
        self._height = int(params["height"])*self._scale
        self._width = int(params["width"])*self._scale
        self.autoSetUp = bool(params["autoSetUp"])
        self.mirror = (bool(params["mirrorHorizontal"]),bool(params["mirrorVertical"]))
        self.bGrad = float(params["backgroundFill"])
        self.iterations = int(params["iterations"])*self._scale*4
        self.xOffset= int(params["xOffset"])*self._scale
        self.yOffset= int(params["yOffset"])*self._scale
        self.magnitude= float(params["magnitude"])*self._scale
        self.bColor0= params["bColor0"]
        self.bColor1= params["bColor1"]
        self.weight= (float(params["weight"]) - 1) * - 2

        self.imageID = imageID
        self.matrix = matrix
        self.params = params

    def autoSize(self, p, n, buffer):
        for i in range(n//100):
            p.move()
        cos = math.cos(p.rotation)
        sin = math.sin(p.rotation)
        x = np.empty((2, n), "float32")
        for i in range(n):
            p.move()
            x[0, i],x[1, i] = p._xf, p._yf
        x[0],x[1] = x[0]*cos - x[1]*sin, x[1]*cos - x[0]*sin
        x = np.sort(x, axis=1)
        x = [x[0, int(buffer*n):int(n-(buffer*n))],
             x[1, int(buffer*n):int(n-(buffer*n))]]
        # print(x[0][0] - x[0][-1])
        # print(x[1][0] - x[1][-1])
        if (x[0][0] - x[0][-1]) == 0 or (x[1][0] - x[1][-1]) == 0:
          self.magnitude = 1
          self.xOffset = 0
          self.yOffset = 0
          return False
        mx = int(abs(self._width / (x[0][0] - x[0][-1])))
        my = int(abs(self._height / (x[1][0] - x[1][-1])))
        if mx < my:
            m = mx
            xo = int((x[0][0] * m) * -1)
            yo = int(self._height / 2 - (x[1][int(len(x[1])/2)] * m))
        else:
            m = my
            xo = int(self._width / 2 - (x[0][int(len(x[0])/2)] * m))
            yo = int((x[1][0] * m) * -1)
        self.magnitude = m
        self.xOffset = xo
        self.yOffset = yo
        return True

    
    def canvas(self):
        p = mpoint.MPoint(0, 0, (self._width, self._height), self.matrix)

        p.setMirror(self.mirror)

        name=f"tempImages\\{self.imageID}"
        
        sums=0
        # print (f"{m},{xo},{yo}")
        img = Image.new("RGB", (self._width, self._height))
        coloring.fill(img,self.bColor0,self.bColor1,self.bGrad,self.weight)

        if (self.autoSetUp or self.magnitude == 0) :
          self.autoSize(p,self.iterations//100,.01)

        for i in range(self.iterations):
          p.move()
          p.draw(img, self.xOffset, self.yOffset, self.magnitude)

        sums += self.iterations
        # print(os.getcwd())
        img.save(name+".png")
        small=img.resize((self._width//self._scale,self._height//self._scale), Image.BICUBIC)
        small.save(name+"Small.png")

        with open(name+".txt", "w") as text_file:
            text_file.write(
                f"Matrix\r\n{np.array_repr(p.matrix, precision=6, suppress_small=True)}\nM:{self.magnitude}\r\nN:{sums}\r\n{self._width}X{self._height}\r\nX Offset:{self.xOffset}\r\nY Offset:{self.yOffset}")
            text_file.write(
                f"gType:{p.gType}\r\nbtype{self.bGrad}\r\nMirror:{p.mirror}\r\nRotation:{p.rotation}\r\n")

    

