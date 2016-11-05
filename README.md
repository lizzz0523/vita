### VitaJS
#### a webgl engine using with createjs suite

#### Demo
__2048 game__
![image](https://raw.githubusercontent.com/lizzz0523/vita/master/examples/assets/qrcode.png)

#### Usage
```javascript
    var { Stage, Shape } = vitajs;

    var stage = new Stage(canvas);

    stage.perspective(45, canvas.width / canvas.height, 0.1, 1000);

    var rect = new Shape();

    rect.graphics.setStyle({ color: 0xff0000 });
    rect.graphics.drawRect(1, 1);

    stage.addChild(rect);
    stage.update();
```