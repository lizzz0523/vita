import { Program, Buffer } from '../utils/webgl';
import DisplayObject from './DisplayObject';
import Graphics from './Graphics';

let VERTEX_SHADER_SOURCE = `
    attribute vec4 a_VertexPosition;
    // attribute vec4 a_VertexNormal;
    uniform mat4 u_ProjectMatrix;
    uniform mat4 u_ModelViewMatrix;
    uniform mat4 u_NormalMatrix;
    varying vec3 v_VertexPosition;
    // varying vec3 v_VertexNormal;

    void main() {
        vec4 vertexPosition =  u_ModelViewMatrix * a_VertexPosition;
        // vec4 vertexNormal = u_NormalMatrix * a_VertexNormal;
        
        v_VertexPosition = vertexPosition.xyz;
        // v_VertexNormal = vertexNormal.xyz;

        gl_Position = u_ProjectMatrix * vertexPosition;
    }
`;

let FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    varying vec3 v_VertexPosition;
    // varying vec3 v_VertexNormal;
    uniform vec3 u_LightAmbientColor;
    uniform vec4 u_Color;
    uniform float u_Alpha;

    void main() {
        gl_FragColor = vec4(u_LightAmbientColor, u_Alpha) * u_Color;
    }
`;

export default class Shape extends DisplayObject {
    constructor() {
        super();

        this.graphics = new Graphics();
        this.alpha = 1.0;
    }

    init(root) {
        let gl = root.gl;

        let program = new Program(gl);
        
        program.attach(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
        program.attach(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
        program.link();

        this.program = program;

        let indicesBuffer = new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER),
            verticesBuffer = new Buffer(gl, gl.ARRAY_BUFFER);

        indicesBuffer.write(new Uint16Array(this.graphics.geometry.indices), gl.STATIC_DRAW);
        verticesBuffer.write(new Float32Array(this.graphics.geometry.vertices), gl.STATIC_DRAW);

        this.indicesBuffer = indicesBuffer;
        this.verticesBuffer = verticesBuffer;
    }

    drop(root) {
        this.indicesBuffer.drop();
        this.verticesBuffer.drop();
        this.program.drop();
    }

    draw(root) {
        let gl = root.gl;

        // 写入顶点数据
        this.indicesBuffer.bind();
        this.verticesBuffer.bind(this.program.attribs.a_VertexPosition, 3, gl.FLOAT);

        // 写入颜色数据
        gl.uniform4fv(this.program.uniforms.u_Color, this.graphics.color);
        gl.uniform1f(this.program.uniforms.u_Alpha, this.alpha);

        gl.drawElements(gl.TRIANGLES, this.graphics.size, gl.UNSIGNED_SHORT, 0);
    }
}