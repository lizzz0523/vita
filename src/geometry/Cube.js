export default class Cube {
    constructor(width, height, depth) {
        let vertices = [],
            normals = [];

        let w1 = width / 2,
            h1 = height / 2,
            d1 = depth / 2;

        vertices.push(-w1, h1, d1);
        vertices.push(w1, h1, d1);
        vertices.push(-w1, -h1, d1);
        vertices.push(w1, -h1, d1);
        vertices.push(-w1, h1, -d1);
        vertices.push(w1, h1, -d1);
        vertices.push(-w1, -h1, -d1);
        vertices.push(w1, -h1, -d1);
        // normals.push()

        this.vertices = vertices;
        this.normals = normals;

        let indices = [];

        indices.push(0, 1, 2);
        indices.push(1, 3, 2);
        indices.push(5, 4, 7);
        indices.push(4, 6, 7);
        indices.push(4, 0, 6);
        indices.push(0, 2, 6);
        indices.push(1, 5, 3);
        indices.push(5, 7, 3);
        indices.push(4, 5, 0);
        indices.push(5, 1, 0);
        indices.push(2, 3, 6);
        indices.push(3, 7, 6);

        this.indices = indices;
    }
}