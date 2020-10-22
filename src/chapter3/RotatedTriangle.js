import {  Matrix4, Vector3, Vector4 } from '../lib/cuon-matrix';
import { initShaders, createProgram, loadShader, getWebGLContext } from '../lib/cuon-utils';
import WebGLDebugUtils from '../lib/webgl-debug';
import WebGLUtils from '../lib/webgl-utils';
import vshader from './XformMatrix.vert';
import fshader from './PlainColor.frag';

function initVertexBuffers(gl) {
  const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ]);
  const n = 3;
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT,false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}

const ANGLE = 90.0;

function main() {
  const canvas = document.getElementById('webgl');

  const gl = getWebGLContext(canvas);

  if (!initShaders(gl, vshader, fshader)) {
    console.log('Failed to init shaders');
    return;
  }

  const n = initVertexBuffers(gl);

  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  const radian = Math.PI * ANGLE / 180.0;
  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

  const xformMatrix = new Float32Array([
    cosB,  sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0,   0.0,  1.0, 0.0,
    0.0,   0.0,  0.0, 1.0 
  ]);

  const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

main();
