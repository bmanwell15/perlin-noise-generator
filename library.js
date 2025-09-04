/*************************************************************************************************************************************************************
  DOCUMENTATION
  
  var array = createPerlinNoise(factor, width, height, smooth factor, range)
  
  Description - The function returns a 2d array of decimal values between 0 and 1 that represents a field of perlin noise
  
  Parameters
    - Factor (int): REQUIRED  A number that creates a specific field of noise (like a seed)
    - Width (int): REQUIRED   The width of the array.
    - Height (int): REQUIRED  The height of the array.
    - Smooth Factor (int): The number of times the array will be 'smoothed'. Smoothening the array will make all numbers closer to their neighboring values. Default is 1.
    - Range (double): The Maximum value of an element (the minimum will always be 0). Default is 1.


*************************************************************************************************************************************************************/


function createPerlinNoise(x, width, height, smoothFactor, range) {
  smoothFactor == undefined ? smoothFactor = 1 : "";
  range == undefined ? range = 1 : "";
  
  height += Number(smoothFactor)
  
  var RANDOM = (x) => {
    // CHAOS THEORY - THE LOGISTIC MAP EQUATION (x[n] = r * x[n-1] * (1 - x[n-1]))
    var vals = [Math.abs(Math.sin(Math.sqrt(Math.E)*(Math.round(x+5)**3)))]
    
    for (var i = 0;i < 20;i++) {vals.push(3.75*vals[vals.length-1]*(1 - vals[vals.length-1]))}
    
    return vals[vals.length-1] * range
  }
  
  // Creating the field
  var field = []
  
  for (var i = 0;i < width;i++) {
    field.push(new Array())
    for (var k = 0;k < height;k++) {
      field[i].push(Math.abs(RANDOM(x + i + k)))
    }
  }
  
  // Smoothening the field
  for (var z = 0;z < smoothFactor;z++) {
    var newField = []
  
    // Initialize the array
    for (var i = 0;i < field.length;i++) {
      newField.push([])
      for (var k = 0;k < field[i].length;k++) {
        newField[i].push(0)
      }
    }
    
    // Top Left Corner
    newField[0][0] = (field[0][0] + field[0][1] + field[1][0] + field[1][1])/4
    // Top right Corner
    newField[field.length-1][0] = (field[field.length-1][0] + field[field.length-2][0] + field[field.length-1][1] + field[field.length-2][1])/4
    // Bottom Left Corner
    newField[0][field[0].length-1] = (field[0][field[0].length-1] + field[0][field[0].length-2] + field[1][field[0].length-1] + field[1][field[0].length-2])/4
    // Bottom Right Corner
    newField[field.length-1][field[field.length-1].length-1] = (field[field.length-1][field[field.length-1].length-1] + field[field.length-2][field[field.length-1].length-1] + field[field.length-1][field[field.length-1].length-2] + field[field.length-2][field[field.length-1].length-2])/4
    // 1st Column
    for (var i = 1;i < field[0].length - 1;i++) {
      var sum = (field[0][i-1] + field[0][i] + field[0][i+1] + field[1][i-1] + field[1][i] + field[1][i+1])/6
      newField[0][i] = sum
    }
    // Last Column
    for (var i = 1;i < field[field.length-1].length - 1;i++) {
      var sum = (field[field.length-1][i-1] + field[field.length-1][i] + field[field.length-1][i+1] + field[field.length-2][i-1] + field[field.length-2][i] + field[field.length-2][i+1])/6
      newField[field.length-1][i] = sum
    }
    // Top Row
    for (var i = 1;i < field.length - 1;i++) {
      var sum = (field[i-1][0] + field[i][0] + field[i+1][0] + field[i-1][1] + field[i][1] + field[i+1][1])/6
      newField[i][0] = sum
    }
    // Bottom Row
    for (var i = 1;i < field.length - 1;i++) {
      var sum = (field[i-1][field[i].length-1] + field[i][field[i].length-1] + field[i+1][field[i].length-1] + field[i-1][field[i].length-2] + field[i][field[i].length-2] + field[i+1][field[i].length-2])/6
      newField[i][field.length-1] = sum
    }
    // Main Box 
    for (var i = 1;i < field.length - 1;i++) {
      for (var k = 1;k < field[i].length - 1;k++) {
        var sum = field[i-1][k-1] + field[i][k-1] + field[i+1][k-1] + field[i-1][k] + field[i][k] + field[i+1][k] + field[i-1][k+1] + field[i][k+1] + field[i+1][k+1];
        sum /= 9;
        newField[i][k] = sum
      }
    }
    field = newField
  }
  return field;
}