import { vec4 } from 'gl-matrix';
import { hex2Array } from '../utils/color';
import Rectangle from '../geometry/Rectangle';
import RoundedRectangle from '../geometry/RoundedRectangle';
import Ellipse from '../geometry/Ellipse';
import Cube from '../geometry/Cube';
import Sphere from '../geometry/Sphere';
import Polygon from '../geometry/Polygon';

export default class Graphics {
    constructor() {

    }

    setStyle(style) {
        this.color = vec4.fromValues.apply(vec4, hex2Array(style.color || 0xffffff));
    }

    drawRect(width, height) {
        this.drawGeometry(new Rectangle(width, height));
    }

    drawRoundedRect(width, height, radius) {
        this.drawGeometry(new RoundedRectangle(width, height, radius));
    }

    drawCircle(radius) {
        this.drawGeometry(new Ellipse(radius, radius));
    }

    drawEllipse(width, height) {
        this.drawGeometry(new Ellipse(width, height));
    }

    drawCube(width, height, depth) {
        this.drawGeometry(new Cube(width ,height, depth));
    }

    drawSphere(radius) {
        this.drawGeometry(new Sphere(radius));
    }

    drawPolygon(points) {
        this.drawGeometry(new Polygon(points));
    }

    drawGeometry(geometry) {
        this.geometry = geometry;
        this.size = geometry.indices.length;
    }
}