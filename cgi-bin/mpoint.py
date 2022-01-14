import random as rand
import math
import numpy as np
import coloring


class MPoint():

    def __init__(self, x=0.0, y=0.0, imgInfo=None, matrix=None):
        self._x = int(x)
        self._y = int(y)
        self._xf = float(x)
        self._yf = float(x)
        self._xft = float(x)
        self.imgInfo = imgInfo
        self.imgInfo = (imgInfo[0], imgInfo[1], imgInfo[0]/2, imgInfo[1]/2)
        self.mult = .5
        self.rotation = 0
        self.cos = math.cos(self.rotation)
        self.sin = math.sin(self.rotation)
        self.xy_flag = True
        self.matrix = matrix
        self.matrixLen_1 = len(self.matrix)-1
        self.blend = False
        self.grad = False
        self.colors = []
        self.extractColors()
        self.counterWeight = 1
        self.gType = 8
        self.mirror = False
        self.f = 0
        self.switcherx = {
            0: self.funct_0x,
            1: self.funct_1x,
            2: self.funct_2x,
            3: self.funct_3x,
            4: self.funct_4x,
            5: self.funct_5x,
            6: self.funct_6x,
            7: self.funct_7x,
            8: self.funct_8x,
            9: self.funct_9x,
            10: self.funct_10x,
            11: self.funct_11x,
            12: self.funct_12x,
            13: self.funct_13x,
            14: self.funct_14x,
            15: self.funct_15x,
            16: self.funct_16x
        }
        self.switchery = {
            0: self.funct_0y,
            1: self.funct_1y,
            2: self.funct_2y,
            3: self.funct_3y,
            4: self.funct_4y,
            5: self.funct_5y,
            6: self.funct_6y,
            7: self.funct_7y,
            8: self.funct_8y,
            9: self.funct_9y,
            10: self.funct_10y,
            11: self.funct_11y,
            12: self.funct_12y,
            13: self.funct_13y,
            14: self.funct_14y,
            15: self.funct_15y,
            16: self.funct_16y
        }

    def updatematrix(self, matrix):
        self.matrix = matrix
        self.matrixLen_1 = len(self.matrix) - 1

    def setRotation(self, rot):

        self.rotation = math.radians(rot)
        self.cos = math.cos(self.rotation)
        self.sin = math.sin(self.rotation)

    def setMirror(self, mirror):
        self.mirror = mirror

    def setGType(self, gType):
        self.gType = gType

    def setCounterWeight(self, cw):
        self.counterWeight = cw

    def move(self):
        
        p = rand.random()
        psum = self.matrix[0][8]
        self.f = 0
        while p > psum and self.f < self.matrixLen_1:
            self.f += 1
            psum += self.matrix[self.f][8]
        
        self._xf, self._yf= self.switcherx[self.matrix[self.f][6]](), self.switchery[self.matrix[self.f][7]]()
        if self._xf == float("nan") or self._yf == float("nan"):
            print("AHHHHH")

    def extractColors(self):
      for i in range(len(self.matrix)):
        colorInt=int(self.matrix[i][len(self.matrix[i])-1])
        self.colors.append(((colorInt >> 16) & 255, (colorInt >> 8) & 255, colorInt & 255))

    def draw(self, img, xo, yo, m):
        xc = int((((self._xf*self.cos)-(self._yf*self.sin))*m)+xo)

        yc = self.imgInfo[1] - int((((self._yf*self.cos)+(self._xf*self.sin))*m)+yo)

        if(xc >= 0 and xc < self.imgInfo[0] and yc >= 0 and yc < self.imgInfo[1]):

          # something to maybe add in future, It will have the indiviual point itself have a gradient color depending on position
          # if self.grad:
          #     if self.blend:
          #         img.putpixel((xc, yc), coloring.blend(coloring.gradiant(xc, yc, self.imgInfo[0], self.imgInfo[1],
          #                                                                   self.colors[self.f], self.colors[self.f], self.gType, self.counterWeight), img.getpixel((xc, yc))))
          #         if self.mirror:
          #             xc = int(self.imgInfo[2]-((xc-(self.imgInfo[2]-1))))
          #             img.putpixel((xc, yc), coloring.blend(coloring.gradiant(xc, yc, self.imgInfo[0], self.imgInfo[1],
          #                                                                       self.colors[self.f], self.colors[self.f], self.gType, self.counterWeight), img.getpixel((xc, yc))))

          #     else:
          #         img.putpixel((xc, yc), coloring.gradiant(
          #             xc, yc, self.imgInfo[0], self.imgInfo[1], self.colors[self.f], self.colors[self.f], self.gType, self.counterWeight))
          #         if self.mirror:
          #             xc = int(self.imgInfo[2]-((xc-(self.imgInfo[2]-1))))
          #             img.putpixel((xc, yc), coloring.gradiant(
          #                 xc, yc, self.imgInfo[0], self.imgInfo[1], self.colors[self.f], self.colors[self.f], self.gType, self.counterWeight))

          # else:
          if self.blend: #if point blends color of the paint and whats underneath
              img.putpixel((xc, yc), coloring.blend(self.colors[self.f], img.getpixel((xc, yc))))

              if self.mirror[0]:
                xc = int((self.imgInfo[0])-(xc-1))
                img.putpixel((xc, yc), coloring.blend(self.colors[self.f], img.getpixel((xc, yc))))
                if self.mirror[1]:
                  yc = int((self.imgInfo[1])-(yc-1))
                  img.putpixel((xc, yc), coloring.blend(self.colors[self.f], img.getpixel((xc, yc))))
                  xc = int((self.imgInfo[0])-(xc-1))
                  img.putpixel((xc, yc), coloring.blend(self.colors[self.f], img.getpixel((xc, yc))))
              elif self.mirror[1]:
                yc = int((self.imgInfo[1])-(yc-1))
                img.putpixel((xc, yc), coloring.blend(self.colors[self.f], img.getpixel((xc, yc))))
          else:
            img.putpixel((xc, yc), self.colors[self.f])
            if self.mirror[0]:
              xc = int((self.imgInfo[0])-(xc-1))
              img.putpixel((xc, yc), self.colors[self.f])
              if self.mirror[1]:
                yc = int((self.imgInfo[1])-(yc-1))
                img.putpixel((xc, yc), self.colors[self.f])
                xc = int((self.imgInfo[0])-(xc-1))
                img.putpixel((xc, yc), self.colors[self.f])
            elif self.mirror[1]:
              yc = int((self.imgInfo[1])-(yc-1))
              img.putpixel((xc, yc), self.colors[self.f])

    def funct_0x(self):
        return self._xf * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_1x(self):
        return math.cos(self._xf) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_2x(self):
        return self._xf * self.matrix[self.f][0] + math.cos(self._yf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_3x(self):
        return math.sin(self._xf) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_4x(self):
        return self._xf * self.matrix[self.f][0] + math.sin(self._yf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_5x(self):
        return math.tan(self._xf) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_6x(self):
        return self._xf * self.matrix[self.f][0] + math.tan(self._yf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_7x(self):
        return math.sin(self._xf) * self.matrix[self.f][0] + math.cos(self._yf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_8x(self):
        return math.cos(self._xf) * self.matrix[self.f][0] + math.sin(self._yf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_9x(self):
        return self._xf * self.matrix[self.f][0] + math.sin(math.cos(self._yf)) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_10x(self):
        return math.sin(math.cos(self._xf)) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_11x(self):
        return self._xf * self.matrix[self.f][0] + math.cos(math.sin(self._yf)) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_12x(self):
        return math.cos(math.sin(self._xf)) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_13x(self):
        return math.sin(math.cos(self._xf)) * self.matrix[self.f][0] + math.cos(math.sin(self._yf)) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_14x(self):
        return self.copySign(abs(self._xf) ** 0.809016995, self._xf) * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_15x(self):
        return self._xf * self.matrix[self.f][0] + self.copySign(abs(self._yf) ** 0.809016995, self._xf) * self.matrix[self.f][1] + self.matrix[self.f][4]

    def funct_16x(self):

        return self._xf * self.matrix[self.f][0] + self._yf * self.matrix[self.f][1] +self._xf*self._yf*self.matrix[self.f][2]+ self.matrix[self.f][7]

    def funct_0y(self):

        return self._xf * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_1y(self):

        return math.cos(
            self._xf) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_2y(self):

        return self._xf * self.matrix[self.f][2] + math.cos(
            self._yf) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_3y(self):

        return math.sin(
            self._xf) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_4y(self):

        return self._xf * self.matrix[self.f][2] + math.sin(
            self._yf) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_5y(self):

        return math.tan(
            self._xf) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_6y(self):

        return self._xf * self.matrix[self.f][2] + math.tan(
            self._yf) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_7y(self):

        return math.sin(
            self._xf) * self.matrix[self.f][2] + math.cos(self._yf) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_8y(self):

        return math.cos(
            self._xf) * self.matrix[self.f][2] + math.sin(self._yf) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_9y(self):

        return self._xf * self.matrix[self.f][2] + math.sin(
            math.cos(self._yf)) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_10y(self):

        return math.sin(math.cos(
            self._xf)) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_11y(self):

        return self._xf * self.matrix[self.f][2] + math.cos(
            math.sin(self._yf)) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_12y(self):

        return math.cos(math.sin(
            self._xf)) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_13y(self):

        return math.sin(
            math.cos(self._xf)) * self.matrix[self.f][2] + math.cos(math.sin(self._yf)) * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_14y(self):

        return self.copySign(
            abs(self._xf)**0.809016995, self._xf) * self.matrix[self.f][2] + self._yf * self.matrix[self.f][3] + self.matrix[self.f][5]

    def funct_15y(self):

        return self._xf * self.matrix[self.f][2] + self.copySign(abs(
            self._yf)**0.809016995, self._xf) * self.matrix[self.f][3] + self.matrix[self.f][5]
    
    def funct_16y(self):

        return self._xf * self.matrix[self.f][3] + self._yf * self.matrix[self.f][4] +self._xf*self._yf*self.matrix[self.f][5]+ self.matrix[self.f][8]

    def copySign(self, a, b):
        if a > 0 and b > 0:
            return a
        if a < 0 and b < 0:
            return a
        return a * -1
