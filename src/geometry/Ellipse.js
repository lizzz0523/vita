export default class Ellipse {
    constructor(width, height) {
        let step = Math.floor(15 * Math.sqrt(width + height));

        let vertices = [],
            normals = [];

        let w1 = width / 2,
            h1 = height / 2,
            z1 = 1.0;

        vertices.push(0.0, 0.0, 0.0);
        normals.push(0.0, 0.0, z1);

        for (let i = 0; i < step; i++) {
            let angle = 2 * Math.PI * i / step,
                cos = Math.cos(angle),
                sin = Math.sin(angle);

            vertices.push(cos * w1, sin * h1, 0.0);
            normals.push(0.0, 0.0, z1);
        }

        this.vertices = vertices;
        this.normals = normals;

        let indices = [];

        for (let i = 1; i <= step; i++) {
            if (i === step) {
                indices.push(0, i, 1);
            } else {
                indices.push(0, i, i + 1);
            }
        }

        this.indices = indices;
    }
}