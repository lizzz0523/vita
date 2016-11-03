import DisplayObject from './display/DisplayObject';
import Container from './display/Container';
import Stage from './display/Stage';
import Sprite from './display/Sprite';
import Shape from './display/Shape';
import Graphics from './display/Graphics';
import Rectangle from './geometry/Rectangle';

let vitajs = window.vitajs = {};

vitajs.DisplayObject = DisplayObject;
vitajs.Container = Container;
vitajs.Stage = Stage;
vitajs.Sprite = Sprite;
vitajs.Shape = Shape;
vitajs.Graphics = Graphics;
vitajs.Graphics.Rectangle = Rectangle;