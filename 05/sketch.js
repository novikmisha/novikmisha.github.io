X = 1000;
Y = 1000; 
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

var center = new Point(X / 2, Y / 2, 0);
var points = [];

for(var i = 0; i < 10; i++) {
    var x = Math.random() * X;
    var y = Math.random() * Y;
    var r = Math.random() * Math.PI * 2;
    var tempPoint = new Point(x, y, r);
    if(distance(center, tempPoint) > 300)
        i--;
    else
        points.push(tempPoint);
}

function drawPoints() {
    for(var i = 0; i < points.length; i++) {
        ellipse(points[i].x, Y - points[i].y, 5)
    }
}


//Массивы с точками для новой фигуры

var figure = [];

function step() {//функция для шага
    var y_min = 0;
    //Находим точку с минимальным y
    for(var i = 1; i < points.length; i++) {
        if(points[i].y < points[y_min].y) {
            y_min = i;
        }
    }

    //Находим углы точек
    var angles = [];
    var min_line = [1, 0];
    for(var i = 0; i < points.length; i++) {
        var angle = Math.acos(angleBetween(min_line, minus(points[i].getPoint(), points[y_min].getPoint())))
        angles.push(angle);
    }

    //Находим NaN - это есть наша точка с минимальным y(температура была 39.2 когда писал сие лабу)
    for(var i = 0; i < angles.length; i++) {
        if(angles[i] < 10 || angles[i] > -10)
            console.log("ok");
        else {
            var temp = angles[i];
            angles[i] = angles[0];
            angles[0] = temp;

            var temp = points[i];
            points[i] = points[0];
            points[0] = temp;

            break;
        }

    }

    for(var i = 1; i < angles.length - 1; i++) {
        var MIN = i;
        for(var j = i + 1; j < angles.length; j++) {
            if(angles[j] < angles[MIN])
                MIN = j;
        }
       
        var temp = angles[i];
        angles[i] = angles[MIN];
        angles[MIN] = temp;

        temp = points[i];
        points[i] = points[MIN];
        points[MIN] = temp;
    }


    figure = [];
    figure[0] = points[0];
    figure[1] = points[1];

    var q = [];

    for(var i = 0; i < points.length; i++) {
        q.push(points[i]);
    }

    q.splice(1, 1);


    var maxCos = 1;
    while(maxCos != 0){ 
        var cos = [];

        var min_line = minus(figure[figure.length - 1].getPoint(), figure[figure.length - 2].getPoint());
        for(var i = 0; i < q.length; i++) {
            var angle = Math.acos(angleBetween(min_line, minus(figure[figure.length - 1].getPoint(), q[i].getPoint())))
            cos.push(angle);
        }

        maxCos = 0;
        if(q.length == 9)
            maxCos++;
        for(var i = maxCos + 1; i < cos.length; i++) {
            if(cos[i] > cos[maxCos])
                maxCos = i;
        }

        figure.push(q[maxCos]);

        q.splice(maxCos, 1)
    }
}

function drawLines() {
    for(var i = 0; i < figure.length - 1; i++) {
        line(figure[i].x, Y - figure[i].y, figure[i + 1].x, Y - figure[i + 1].y);
    } 
    stroke(255, 204, 100);
    line(startPoint.x, Y - startPoint.y, endPoint.x, Y - endPoint.y);
    stroke(0);
}

function movePoints() {
    for(var i = 0; i < points.length; i++)
        points[i].move();
}

function triangle_area(first, second, third) {
    let a = distance(first, second);
    let b = distance(second, third);
    let c = distance(first, third);
    let p = (a + b + c) / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
/*
function maxDistance() {
    let max_area = 0;
    let n = figure.length - 1;
    let i = 1;
    let start;

    while(triangle_area(figure[n - 1], figure[0], figure[i]) < triangle_area(figure[n - 1], figure[0], figure[i + 1])) {
        i++;
    }

    for(let j = 0; j < n - 1; j++) {
        while(triangle_area(figure[j], figure[j + 1], figure[i]) < triangle_area(figure[j], figure[j + 1], figure[i + 1])) {
            i++;
        }

        if(i == n - 1) {
            console.log("break")
            break;
        }

    }
}
*/
let startPoint;
let endPoint;

function findDiam() {
	let n = figure.length - 1, i = 1, end, start, temp;
	let resLength = 0;
	while(Math.abs(triangle_area(figure[n - 1], figure[0], figure[i])) > Math.abs(triangle_area(figure[n - 1], figure[0], figure[i - 1]))) {
		i++;
	}

	start = i - 1;
	let j = 1;
	while(start != n - 1) {
		temp = start + 1;
		
		while(Math.abs(triangle_area(figure[j - 1], figure[j], figure[temp])) > Math.abs(triangle_area(figure[j - 1], figure[j], figure[temp - 1]))) {
				temp++;
				if(temp == n) {
						break;
				}
		}
		end = temp - 1;
		
		for(let k = start; k <= end; k++) {
			let tempLength = distance(figure[k], figure[j - 1]);
			if(tempLength > resLength) {
				resLength = tempLength;
                startPoint = figure[j - 1];
                endPoint = figure[k];
			}
		}
		start = end;
		j++;			
	}
    if(resLength > 700) {
        changePointsMovement();
    }
}

function changePointsMovement() {
    for(let i = 0; i < points.length - 1; i++) {
        points[i].x_speed = -points[i].x_speed;
        points[i].y_speed = -points[i].y_speed;
    }
}



//
//
//
//
//

function setup() {
    createCanvas(X, Y);
}

function draw() {
    background(51);
    stroke(255);
    movePoints();
    drawPoints();
    step();
    findDiam();
    drawLines();
}
