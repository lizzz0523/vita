export default class Rectangle {
    constructor(width, height) {
        let vertices = [];

        let w1 = width / 2,
            h1 = height / 2;

        vertices.push(-w1, h1, 0.0);
        vertices.push(w1, h1, 0.0);
        vertices.push(w1, -h1, 0.0);
        vertices.push(-w1, -h1, 0.0);

        this.vertices = vertices;

        let normals = [];

        var z1 = 1.0;

        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);
        normals.push(0.0, 0.0, z1);

        this.normals = normals;

        let uvs = [];

        let s1 = 0.0,
            t1 = 0.0,
            s2 = 1.0,
            t2 = 1.0;

        uvs.push(s1, t2);
        uvs.push(s2, t2);
        uvs.push(s2, t1);
        uvs.push(s1, t1);

        this.uvs = uvs;

        this.indices = [
            0, 1, 3,
            1, 3, 2
        ];
    }
}