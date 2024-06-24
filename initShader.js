function initShaders(gl, vertexSource, fragmentSource) {
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  let program = createProgram(gl, vertexShader, fragmentShader);
  if (program) {
    gl.useProgram(program);
    gl.program = program;
    return true;
  } else {
    console.log("Failed to create program.");
    return false;
  }
}

/**
 * 创建着色器程序
 * @param {*} gl
 * @param {*} type
 * @param {*} source
 * @returns
 */
function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (compiled) {
    return shader;
  } else {
    let error = gl.getShaderInfoLog(shader);
    console.log("compile shaders error: " + error);
    gl.deleteShader(shader);
    return null;
  }
}

/**
 * 创建着色器程序
 * @param {*} gl
 * @param {*} vertexShader
 * @param {*} fragmentShader
 * @returns
 */
function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (linked) {
    return program;
  } else {
    let error = gl.getProgramInfoLog(program);
    console.log("link program error:" + error);
    gl.deleteProgram(program);
    gl.deleteSHader(vertexShader);
    gl.deleteShader(fragmentShader);
  }
}
