export default class Rectangle {
    constructor(width, height) {
        let vertices = [],
            normals = [];

        let w = width / 2,
            h = height / 2,
            z = 1.0;

        vertices.push(-w, h, 0.0);
        vertices.push(w, h, 0.0);
        vertices.push(-w, -h, 0.0);
        vertices.push(w, -h, 0.0);
        normals.push(0.0, 0.0, z);
        normals.push(0.0, 0.0, z);
        normals.push(0.0, 0.0, z);
        normals.push(0.0, 0.0, z);

        this.vertices = vertices;
        this.normals = normals;

        let indices = [];

        indices.push(0, 1, 2);
        indices.push(1, 3, 2);

        this.indices = indices;
    }
}