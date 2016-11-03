export default class Program {
    constructor(gl) {
        this.gl = gl;
        this.program = gl.createProgram();
        this.first_ = true;
    }

    extractAttribs_() {
        let gl = this.gl,
            program = this.program,

            attribs = {},
            totalAttrib = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (let i = 0; i < totalAttrib; i++) {
            let attrib = gl.getActiveAttrib(program, i),
                name = attrib.name;
            
            attribs[name] = gl.getAttribLocation(program, name);
        }

        this.attribs = attribs;
    }

    extractUniforms_() {
        let gl = this.gl,
            program = this.program,

            uniforms = {},
            totalUniform = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < totalUniform; i++) {
            let uniform = gl.getActiveUniform(program, i),
                name = uniform.name.replace('[0]', '');

            uniforms[name] = gl.getUniformLocation(program, name);
        }

        this.uniforms = uniforms;
    }

    attach(source, type) {
        let gl = this.gl,
            program = this.program,
            shader;

        switch (type) {
            case gl.VERTEX_SHADER:
            
            shader = this.vertexShader_ = gl.createShader(type);
            
            break;
            
            case gl.FRAGMENT_SHADER:
            
            shader = this.fragmentShader_ = gl.createShader(type);
            
            break;
        }

        gl.attachShader(program, shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        let status = gl.getShaderParameter(shader, gl.COMPILE_STATUS),
            error = gl.getShaderInfoLog(shader);

        if (!status) {
            gl.deleteShader(shader);

            throw Error(error);
        }
    }

    link() {
        let gl = this.gl,
            program = this.program;

        gl.linkProgram(program);

        let status = gl.getProgramParameter(program, gl.LINK_STATUS),
            error = gl.getProgramInfoLog(program);

        if (!status) {
            gl.deleteProgram(program);

            throw Error(error);
        }
    }

    bind() {
        let gl = this.gl,
            program = this.program;

        let first = this.first_,
            vertexShader = this.vertexShader_,
            fragmentShader = this.fragmentShader_;

        if (first) {
            this.extractAttribs_();
            this.extractUniforms_();

            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);

            this.first_ = false;
            this.vertexShader_ = null;
            this.fragmentShader_ = null;
        }

        gl.useProgram(program);
    }

    drop() {
        let gl = this.gl,
            program = this.program;

        gl.deleteProgram(program);

        this.gl = null;
        this.program = null;
        this.attribs = {};
        this.uniforms = {};
        this.first_ = true;
    }
};