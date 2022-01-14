function getMatrix(){
  //Gets the matrix input from user filled form
  let matrixDiv = document.getElementById("matrix"); 
  let rows = matrixDiv.children;
  let i=0,j;
  let matrix = [];
  //console.log(rows);
  for (let row = 0;row<rows.length;row++){
    let cols = rows[row].children;
    //console.log(cols);
    if (cols[1].checked){
      matrix [i] = new Array(Math.floor(cols.length/2)-1);
      for (j = 0; j < matrix[i].length-2; j++){
        matrix[i][j] = Number(cols[(j*2)+3].value);
        //console.log( i + "," + j + " : " + matrix[i][j]);
      }
      matrix[i][j] = Number(cols[((j)*2)+3].value)/100;
      //console.log( i + "," + j + " : " + matrix[i][j]);
      j++;
      matrix[i][j] = parseInt(cols[((j)*2)+3].value.substring(1),16);
      //console.log( i + "," + j + " : " + matrix[i][j] + cols[((j)*2)+3].value);
      i++;
  }
  }
  return matrix;
}

function fillMatrix(matrix){
  //fills form with preset
  console.log(matrix);
  let matrixDiv = document.getElementById("matrix"); 
  let rows = matrixDiv.children;
  let diff = matrix.length - rows.length;
  for (let i=0; i<diff; i++){
    addRow();
  }
  
  for (let i = 0;i<matrix.length;i++){
    let cols = rows[i].children;
    console.log(matrix[i]);
    for (let j = 0; j < matrix[i].length; j++){
      cols[(j*2)+3].value = matrix[i][j];
      console.log( i + "," + j + " : " + matrix[i][j]);
    }
  }
  
  document.getElementById("matrixOutput").value = getMatrix();
  storeParams()
}

function loadPreset(){
  //loads preset
  let ps = Number(document.getElementById("presets").value); //This took a while to debug. Learned that switch statements in js use a strict comparison "===" instead of == so
                                                             //I have to convert to number data type instead of any datatype. 
  console.log("ps:" + ps);
  
  switch(ps){
    case 0: 
      console.log("No presets selected.");
      break;
    case 1: 
      console.log("Loaded Barnsley.");
      matrix=[[0.001,0,0,0.16,0,0,0,0,1],
          [0.85,0.04,-0.04,0.85,0,1.6,0,0,85],
          [0.20,-0.26,0.23,0.22,0,1.6,0,0,7],
          [-0.15,0.28,0.26,0.24,0,0.44,0,0,7]];
      fillMatrix(matrix);
      break;

    case 2: 
      console.log("Loaded Nebulus.");
      matrix=[[0.519,-0.488,0.344,0.595,0.443,0.245,0,0,20],
          [0.462,0.414,-0.252,0.361,0.251,0.569,0,0,25],
          [-0.058,0.751,0.886,-0.026,0.598,0.097,0,0,20],
          [-0.035,0.658,-0.236,-0.022,0.488,0.507,0,0,25],
          [-0.422,0.000,0.000,0.501,0.856,0.251,0,0,10]];
      fillMatrix(matrix);
      break;

    case 3: 
      console.log("Loaded Butterfly.");
      matrix=[[-0.9275157,-0.5973068,0.6286133,0.9552935,-1.0394104,-0.3004897,2,3,50],
              [0.9523305,-0.5973068,0.6286133,-0.9552935,1.0394104,-0.3004897,0,0,50]];
      fillMatrix(matrix);
      break;
    case 4: 
      console.log("Loaded 4.");
      matrix=[[-0.9983071,0.6027105,-0.8903418,-0.9734533,3.0813973,4.7642242,1,2,50],
              [-0.9983071,-0.6027105,0.8903418,-0.9734533,-3.0813973,4.7642242,9,10,50]];
      fillMatrix(matrix);
      break;

      case 5: 
      console.log("Loaded Weave.");
      matrix=[[0.415,-0.631,0.000,0.558,7.246,3.024,0,0,25],
              [0.415,0.567,-0.080,0.558,7.246,-3.024,0,0,25],
              [-0.488,0.079,0.017,-0.669,4.034,-6.986,0,0,25],
              [0.550,0.009,0.010,0.669,4.034,6.986,0,0,25]];
      fillMatrix(matrix);
      break;
      
    case 6: 
      console.log("Loaded 6.");
      matrix=[[0.7107897,-0.5388406,0.3489746,0.9942113,0.0000000,0.0000000,11,12,50],
              [-0.7107897,-0.5388406,0.3489746,-0.9942113,-0.0000000,0.0000000,10,1,50]];
      fillMatrix(matrix);
      break;
    case 7: 
      console.log("Loaded Octopus.");
      matrix=[[-0.003,-0.225,-0.077,0.16,0,0,0,0,1],
          [0.861,0.202,-0.325,0.85,0,1.6,0,0,85],
          [0.506,-0.462,0.336,0.220,0.000,1.6,0,0,7],
          [-0.191,0.179,0.260,0.240,0.000,0.44,0,0,7]];
      fillMatrix(matrix);
      break;

    case 8: 
      console.log("Quack.");
      matrix=[[-0.4812557,0.7715701,-0.8879675,-0.9231802,3.9497052,1.2236904,6,4,30],
              [0.5201924,0.7715701,-0.8879675,0.9231802,3.9497052,-1.2236904,2,8,30],
              [0.4219362,0.8638609,-0.1224049,0.2600378,-2.0754802,0.0000000,14,4]];
      fillMatrix(matrix);
      break;
    case 9: 
      console.log("Turbulance.");
      matrix=[[-0.3067785,1.5207986,-0.0060235,-1.7449063,1.5235393,0.0000000,7,15,10],
              [-1.3095427,-0.5252047,-0.0060235,-0.7416867,1.4785519,0.000000,3,1,10],
              [0.7839603,0.0000000,0.1263588,-0.4800382,-9.9964208,0.8499120,8,5,10],
              [-0.7826706,0.0000000,0.1243568,0.4748411,9.9297780,0.8268902,15,5,10],
              [-0.3196557,-0.2907854,0.1148289,0.0000000,0.0000000,6.2264367,9,3,10],
              [-0.3127190,0.2920377,-0.1046477,0.0000000,0.0000000,-6.2264367,10,3,10],
              [0.0523954,-0.8826739,-0.1986083,0.7548482,0.0000000,-9.9226642,6,12,10],
              [0.0523954,0.8826739,0.1986083,0.7548482,0.0000000,9.9226642,10,13,10],
              [0.0038275,0.2500526,0.3055817,-0.2665768,0.0649731,-7.1860949,7,7,10],
              [0.0038275,-0.2500526,-0.3055817,-0.2665768,0.0649731,7.1860949,7,15,10]];
      fillMatrix(matrix);
      document.getElementById("width").value=500;
      document.getElementById("height").value=3000;
      document.getElementById("autoSetUp").checked = false;
      document.getElementById("iterations").value=16000000;
      document.getElementById("xOffset").value=1490;
      document.getElementById("yOffset").value=1725;
      document.getElementById("magnitude").value=130;
      document.getElementById("bColor0").value="#000000";
      document.getElementById("2Color").value="#ffffff";
      break;

    default: 
      console.log("Preset not found.")
  }
}

function storeParams()
{
  //stores parameters (used for serverside generation)
  const params = {
    "width":Number(document.getElementById("width").value),
    "height":Number(document.getElementById("height").value),
    "scale":Number(document.getElementById("scale").value),
    "autoSetUp": Number(document.getElementById("autoSetUp").checked),
    "iterations":Number(document.getElementById("iterations").value),
    "xOffset":Number(document.getElementById("xOffset").value),
    "yOffset":Number(document.getElementById("yOffset").value),
    "magnitude":Number(document.getElementById("magnitude").value),
    "mirrorVertical":Number(document.getElementById("mirrorVertical").checked),
    "mirrorHorizontal":Number(document.getElementById("mirrorHorizontal").checked),
    "backgroundFill":Number(document.getElementById("backgroundFill").value),
    "bColor0":convertColor(document.getElementById("bColor0").value),
    "bColor1":convertColor(document.getElementById("bColor1").value),
    "weight":Number(document.getElementById("weight").value)
  };
  console.log("autosetup to number "+Number(document.getElementById("autoSetUp").checked))
  document.getElementById("paramsOutput").value= JSON.stringify(params);
}

function backgroundColoring(ctx,dim){
  //colors the background of the image
  let fillType;
  let c0=document.getElementById("bColor0").value;
  let c1=document.getElementById("bColor1").value;
  let weight = document.getElementById("weight").value;
  switch(Number(document.getElementById("backgroundFill").value)){
    case 0: //solid
      fillType=c0;
      break;
    
    case 1: //linear horz.
      fillType=ctx.createLinearGradient(0, 0, dim[0],0); 
      fillType.addColorStop(weight, c0);
      fillType.addColorStop(1, c1);
      break;

    case 2: //linear vert.
      fillType=ctx.createLinearGradient(0, 0,0, dim[1]); 
      fillType.addColorStop(weight, c0);
      fillType.addColorStop(1, c1);
      break;

    case 3: //radial center
      fillType= ctx.createRadialGradient(Math.floor(dim[0]/2), Math.floor(dim[1]/2), 0, Math.floor(dim[0]/2), Math.floor(dim[1]/2),Math.floor((dim[0]+dim[1])/2));
      fillType.addColorStop(weight, c0);
      fillType.addColorStop(1, c1);
      break;

    case 4: //Transparent (still uses color 0 but it has 0 opacity)
      color = convertColor(c0);
      fillType="rgba("+ color[0] +","+ color[1] +","+ color[2] + ",0)";
      break;
  }
  
  // Fill with gradient
  ctx.fillStyle = fillType;
  ctx.fillRect(0, 0, dim[0], dim[1]);
}

function convertColor(colorString){
  //converts hex color to a list of 3 ints
  colorInt = parseInt(colorString.substring(1),16);
  
  return [(colorInt >> 16) & 255, (colorInt >> 8) & 255, colorInt & 255];
}

function sizing(dim, point, matrix, n){
  //finds out what the default magnitude, x offset and y offset should be to place the image fully in frame
  if(document.getElementById("autoSetUp").checked){
    let buffer = 0.01;
    let xs = Array(n);
    let ys = Array(n);
    for (let i = 0; i<n; i++){
      move(point, matrix);
      xs[i] = point[0];
      ys[i] = point[1];
    }
    xs.sort(function(a, b){return a-b}); //This also took a while to debugging, Orginally I had just .sort() and that seemed to work well,
    ys.sort(function(a, b){return a-b}); //It looked sorted and with IFS that have a small variance, it is sorted. Finally figured it was sorting 
                                         //Alphabetically and not numerically so the list would be sorted like
                                         //[... 1.1, 1.5, 1.9, 10.2, 14.5, 19.2, 2.1, 2.7, 2.8 ...]. 
                                         //So it only became a problem when the range spread more than a magnitude and some IFS worked just fine.
    xs=xs.slice(Math.floor(buffer*n),Math.floor(n-buffer*n));
    ys=ys.slice(Math.floor(buffer*n),Math.floor(n-buffer*n));
    let xOffset,yOffset, xMag, yMag,mag;

    xMag= Math.abs(dim[0]/(xs[0]-xs[xs.length-1]));
    yMag=Math.abs(dim[1]/(ys[0]-ys[ys.length-1]));
    if(xMag<yMag) {
        mag=xMag;
        xOffset = Math.floor((xs[0] * mag) * -1);
        yOffset= Math.floor(dim[1]/2-(ys[Math.floor(ys.length/2)] * mag));
    }
    else {
        mag = yMag;
        xOffset = Math.floor( dim[0]/2 - (xs[Math.floor(xs.length/2)] * mag));
        yOffset =  Math.floor((ys[0] * mag) * -1);
    }

    document.getElementById("magnitude").value = mag;
    document.getElementById("xOffset").value = xOffset;
    document.getElementById("yOffset").value = yOffset;
  }
}

function copySign(a,b){
  if ((a > 0 && b > 0) || (a < 0 && b < 0)){
    return a
  }
  return a * -1
}

function move( point, matrix){
  //moves point witha random function from the system
  let functIndex = 0;
  for (let p = Math.random()-matrix[functIndex][8]; p > 0 && functIndex < matrix.length-1;){functIndex++;p-=matrix[functIndex][8];}
  
  oldX=point[0];
  for(let i =0; i <2; i++){
    switch(matrix[functIndex][6+i]){
      case 0: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 1: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.cos(oldX) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 2: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * Math.cos(point[1]) + matrix[functIndex][4+i];
        break;
      }
      case 3: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.sin(oldX) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 4: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * Math.sin(point[1]) + matrix[functIndex][4+i];
        break;
      }
      case 5: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.tan(oldX) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 6: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * Math.tan(point[1]) + matrix[functIndex][4+i];
        break;
      }
      case 7: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.sin(oldX) + matrix[functIndex][1 + (2*i)] * Math.cos(point[1]) + matrix[functIndex][4+i];
        break;
      }
      case 8: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.cos(oldX) + matrix[functIndex][1 + (2*i)] * Math.sin(point[1]) + matrix[functIndex][4+i];
        break;
      }
      case 9: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * Math.sin(Math.cos(point[1])) + matrix[functIndex][4+i];
        break;
      }
      case 10: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.sin(Math.cos(oldX)) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 11: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * Math.cos(Math.sin(point[1])) + matrix[functIndex][4+i];
        break;
      }
      case 12: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.cos(Math.sin(oldX)) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 13: 
      {
        point[i] = matrix[functIndex][(2*i)] * Math.sin(Math.cos(oldX)) + matrix[functIndex][1 + (2*i)] * Math.cos(Math.sin(point[1])) + matrix[functIndex][4+i];
        break;
      }
      case 14: 
      {
        point[i] = matrix[functIndex][(2*i)] * copySign(Math.pow(Math.abs(oldX), 0.809016995),oldX) + matrix[functIndex][1 + (2*i)] * point[1] + matrix[functIndex][4+i];
        break;
      }
      case 15: 
      {
        point[i] = matrix[functIndex][(2*i)] * oldX + matrix[functIndex][1 + (2*i)] * copySign(Math.pow(Math.abs(point[1]), 0.809016995),point[1]) + matrix[functIndex][4+i];
        break;
      }
    }
  }
  
  point[2] = matrix[functIndex][9]; // stores color
}

function draw(x,y, dim, color, pixels){
  //draws on image at x,y
  let index = (x + (y*dim[0]))*4;
  pixels.data[index] = color[0];
  pixels.data[index + 1]=color[1];
  pixels.data[index + 2]=color[2];
  pixels.data[index + 3]=Math.floor((pixels.data[index + 3]+255)/2);
}

function autoGen(){
  //auto generates everytime a change is made, only goes on to call genration id autogen is checked
  let matrix = getMatrix();
  document.getElementById("matrixOutput").value = matrix;
  storeParams();
  if(document.getElementById("autoGen").checked){
    console.log("Auto Tripped");
    genIFS(matrix);
  }else{
    console.log("Auto Called");
  }
}

function genIFS(matrix) {
  //generates IFS image
  console.log(Array.isArray(matrix));
  if (!Array.isArray(matrix)){
    matrix = getMatrix();
  }
  let canvas = document.getElementById("ifsCanvas");
  let iter = document.getElementById("iterations").value;
  
  
  //console.log("canvas  w,h "+ canvas.width + ", "  + canvas.height );
  let dim = [canvas.width, canvas.height];

  let ctx = canvas.getContext("2d");
  let pixels;
  if (document.getElementById("overlap").checked){
    if(canvas.width != document.getElementById("width").value || canvas.height != document.getElementById("height").value){
      console.log("Risizng canvas resets the canvas. Keeping the same size as before.")
    }
    pixels = ctx.getImageData(0,0,dim[0],dim[1]);
  }else{
    canvas.width = document.getElementById("width").value;
    canvas.height = document.getElementById("height").value;
    dim = [canvas.width, canvas.height];

    
    backgroundColoring(ctx,dim);
    pixels = ctx.getImageData(0,0,dim[0],dim[1]);
  }

  const point=[0,0,0]; //x,y,colorInt

  sizing(dim ,point, matrix, Math.floor(iter/100));

  let mag = Number(document.getElementById("magnitude").value);
  let xOffset = Number(document.getElementById("xOffset").value);
  let yOffset = Number(document.getElementById("yOffset").value);

  const mirror = [document.getElementById("mirrorHorizontal").checked,document.getElementById("mirrorVertical").checked];

  let x,y;
  console.log("mag:" + mag+ ", xOffset:" +xOffset + ", yOffset:" + yOffset);

  let color;
  
  for (let i = 0; i< iter; i++){
    move(point,matrix);
    
    x=(Math.floor(point[0]*mag) + xOffset);
    y=(canvas.height-(Math.floor(point[1]*mag)+yOffset));
    
    if (x>=0 && y>=0 && x<dim[0] && y<dim[1]){
      color = [(point[2] >> 16) & 255, (point[2] >> 8) & 255, point[2] & 255];
      draw(x,y,dim,color,pixels);
      if (mirror[0]){
        x=dim[0]-x;
        draw(x,y,dim,color,pixels);
        if (mirror[1]){
          y=dim[1]-y;
          draw(x,y,dim,color,pixels);
          x=dim[0]-x;
          draw(x,y,dim,color,pixels);
        }
      }
      else if (mirror[1]){
          y=dim[1]-y;
          draw(x,y,dim,color,pixels);
        }
    }
  }
  
  ctx.putImageData(pixels, 0, 0);
  console.log("Done Drawing");
}

function saveIFS(){ 
  //saves image to local computer
  let img = document.getElementById("ifsCanvas").toDataURL();  
  let link = document.createElement("a");

  link.download = 'image.png'; 
  link.href = img;  

  link.click();
}

function addRow(){
  //adds another function to system
  let matrix =  document.getElementById("matrix");
  let i = matrix.childElementCount;
  let  newRow = document.createElement("p");
  newRow.innerHTML = `<label for="` + i + `enabled">Enabled:</label>
    <input type="checkbox" id="` + i + `enabled" name="` + i + `enabled" checked>
    
    <label for="` + i + `A">` + i + `A:</label>
    <input type="number" id="` + i + `A" name="` + i + `A" value="0" step = "0.01">

    <label for="` + i + `B">` + i + `B:</label>
    <input type="number" id="` + i + `B" name="` + i + `B" value="0" step = "0.01">

    <label for="` + i + `C">` + i + `C:</label>
    <input type="number" id="` + i + `C" name="` + i + `C" value="0" step = "0.01">

    <label for="` + i + `D">` + i + `D:</label>
    <input type="number" id="` + i + `D" name="` + i + `D" value="0" step = "0.01">

    <label for="` + i + `E">` + i + `E:</label>
    <input type="number" id="` + i + `E" name="` + i + `E" value="0" step = "0.01">

    <label for="` + i + `F">` + i + `F:</label>
    <input type="number" id="` + i + `F" name="` + i + `F" value="0" step = "0.01">

    <label for="` + i + `XFunctionType">X Funct Type:</label>
    <select name="` + i + `XFunctionType" id="` + i + `XFunctionType">
      <option value="0">Linear</option>
      <option value="1">Cos(X)</option>
      <option value="2">Cos(Y)</option>
      <option value="3">Sin(X)</option>
      <option value="4">Sin(Y)</option>
      <option value="5">Tan(X)</option>
      <option value="6">Tan(Y)</option>
      <option value="7">Sin(X),Cos(Y)</option>
      <option value="8">Cos(X),Sin(Y)</option>
      <option value="9">Sin(Cos(Y))</option>
      <option value="10">Sin(Cos(X))</option>
      <option value="11">Cos(Sin(Y))</option>
      <option value="12">Cos(Sin(X))</option>
      <option value="13">Sin(Cos(X)),Cos(Sin(Y))</option>
      <option value="14">X^golden ratio</option>
      <option value="15">Y^golden ratio</option>
    </select>

    <label for="` + i + `YFunctionType">Y Funct Type:</label>
    <select name="` + i + `YFunctionType" id="` + i + `YFunctionType">
      <option value="0">Linear</option>
      <option value="1">Cos(X)</option>
      <option value="2">Cos(Y)</option>
      <option value="3">Sin(X)</option>
      <option value="4">Sin(Y)</option>
      <option value="5">Tan(X)</option>
      <option value="6">Tan(Y)</option>
      <option value="7">Sin(X),Cos(Y)</option>
      <option value="8">Cos(X),Sin(Y)</option>
      <option value="9">Sin(Cos(Y))</option>
      <option value="10">Sin(Cos(X))</option>
      <option value="11">Cos(Sin(Y))</option>
      <option value="12">Cos(Sin(X))</option>
      <option value="13">Sin(Cos(X)),Cos(Sin(Y))</option>
      <option value="14">X^golden ratio</option>
      <option value="15">Y^golden ratio</option>
    </select>

    <label for="` + i + `Percentage">` + i + `%:</label>
    <input type="number" id="` + i + `Percentage" name="` + i + `Percentage" value="10" step = "2">

    <label for="` + i + `Color">` + i + `Color:</label>
    <input type="color" id="` + i + `Color" name="` + i + `Color">
    <button id="`+i+`remove">Remove</button>`;

  function removeFunct(matrix,newRow){
    console.log(matrix);
    console.log(newRow);
    matrix.removeChild(newRow);
  }

  matrix.appendChild(newRow);
  document.getElementById(i+"remove").addEventListener("click",removeFunct.bind(null,matrix,newRow),false);
  init();
}
function init(){
  //initalize form and buttons.
  let genBtn = document.getElementById("genBtn");
  genBtn.addEventListener("click", genIFS);

  let presetBtn = document.getElementById("loadPresetBtn");
  presetBtn.addEventListener("click", loadPreset);

  let addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", addRow);

  let saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", saveIFS);


  let matrixDiv = document.getElementById("matrix"); 
  let rows = matrixDiv.children;
  for (let i = 0;i<rows.length;i++){
    let cols = rows[i].children;
      for (let j = 0; j <cols.length; j++){
        if (cols[j].nodeName!= "LABEL"){
          console.log(cols[j].nodeName);
          cols[j].addEventListener("change", autoGen);
        }
      }
  }
  let paramDiv = document.getElementById("params"); 
  let children = paramDiv.children[0].children;
  for (let i = 0;i<children.length;i++){
    if (children[i].nodeName!= "LABEL" && children[i].nodeName!= "BR"){
          console.log(children[i].nodeName);
          children[i].addEventListener("change", autoGen);
        }
  }
}

init();