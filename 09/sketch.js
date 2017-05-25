"use strict";

let X = 600;
let Y = 600; 
//
// 2 laba
//
function det(A)
{
    let N = A.length, B = [], denom = 1, exchanges = 0;
    for (let i = 0; i < N; ++i)
     { B[i] = [];
       for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (let i = 0; i < N-1; ++i)
     { let maxN = i, maxValue = Math.abs(B[i][i]);
       for (let j = i+1; j < N; ++j)
        { let value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       let value1 = B[i][i];
       for (let j = i+1; j < N; ++j)
        { let value2 = B[j][i];
          B[j][i] = 0;
          for (let k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function perimeter() {
    let result = 0;

    for(let i = 0; i < convex.length - 1; i++) {
        result += distance(convex[i], convex[i + 1]);
    }

    return result;
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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
    let mas = [minus(a[1], a[0]), minus(a[0], b)];
    let detA = det(mas);
    if(detA > 0)
        return 1;
    else if (detA == 0) {
        return 0;
    }
    else
        return -1;
}

function intersect(a, b) {
    return side(a, b[0]) != side(a, b[1]) && side(b, a[0]) != side(b, a[1]);
}

function triangle_area(first, second, third) {
    let a = distance(first, second);
    let b = distance(second, third);
    let c = distance(first, third);
    let p = (a + b + c) / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

//
// konec 2 labi
//

let points = [];

for(let i = 0; i < 10; i++) {
    let x = Math.random() * (X - 100) + 50;
    let y = Math.random() * (Y - 100) + 50;
    let r = Math.random() * Math.PI * 2;
    let tempPoint = new Point(x, y, r);
    points.push(tempPoint);
}

let restoreArray = points.slice();

function drawPoints() {
    fill(255, 255, 255);
    for(let i = 0; i < points.length; i++) {
        ellipse(points[i].x, Y - points[i].y, 15);
    }
}


function distance1(A, B, C) {
    let ABx = B.x - A.x;
    let ABy = B.y - A.y;
    let num = ABx * (A.y - C.y) - ABy * (A.x - C.x);
    if(num < 0) {
        num = -num;
    }
    return num;
}

//Массивы с точками для новой фигуры


function drawLine() {
    for(let i = 0; i < convex.length - 1; i++) {
        line(convex[i].x, Y - convex[i].y, convex[i+1].x, Y - convex[i+1].y);
    }
}

function movePoints() {
    for(let i = 0; i < points.length; i++) {
        points[i].move();
    }
}

function closed_pair_bruteforce(points) { // узнает ближайшую пару точек брутфорсом (юзаем если массив точек из 3х элементов)
    let min_dist = distance(points[0], points[1]);
    let min_points = [points[0], points[1]];
        for(let i = 0; i < points.length; i++) {
            for(let j = 0; j < points.length; j++) {
                if (i != j && distance(points[i], points[j]) < min_dist) {
                    min_dist = distance(points[i], points[j]);
                    min_points = [points[i], points[j]];
                }
            }
        }
    return min_points;
}

function closed_pair_recursive(points_x, points_y) { // алгоритм собственно
    if(points_x.length <= 3) { // если 3 точки
        return closed_pair_bruteforce(points_x); // то узнаем расстояние брутфорсом
    } else {
        let min_dist;
        let min_points;
        let mid = Math.floor(points_x.length / 2); // середина массива
        let points_x_l = points_x.slice(0, mid); // делим массив, отсортированный по x-ам
        let points_x_r = points_x.slice(mid, points_x.length); // на два массива, т.е. по центру

        let points_y_l = [];
        let points_y_r = [];

        for(let i = 0; i < points_y.length; i++) { // распихиваем точки из массива, отсортированного по y
            if(points_y[i].x <= points_x_l[points_x_l.length - 1].x) { // в два массива
                points_y_l.push(points_y[i]); // в соответсвии где лежит эта точка в массивах, разбитых по центру x
            } else {
                points_y_r.push(points_y[i]);
            }
        }

        let l0, l1, r0, r1, d1, d2, result;

        result = closed_pair_recursive(points_x_l, points_y_l); // передаем левую половину
        l0 = result[0]; // первая точка ближайшей пары
        l1 = result[1]; // вторая точка

        result = closed_pair_recursive(points_x_r, points_y_r); // правую половину
        r0 = result[0];
        r1 = result[1];

        d1 = distance(l0, l1);  // узнаем, в какой половине 
        d2 = distance(r0, r1); // дистанция меньше

        if(d1 < d2) { // и запоминаем сие точки
            min_dist = d1;
            min_points = [l0, l1];
        } else {
            min_dist = d2;
            min_points = [r0, r1];
        }

        for(let i = 0; i < points_y.length; i++) { // смотрим точки, которые находятся на краю разбиения по иксу
            for(let j = i + 1; j < Math.min(points_y.length, i + 7); j++) { // для каждой точки из одной половины смотрим до 7 из другой
                if(distance(points_y[i], points_y[j]) < min_dist) { // и считаем дистанцию
                    min_dist = distance(points_y[i], points_y[j]); // ибо тут тоже может оказатся минимальная
                    min_points = [points_y[i], points_y[j]];
                }
            }
        }
        /*
         * почему смотрим именно 7 точек
         * уже не помню
         * когда-то кидал владу со stackoverflow вопрос
         * там было объяснение почему 7
         * щяс лень гуглить
         */
        return min_points;
    }
}


function setup() {
    createCanvas(X, Y);
}

function draw() {
    movePoints(); // двигаем точки
    let points_x = points.slice(); // делаем копии массива точек
    let points_y = points.slice();
 
    for(let i = 0; i < points_x.length - 1; i++) { // говнокодим для того чтоб отсортировать точки по x
        let MIN = i;
        for(let j = i + 1; j < points_x.length; j++) {
            if(points_x[j].x < points_x[MIN].x) {
                MIN = j;
            }
        }
        let temp = points_x[i];
        points_x[i] = points_x[MIN];
        points_x[MIN] = temp;

    }

    for(let i = 0; i < points_y.length - 1; i++) {  // второй по y
        let MIN = i;
        for(let j = i + 1; j < points_y.length; j++) {
            if(points_y[j].y < points_y[MIN].y) {
                MIN = j;
            }
        }
        let temp = points_y[i];
        points_y[i] = points_y[MIN];
        points_y[MIN] = temp;
    }


    let points1 = closed_pair_recursive(points_x, points_y);  // получаем ближайшую пару точек

    if(distance(points1[0], points1[1]) < 15) { // если расстояние меньше чем радиус точки
        points1[0].x_speed = - points1[0].x_speed; // то они полетят в обратнуюю сторону
        points1[1].x_speed = - points1[1].x_speed;
        points1[0].y_speed = - points1[0].y_speed;
        points1[1].y_speed = - points1[1].y_speed;
    }

    background(51); // дальше отрисовка 
    stroke(255);
    drawPoints()
    line(points1[0].x, Y - points1[0].y, points1[1].x, Y - points1[1].y);
}
