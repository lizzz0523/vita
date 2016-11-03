export default class Buffer {
    constructor(gl, type) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.type_ = type;
    }

    write(data, drawType) {
        let gl = this.gl,
            buffer = this.buffer,
            type = this.type_;

        gl.bindBuffer(type, buffer);
        gl.bufferData(type, data, drawType);
        gl.bindBuffer(type, null);
    }

    bind(location, size, dataType) {
        let gl = this.gl,
            buffer = this.buffer,
            type = this.type_;

        switch (type) {
            case gl.ARRAY_BUFFER:
            
            gl.bindBuffer(type, buffer);
            gl.vertexAttribPointer(location, size, dataType, false, 0, 0);
            gl.enableVertexAttribArray(location);
            
            break;
            
            case gl.ELEMENT_ARRAY_BUFFER:
            
            gl.bindBuffer(type, buffer);
            
            break;
        }
    }

    drop() {
        let gl = this.gl,
            buffer = this.buffer;

        gl.deleteBuffer(buffer);

        this.gl = null;
        this.buffer = null;
        this.type_ = 0;
    }
}