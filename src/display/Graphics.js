import { vec4 } from 'gl-matrix';
import { hex2Array } from '../utils/color';
import Rectangle from '../geometry/Rectangle';
import Ellipse from '../geometry/Ellipse';
import Cube from '../geometry/Cube';

export default class Graphics {
    constructor() {

    }

    setStyle(style) {
        this.color = vec4.fromValues.apply(vec4, hex2Array(style.color || 0xffffff));
    }

    drawRect(width, height) {
        this.geometry = new Rectangle(width, height);
        this.size = this.geometry.indices.length;
    }

    drawCircle(radius) {
        this.geometry = new Ellipse(radius, radius);
        this.size = this.geometry.indices.length;
    }

    drawEllipse(width, height) {
        this.geometry = new Ellipse(width, height);
        this.size = this.geometry.indices.length;
    }

    drawCube(width, height, depth) {
        this.geometry = new Cube(width ,height, depth);
        this.size = this.geometry.indices.length;
    }
}