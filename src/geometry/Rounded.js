import earcut from 'earcut';

export default class Rounded {
    constructor(width, height, radius) {
        let vertices = [],
            normals = [];

        let w = width / 2,
            h = height / 2,
            z = 1.0,
            r = radius;

        quadraticBezierCurve(vertices, radius, -w, h - r, -w, h, -w + r, h);
        quadraticBezierCurve(vertices, radius, w - r, h, w, h, w, h - r);
        quadraticBezierCurve(vertices, radius, w, -h + r, w, -h, w - r, -h);
        quadraticBezierCurve(vertices, radius, -w + r, -h, -w, -h, -w, -h + r);

        for (let i = 0; i < vertices.length; i++) {
            normals.push(0.0, 0.0, z);
        }

        this.vertices = vertices;
        this.normals = normals;

        let indices = earcut(vertices, null, 3);

        this.indices = indices;
    }
}

const getPoint = (n1, n2, perc) => {
    return n1 + (n2 - n1) * perc;
}

const quadraticBezierCurve = (vertices, radius, fromX, fromY, ctrlX, ctrlY, destX, destY) => {
    let step = Math.floor(15 * Math.sqrt(2 * radius));

    let xa, ya, xb, yb, x, y;

    for (let i = 0, j = 0; i <= step; i++) {
        j = i / step;

        xa = getPoint(fromX, ctrlX, j);
        ya = getPoint(fromY, ctrlY, j);
        xb = getPoint(ctrlX, destX, j);
        yb = getPoint(ctrlY, destY, j);

        x = getPoint(xa, xb, j);
        y = getPoint(ya, yb, j);

        vertices.push(x, y, 0.0);
    }
}