import { vec3, mat4 } from 'gl-matrix';

export default class DisplayObject {
    constructor() {
        this.program = null;
        this.name = '';
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
        this.pivotX = 0;
        this.pivotY = 0;
        this.pivotZ = 0;
    }

    init(root) {
        
    }

    drop(root) {
        
    }

    draw(root) {
        
    }
}