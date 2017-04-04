X = 500
Y = 500
//
// 2 laba
//
function det(A)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}


function mult(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

function module(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
}

function angleBetween(a, b) {
    return mult(a, b) / (module(a) * module(b));
}

function minus(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
}

function plus(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}



function side(a, b) {
    var mas = [minus(a[1], a[0]), minus(a[0], b)];
    detA = det(mas);
    if(detA > 0)
        return 1;
    else if (detA == 0)
        return 0;
    else
        return -1;
}

function intersect(a, b) {
    return side(a, b[0]) != side(a, b[1]) && side(b, a[0]) != side(b, a[1]);
}

//
// konec 2 labi
//


var figure= [];
for(var i = 0; i < 10; i++) {
    var p = [];
    p.push(Math.random() * X);
    p.push(Math.random() * Y);
    figure.push(p);
}

//refactor coordinates;
var figureOne = [];
for(var i = 0; i < figure.length; i++) {
    figureOne.push([figure[i][0], figure[i][1]]);
}

for(var i = 0; i < figureOne.length; i++) {
    figureOne[i][1] = Y - figureOne[i][1];
}

function drawFigure() {
    for(var i = 0; i < figureOne.length; i++) {
        ellipse(figureOne[i][0], figureOne[i][1], 5)
    }
}


var y_min = 0;
//Находим точку с минимальным y
for(var i = 1; i < figure.length; i++) {
    if(figure[i][1] < figure[y_min][1]) {
        y_min = i;
    }
}
//Находим углы точек
var angles = [];
var min_line = [1, 0];
for(var i = 0; i < figure.length; i++) {
    var angle = Math.acos(angleBetween(min_line, minus(figure[i], figure[y_min])))
    angles.push(angle);
}
//Находим NaN - это есть наша точка с минимальным y
for(var i = 0; i < angles.length; i++) {
    if(angles[i] < 10 || angles[i] > -10)
        console.log("ok");
    else {
        var temp = angles[i];
        angles[i] = angles[0];
        angles[0] = temp;

        var temp = figure[i];
        figure[i] = figure[0];
        figure[0] = temp;

        var temp = figureOne[i];
        figureOne[i] = figureOne[0];
        figureOne[0] = temp;

        break;
    }

}

for(var i = 0; i < figure.length; i++) {
    console.log(angles[i] + " - " + i);
}
//Сортируем все массивы по углам
for(var i = 1; i < angles.length - 1; i++) {
    var MIN = i;
    console.log("tut");
    for(var j = i + 1; j < angles.length; j++) {
        if(angles[j] < angles[MIN])
            MIN = j;
    }
   
    var temp = angles[i];
    angles[i] = angles[MIN];
    angles[MIN] = temp;

    temp = figure[i];
    figure[i] = figure[MIN];
    figure[MIN] = temp;

    temp = figureOne[i];
    figureOne[i] = figureOne[MIN];
    figureOne[MIN] = temp;
}
//Массивы с точками для новой фигуры
var newFigure = [];
newFigure[0] = figureOne[0];
newFigure[1] = figureOne[1];

var newFigureReal = [];
newFigureReal[0] = figure[0];
newFigureReal[1] = figure[1];

var stepCount = 2;

function step() {//функция для шага
    if(stepCount > 9) //если прошли все точки
        return 0;//ничего не делаем

    if(side([newFigureReal[newFigureReal.length - 2], newFigureReal[newFigureReal.length - 1]], figure[stepCount]) == -1){ // если левее
        newFigure.push(figureOne[stepCount]); // засовываем точку
        newFigureReal.push(figure[stepCount]);
    }
    else { // иначе
        newFigureReal.pop(); //удаляем последнюю
        newFigure.pop();
        stepCount--;
    }

    if(stepCount == 9) { //если шаг последний
        newFigureReal.push(newFigureReal[0]); // добавляем перву чтоб рисовать линию
        newFigure.push(newFigure[0]); // от последней до первой
    }

    stepCount++;
}

function drawLines() {
    for(var i = 0; i < newFigure.length - 1; i++) {
        line(newFigure[i][0], newFigure[i][1], newFigure[i+1][0], newFigure[i+1][1]);
    } 
}

//
//
//
//
//

function setup() {
    createCanvas(X, Y);
    frameRate(1);
}

function draw() {
    background(51);
    stroke(255);
    drawFigure();
    step();
    drawLines();
}
