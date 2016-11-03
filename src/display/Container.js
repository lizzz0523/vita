import DisplayObject from './DisplayObject';
import { indexOf } from '../utils/lang';

export default class Container extends DisplayObject {
    constructor() {
        super();

        this._root = false;
        this._children = [];
    }

    init(root) {
        this._children.forEach(child => {
            child.init(root);
        });
    }

    drop(root) {
        this._children.forEach(child => {
            child.drop(root);
        });
    }

    draw(root) {
        this._children.forEach(child => {
            root.pushMatrix();

            root.updateProgram(child);
            root.updateMatrix(child);

            child.draw(root);
        
            root.popMatrix();
        });
    }

    _getRoot() {
        let node = this;

        while (node) {
            if (node._root) {
                return node;
            }

            node = node._parent;
        }

        return null;
    }

    _initChild(child) {
        let root = this._getRoot();

        if (root) {
            child.init(root);
        }
    }

    _dropChild(child) {
        let root = this._getRoot();

        if (root) {
            child.drop(root);
        }
    }

    addChild(child) {
        return this.addChildAt(child, this._children.length);
    }

    addChildAt(child, index) {
        if (child == null) {
            return child;
        }

        if (child._parent) {
            child._parent.removeChild(child);
        }

        this._children.splice(index, 0, child);

        child._parent = this;
        child._parent._initChild(child);

        return child;
    }

    removeChild(child) {
        return this.removeChildAt(indexOf(this._children, child));
    }

    removeChildAt(index) {
        if (index < 0 && index > this._children.length - 1) {
            return null;
        }

        let child = this._children[index];

        this._children.splice(index, 1);

        child._parent._dropChild(child);
        child._parent = null;

        return child;
    }

    getChildAt(index) {
        return this._children[index] || null;
    }

    getChildByName(name) {
        let index = indexOf(this._children, child => child.name === name);

        return this.getChildAt(index);
    }
}