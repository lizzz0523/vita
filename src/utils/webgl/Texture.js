export default class Texture {
    constructor(gl, type) {
        this.gl = gl;
        this.texture = gl.createTexture();
        this.type_ = type;
    }

    write(data, level, colorType, dataType) {
        let gl = this.gl,
            texture = this.texture,
            type = this.type_;

        gl.bindTexture(type, texture);
        gl.texImage2D(type, level, colorType, colorType, dataType, data);
        gl.bindTexture(type, null);
    }

    bind(location, index) {
        let gl = this.gl,
            texture = this.texture,
            type = this.type_;

        gl.activeTexture(gl['TEXTURE' + index]);
        gl.bindTexture(type, texture);
        gl.texParameteri(type, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(type, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.uniform1i(location, index);
    }

    drop() {
        let gl = this.gl,
            texture = this.texture;

        gl.deleteTexture(texture);

        this.gl = null;
        this.texture = null;
        this.type_ = 0;
    }
}