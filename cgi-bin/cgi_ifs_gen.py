#!python3.8

import cgi
import os
import numpy as np
import json
import ifs

def convertMatrix(matrix):
  
  length = 10
  npMatrix = np.zeros((len(matrix)//length,length))
  for i,n in enumerate(matrix):
    npMatrix[i//length][i%length] = n
  
  # for i in range(len(matrix)//length):
  #   npMatrix[i][length-2]=npMatrix[i][length-2]/100

  return npMatrix

dirNum = len(os.listdir('tempImages\\'))
imageID=f"{dirNum:06}"

form_data = cgi.FieldStorage()
strMatrix = form_data.getvalue("matrixOutput", False)

if strMatrix:
  matrix = convertMatrix(strMatrix.split(","))
  params= json.loads(form_data.getvalue("paramsOutput")) #took me way too long to figure out that I wanted to use loads() and not load()

  ifsGen=ifs.IFS(matrix,params,imageID)
  ifsGen.canvas()

  print("Content-type: text/html \n\n")

  print(f"""
  <html>
  <head>
    <title>Server Generated</title>
    <link rel="stylesheet"  type="text/css" href="../style/serverGenerated.css">
  </head>
  <body>
    <p style="display:none">matrix: {matrix}</p>
    <p style="display:none">params: {params}</p>
    
    <div class="display" >
        <img name="display" src="../tempImages/{imageID}Small.png" alt="IFS image"/>
    </div>
    <a href="../tempImages/{imageID}Small.png" download>Download Small File</a>
    <br>
    <a href="../tempImages/{imageID}.png" download>Download Full File</a>
    <br>
    <a href="../tempImages/{imageID}.txt" download>Download Data File</a>
  </body>
  </html>
  """)
else:
  print("Content-type: text/html \n\n")

  print(f"""
  <html>
  <head>
    <title>CGI script 2</title>
  </head>
  <body>
    <h1>Empty matrix please try again with a filled matrix.<h1>
  </body>
  </html>
  """)
