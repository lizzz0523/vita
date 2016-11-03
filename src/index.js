import DisplayObject from './display/DisplayObject';
import Container from './display/Container';
import Stage from './display/Stage';
import Sprite from './display/Sprite';
import Shape from './display/Shape';
import Graphics from './display/Graphics';
import Rectangle from './geometry/Rectangle';
import RoundedRectangle from './geometry/RoundedRectangle';
import Ellipse from './geometry/Ellipse';
import Cube from './geometry/Cube';
import Sphere from './geometry/Sphere';
import Polygon from './geometry/Polygon';

let vitajs = window.vitajs = {};

vitajs.DisplayObject = DisplayObject;
vitajs.Container = Container;
vitajs.Stage = Stage;
vitajs.Sprite = Sprite;
vitajs.Shape = Shape;
vitajs.Graphics = Graphics;
vitajs.Graphics.Rectangle = Rectangle;
vitajs.Graphics.RoundedRectangle = RoundedRectangle;
vitajs.Graphics.Ellipse = Ellipse;
vitajs.Graphics.Cube = Cube;
vitajs.Graphics.Sphere = Sphere;
vitajs.Graphics.Polygon = Polygon;