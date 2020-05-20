"use strict"
window.onload = function () {
        let svg1 = document.getElementById("svg1");
        let field = [0, 0, 0,
                    0, 0, 0,
                    0, 0, 0];
        let blank = 0, X = 1, O = -1;
        let mouse = {x:-1, y:-1};
        let count = 0;
        let startPlayer = 1;
        let end = false;
        let cellSize = 150;


        svg1.addEventListener("mousemove", mouseXY);

        svg1.addEventListener("click", play);



        function playgame(cell){
            while (end == false){
                if(field[cell] != blank){
                return;
            }
            field[cell] = startPlayer;
            controlPlayers();
            checkTie(startPlayer);
            checkWin(startPlayer);
            startPlayer *= -1;
            }

        };



        function checkWin(XO) {
            if (((field[0] == XO) && (field[1] == XO) && (field[2] == XO)) ||
                ((field[3] == XO) && (field[4] == XO) && (field[5] == XO)) ||
                ((field[6] == XO) && (field[7] == XO) && (field[8] == XO)) ||
                ((field[0] == XO) && (field[4] == XO) && (field[8] == XO)) ||
                ((field[2] == XO) && (field[4] == XO) && (field[6] == XO)) ||
                ((field[0] == XO) && (field[3] == XO) && (field[6] == XO)) ||
                ((field[1] == XO) && (field[4] == XO) && (field[7] == XO)) ||
                ((field[2] == XO) && (field[5] == XO) && (field[8] == XO))){
                        if (XO == 1){
                            win.innerHTML = "X's wins!";
                            win.style.padding = "40px";
                            win.style.boxShadow = "0 0 0 20px #d4d26e";
                        }else{
                            win.innerHTML = "O's wins!";
                            win.style.padding = "40px";
                            win.style.boxShadow = "0 0 0 20px #d4d26e";
                        }
                    end = true;
                }
            return;
        };


        function checkTie(player) {
            if (field.indexOf(blank) == -1){
                win.innerHTML = "It's a tie!";
                win.style.padding = "40px";
                win.style.boxShadow = "0 0 0 20px #d4d26e";
                return;
            }
            
        };


        function makeLines(xs, ys, xe, ye, color, sw) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', xs);
            line.setAttribute('y1', ys);
            line.setAttribute('x2', xe);
            line.setAttribute('y2', ye);
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', sw);
            svg1.appendChild(line);
        };

        
        function makeCircle(cx, cy, r, color, colorFill, sw) {
            let circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circles.setAttribute("cx",cx);
            circles.setAttribute("cy",cy);
            circles.setAttribute("r",r);
            circles.setAttribute('stroke', color);
            circles.setAttribute('fill', colorFill);
            circles.setAttribute('stroke-width', sw);
            svg1.appendChild(circles);
        };

        function makeRectangle(fill, x, y, height, width){
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute("fill", fill);
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('height', height);
            rect.setAttribute('width', width);
            rect.setAttribute("position", "fixed");
            svg1.appendChild(rect);
        };


        function drawField() {
            //first vertical line
            makeLines(cellSize, 0, cellSize, cellSize * 3, '#545454', 15);

            //second vertical line
            makeLines(cellSize * 2, 0,cellSize * 2, cellSize * 3, '#545454', 15);

            //first horizontal line
            makeLines(0, cellSize, cellSize * 3, cellSize, '#545454', 15);

            //second horizontal line
            makeLines(0, cellSize * 2, cellSize * 3, cellSize * 2, '#545454', 15);
        };


        function coordinatesXY (cell){
            let xx = (cell % 3) * cellSize;
            let yy = Math.floor(cell / 3) * cellSize;
            return {
                "x": xx, "y": yy,
            }
        };


        function drawXO(){
            for (let i = 0; i < field.length; i++) {
                let XY = coordinatesXY(i);
                if (field[i] == X) {
                    makeLines(XY.x + cellSize/6, XY.y + cellSize/6, XY.x + cellSize/1.2, XY.y + cellSize/1.2, '#b86e9f', 15);
                    makeLines(XY.x + cellSize/1.2, XY.y + cellSize/6, XY.x + cellSize/6, XY.y + cellSize/1.2, '#b86e9f', 15);
                } else if (field[i] == O) {
                    makeCircle(XY.x + cellSize/2, XY.y + cellSize/2, cellSize/3, "#32a2a8", "white", 15)
                }
            }
            requestAnimationFrame(drawXO);
        };

 
        function getOffset(element)
        {
            let bound = element.getBoundingClientRect();
            let html = document.documentElement;

            return {
                top: bound.top + window.pageYOffset - html.clientTop,
                left: bound.left + window.pageXOffset - html.clientLeft
            }
        };


        function mouseXY(a) {
            let offset = getOffset(svg1);
            let x = a.pageX - offset.left;
            let y = a.pageY - offset.top;
            mouse.x = x;
            mouse.y = y;
        };
        

        function controlPlayers(){
                count += 1;
                let turn = document.getElementById("turn");
                if (count % 2 == 0) {
                    turn.innerHTML = "Next turn: X" 
                } else {
                    turn.innerHTML = "Next turn: O"
                }
                return count;
            }


        function play(){
            playgame(getCellByCoords(mouse.x, mouse.y));
        };



        function getCellByCoords (x, y) {
                let x1 = (Math.floor(x / cellSize) % 3);
                let x2 = (Math.floor(y / cellSize) * 3);
                return (x1 + x2);
            };
    

        drawField();
        drawXO();
}