import { Program, Buffer, Texture } from '../utils/webgl';
import DisplayObject from './DisplayObject';
import Rectangle from '../geometry/Rectangle';

let VERTEX_SHADER_SOURCE = `
    attribute vec4 a_VertexPosition;
    attribute vec4 a_VertexNormal;
    attribute vec2 a_TextureCoord;
    uniform mat4 u_ProjectMatrix;
    uniform mat4 u_ModelViewMatrix;
    uniform mat4 u_NormalMatrix;
    varying vec3 v_VertexPosition;
    varying vec3 v_VertexNormal;
    varying highp vec2 v_TextureCoord;

    void main() {
        vec4 vertexPosition =  u_ModelViewMatrix * a_VertexPosition;
        vec4 vertexNormal = u_NormalMatrix * a_VertexNormal;
        
        v_VertexPosition = vertexPosition.xyz;
        v_VertexNormal = vertexNormal.xyz;
        v_TextureCoord = a_TextureCoord;

        gl_Position = u_ProjectMatrix * vertexPosition;
    }
`;

let FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    varying vec3 v_VertexPosition;
    varying vec3 v_VertexNormal;
    varying highp vec2 v_TextureCoord;
    uniform vec3 u_LightAmbientColor;
    uniform sampler2D u_Sampler;
    uniform float u_Alpha;

    void main() {
        gl_FragColor = vec4(u_LightAmbientColor, u_Alpha) * texture2D(u_Sampler, v_TextureCoord);
    }
`;

export default class Sprite extends DisplayObject {
    constructor(image, frame) {
        super();

        this.geometry = new Rectangle(frame.width, frame.height);
        this.alpha = 1.0;
        this.image = image;
    }

    init(root) {
        let gl = root.gl;

        let program = new Program(gl);

        program.attach(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
        program.attach(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
        program.link();

        this.program = program;

        let indicesBuffer = new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER),
            verticesBuffer = new Buffer(gl, gl.ARRAY_BUFFER),
            uvsBuffer = new Buffer(gl, gl.ARRAY_BUFFER);

        indicesBuffer.write(new Uint16Array(this.geometry.indices), gl.STATIC_DRAW);
        verticesBuffer.write(new Float32Array(this.geometry.vertices), gl.STATIC_DRAW);
        uvsBuffer.write(new Float32Array(this.geometry.uvs), gl.STATIC_DRAW);

        this.indicesBuffer = indicesBuffer;
        this.verticesBuffer = verticesBuffer;
        this.uvsBuffer = uvsBuffer;

        let texture = new Texture(gl, gl.TEXTURE_2D);

        texture.write(this.image, 0, gl.RGBA, gl.UNSIGNED_BYTE);

        this.texture = texture;
    }

    drop(root) {
        this.indicesBuffer.drop();
        this.verticesBuffer.drop();
        this.uvsBuffer.drop();
        this.texture.drop();
        this.program.drop();
    }

    draw(root) {
        let gl = root.gl;

        // 写入顶点数据
        this.indicesBuffer.bind();
        this.verticesBuffer.bind(this.program.attribs.a_VertexPosition, 3, gl.FLOAT);
        this.uvsBuffer.bind(this.program.attribs.a_TextureCoord, 2, gl.FLOAT);

        this.texture.bind(this.program.uniforms.u_Sampler, 0);

        // 写入颜色数据
        gl.uniform1f(this.program.uniforms.u_Alpha, this.alpha);

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}