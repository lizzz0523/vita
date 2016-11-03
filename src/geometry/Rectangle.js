export default class Rectangle {
    constructor(width, height) {
        let vertices = [],
            normals = [],
            uvs = [];

        let w1 = width / 2,
            h1 = height / 2,
            z1 = 1.0,
            s1 = 0.0,
            t1 = 0.0,
            s2 = 1.0,
            t2 = 1.0;

        vertices.push(-w1, h1, 0.0);
        vertices.push(w1, h1, 0.0);
        vertices.push(-w1, -h1, 0.0);
        vertices.push(w1, -h1, 0.0);
        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);
        uvs.push(s1, t2);
        uvs.push(s2, t2);
        uvs.push(s1, t1);
        uvs.push(s2, t1);

        this.vertices = vertices;
        this.normals = normals;
        this.uvs = uvs;

        let indices = [];

        indices.push(0, 1, 2);
        indices.push(1, 3, 2);

        this.indices = indices;
    }
}