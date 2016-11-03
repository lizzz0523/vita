import { vec4 } from 'gl-matrix';
import { hex2Array } from '../utils/color';
import Rectangle from '../geometry/Rectangle';

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
}