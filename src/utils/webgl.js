export const getContext = (canvas, options) => {
    return canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options)
}

import Program from './webgl/Program';
import Buffer from './webgl/Buffer';
import Texture from './webgl/Texture';

export { Program, Buffer, Texture };