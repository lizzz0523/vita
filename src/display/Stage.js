import { mat4, vec3, vec4 } from 'gl-matrix';
import { getContext } from '../utils/webgl';
import Container from './Container';

export default class Stage extends Container {
    constructor(canvas) {
        super();

        this._root = true;

        this._projectMatrix = mat4.create();
        this._modelViewMatrix = mat4.create();
        this._normalMatrix = mat4.create();
        this._matrixStack = [];

        this._lightAmbientColor = vec3.fromValues(1.0, 1.0, 1.0);

        this._initContext(canvas);
    }

    _initContext(canvas) {
        let gl = this.gl = getContext(canvas, {
            alpha: false,
            antialias: false
        });
        
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.enable(gl.DEPTH_TEST);
        // gl.enable(gl.CULL_FACE);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    _resetContext() {
        let gl = this.gl;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    _setProjectMatrix() {
        let gl = this.gl;

        gl.uniformMatrix4fv(gl.program.uniforms.u_ProjectMatrix, false, this._projectMatrix);
    }

    _setModelViewMatrix() {
        let gl = this.gl;

        gl.uniformMatrix4fv(gl.program.uniforms.u_ModelViewMatrix, false, this._modelViewMatrix);
        gl.uniformMatrix4fv(gl.program.uniforms.u_NormalMatrix, false, this._normalMatrix);
    }

    _setGlobalLight() {
        let gl = this.gl;

        gl.uniform3fv(gl.program.uniforms.u_LightAmbientColor, this._lightAmbientColor);
    }

    orthogonal(left, right, bottom, top, near, far) {
        mat4.ortho(this._projectMatrix, left, right, bottom, top, near, far);
    }

    perspective(fovy, aspect, near, far) {
        mat4.perspective(this._projectMatrix, fovy, aspect, near, far);
    }

    update() {
        this._resetContext();

        this.draw(this);
    }

    pushMatrix() {
        this._matrixStack.push(mat4.clone(this._modelViewMatrix));
    }

    popMatrix() {
        if (!this._matrixStack.length) {
            console.error('matrix stack is empty');
            return;
        }

        this._modelViewMatrix = this._matrixStack.pop();
    }

    updateProgram(target) {
        let gl = this.gl;

        if (!target.program) {
            return;
        }

        gl.program = target.program;
        gl.program.bind();
        
        this._setGlobalLight();
        this._setProjectMatrix();
    }

    updateMatrix(target) {
        let modelViewMatrix = this._modelViewMatrix;

        mat4.translate(modelViewMatrix, modelViewMatrix, vec3.fromValues(target.x, target.y, target.z));
        mat4.scale(modelViewMatrix, modelViewMatrix, vec3.fromValues(target.scaleX, target.scaleY, target.scaleZ));
        
        mat4.translate(modelViewMatrix, modelViewMatrix, vec3.fromValues(target.pivotX, target.pivotY, target.pivotZ));
        mat4.rotateX(modelViewMatrix, modelViewMatrix, target.rotateX);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, target.rotateY);
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, target.rotateZ);
        mat4.translate(modelViewMatrix, modelViewMatrix, vec3.fromValues(-target.pivotX, -target.pivotY, -target.pivotZ));

        let normalMatrix = mat4.create();

        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        this._modelViewMatrix = modelViewMatrix;
        this._normalMatrix = normalMatrix;

        if (!target.program) {
            return;
        }

        this._setModelViewMatrix();
    }
}