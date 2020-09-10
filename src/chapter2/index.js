import {  Matrix4, Vector3, Vector4 } from '../lib/cuon-matrix';
import { initShaders, createProgram, loadShader, getWebGLContext } from '../lib/cuon-utils';
import WebGLDebugUtils from '../lib/webgl-debug';
import WebGLUtils from '../lib/webgl-utils';
import vshader from './HelloPoint1.vert';
import fshader from './HelloPoint1.frag';

function main() {
  const canvas = document.getElementById('webgl');

  const gl = getWebGLContext(canvas);

  if (!initShaders(gl, vshader, fshader)) {
    console.log('Failed to init shaders');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

main();
