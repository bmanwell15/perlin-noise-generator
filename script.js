var field = []
var length = Math.ceil(window.innerWidth/10), height = Math.ceil(window.innerHeight/10)
//var length = 50, height = 50
var colorWeight = [0,0,0];
var lightscale = 1


addEventListener("keydown",(event) => {
  if (event.keyCode == 13) {
    document.getElementById("loading").innerHTML = "Creating Perlin Noise..."
    colorWeight[0] = document.getElementById("R").value
    colorWeight[1] = document.getElementById("G").value
    colorWeight[2] = document.getElementById("B").value
    lightscale = document.getElementById("lightscale").value + 1
    
    setTimeout(() => {
      field = createPerlinNoise(document.getElementById("input").value, length, height, document.getElementById("smoothNum").value);
      
      document.getElementById("loading").innerHTML = "Applying..."
      setTimeout(() => {
        apply()
      }, 100)
    }, 100)
  }
});

      
function apply() {
  
  for (var i = 0;i < field.length;i++) {
    for (var k = 0;k < field[i].length;k++) {
      $("body").append("<div class='tile' style='left:" + (i*document.getElementById("size").value) + "px;top:" + (k*document.getElementById("size").value) + "px;background-color:" + getColor(field[i][k]) + ";width:" + document.getElementById("size").value + "px;height:" + document.getElementById("size").value + "px' title='(" + i + "," + k + ") - " + field[i][k] + "'></div>")
    }
  }
  
  document.querySelector(".inputBox").style.display = "none"
  //alert(printMatrix(field))
}

function getColor(x) {return "rgb(" + (Math.abs(255*x) * colorWeight[0] * lightscale) + "," + (Math.abs(255*x) * colorWeight[1] * lightscale) + "," + (Math.abs(255*x) * colorWeight[2] * lightscale) + ")"}


function printMatrix(x) {
  var out = ""
  for (var i = 0;i < x.length;i++) {
    for (var k = 0;k < x[i].length;x++) {
      out += $round(x[i][k], 3) + ", "
    }
    out += "<br>"
  }
  
  return out;
}