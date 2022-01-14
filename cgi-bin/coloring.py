import math
import numpy as np

#haven't gotten the gradients exactly right with the same wieght corresponding to the same gradient on the js side
#also the way I'm fillinf the canvas with the gradient is very inefficent and takes up quite a lot of time

def case0(x: int, y: int, width: int, height: int, strength: float):
  #solid
  return(1,0)

def case1(x: int, y: int, width: int, height: int, strength: float):  
  # left to right
  w2 = min(1, x*strength/width)
  w1 = 1-w2
  return (w1,w2)

def case2(x: int, y: int, width: int, height: int, strength: float):  
  # top to bottom
  w2 = min(1, y*strength/height)
  w1 = 1-w2
  return (w1,w2)
def case3(x: int, y: int, width: int, height: int, strength: float):  
  # middleOut
  w2 = min(1, math.sqrt((x-(width/2))**2)+((y-(height/2))**2)*strength/math.sqrt(((width/2)**2)+((height/2)**2)))
  w1 = 1-w2
  return (w1,w2)

def case4(x: int, y: int, width: int, height: int, strength: float):  
  # topLeft to bottomRight
  w1 = min(1, math.sqrt((x**2)+(y**2))*strength /
                  math.sqrt((width**2)+(height**2)))
  w2 = 1-w1
  return (w1,w2)


def case5(x: int, y: int, width: int, height: int, strength: float):  
  # bottomleft to TopRigh
  w1 = min(1, math.sqrt(((x-(width/2))**2)+((y-(height/2))**2))*strength/math.sqrt(((width/2)**2)+((height/2)**2)))
  w2 = 1-w1
  return (w1,w2)



blendBlack = False
switcher = {
    0:case0,
    1:case1,
    2:case2,
    3:case3,
    4:case4,
    5:case5

}

#very slow
def fill(img, c1, c2, gradType, strength):
  for i in range(img.height):
      for j in range(img.width):
          img.putpixel((j, i), gradiant(j, i, img.width,
                      img.height, c1, c2, gradType, strength))

def setBlendBlack(blndB):
  blendBlack = blndB


def gradiant(x: int, y: int, width: int, height: int, c1, c2, gradType: int, strength: float = 1):
  w=switcher.get(gradType,(.5,.5))(x, y, width, height, strength)
  return (int((c1[0]*w[0])+(c2[0]*w[1])), int((c1[1]*w[0])+(c2[1]*w[1])), int((c1[2]*w[0])+(c2[2]*w[1])))



def blend(paint,canvas):
  return ((paint[0]+canvas[0])//2, (paint[1]+canvas[1])//2,(paint[2]+canvas[2])//2)

def colorWrite(color):
  if len(color) == 3:
      return f"R:{color[0]}, G:{color[1]}, B:{color[2]}"
  return f"R:{color[0]}, G:{color[1]}, B:{color[2]}, A:{color[3]}"

def colorWriteStat(color):
  if len(color) == 3:
      return f"({color[0]}, {color[1]}, {color[2]})"
  return f"({color[0]}, {color[1]}, {color[2]}, {color[3]})"




