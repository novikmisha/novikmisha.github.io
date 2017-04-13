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

var figure =   [[200, 200], 
                [100, 400], 
                [100, 600], 
                [200, 630], 
                [400, 630], 
                [550, 600], 
                [570, 570], 
                [600, 400], 
                [580, 240], 
                [430, 210], 
                [200, 200]];

var inner  =   [[300, 300], 
                [313, 290], 
                [454, 310], 
                [450, 450], 
                [320, 460], 
                [300, 300]];

//refactor coordinates;
var figureOne = [[200, 200], 
                [100, 400], 
                [100, 600], 
                [200, 630], 
                [400, 630], 
                [550, 600], 
                [570, 570], 
                [600, 400], 
                [580, 240], 
                [430, 210], 
                [200, 200]];

for(var i = 0; i < figureOne.length; i++) {
    figureOne[i][1] = Y - figureOne[i][1];
}

var innerOne = [[300, 300], 
                [313, 290], 
                [454, 310], 
                [450, 450], 
                [320, 460], 
                [300, 300]];

for(var i = 0; i < inner.length; i++) {
    innerOne[i][1] = Y - innerOne[i][1];
}

function drawFigure() {
    for(var i = 0; i < figureOne.length - 1; i++) {
        line(figureOne[i][0], figureOne[i][1], figureOne[i + 1][0], figureOne[i + 1][1]);
    }
}

function drawInner() {
    for(var i = 0; i < innerOne.length - 1; i++) {
        line(innerOne[i][0], innerOne[i][1], innerOne[i+1][0], innerOne[i+1][1]);
    }
}

//konec figur

//
//
//

function insideFigure(p) {
    //find min x
    var x_min = figure[0][0];
    for(var i = 1; i < figure.length; i++) {
        if(figure[i][0] < x_min)
            x_min = figure[i][0];
    }

    var q = [x_min - 1, p[1]]

    for(var i = 0; i < figure.length; i++) {
        if(side([q, p], figure[i]) == 0) {
            q[1] -= 0.1;
            i = -1;
        }
    }

    var result = 0;

    for(var i = 0; i < figure.length - 1; i++) {
        if(intersect([q, p], [figure[i], figure[i+1]])) {
            result++;
        }
    }


    return result%2;
}

function insideInner(p) {
    //find min x
    var x_min = inner[0][0];
    for(var i = 1; i < inner.length; i++) {
        if(inner[i][0] < x_min)
            x_min = inner[i][0];
    }

    var q = [x_min - 1, p[1]]

    for(var i = 0; i < inner.length; i++) {
        if(side([q, p], inner[i]) == 0) {
            q[1] -= 0.1;
        }
    }

    var result = 0;

    for(var i = 0; i < inner.length - 1; i++) {
        if(intersect([q, p], [inner[i], inner[i+1]])) {
            result++;
        }
    }
    return result%2;
}

function findOctane(a) {
    var x = a[0];
    var y = a[1];
    let b;

	if (0 < y && y <= x) {
		octane = 1;
	} else if (0 <= x && x < y) {
		octane = 2;
	} else if (0 < (-x) && (-x) <= y) {
		octane = 3;
	} else if (0 <= y && y < (-x)) {
		octane = 4;
	} else if (0 < (-y) && (-y) <= (-x)) {
		octane = 5;
	} else if (0 <= (-x) && (-x) < (-y)) {
		octane = 6;
	} else if (0 < x && x <= (-y)) {
		octane = 7;
	} else if (0 <= (-y) && (-y) < x) {
		octane = 8;
	} else octane = 0;

	return octane; 
}

function determinant(line, p) {
	return ((line[1][0] - line[0][0]) * (p[1] - line[0][1]) - ((p[0] - line[0][0]) * (line[1][1] - line[0][1])));
}


function correctionDelta(Delta, point, pi, pi1) {
	if (Delta > 4) {
		Delta -= 8;
	} else if (Delta < (-4)) {
		Delta += 8;
	} else if (Delta == 4 || Delta == (-4)) {
		if (determinant([point, pi], pi1) < 0) {
			Delta = 4;
		} else if (determinant([point, pi], pi1) > 0) {
			Delta = -4;
		} else if (determinant([point, pi], pi1) == 0) {
			Delta = 9;
		}
	}

	return Delta;
}


function octaneTest(p) {
    var octane = [];
    for(var i = 0; i < inner.length; i++) {
        octane.push(findOctane(minus(inner[i], p)));
    }

    var Delta = 0;
    var sumDelta = 0;
	
	for (var i = 0; i < inner.length; i++) {
		if (i != inner.length - 1) {
			Delta = octane[i + 1] - octane[i];
			Delta = correctionDelta(Delta, p, inner[i], inner[i + 1]);
			if (Delta == 9) {
				result = true;
				return result;
			} else {
				sumDelta += Delta;
			}

		} else {
			Delta = octane[0] - octane[i];

			Delta = correctionDelta(Delta, p, inner[i], inner[0]);
			if (Delta == 9) {
				result = true;
				return result;
			} else {
				sumDelta += Delta;
			}
		}
	}
	//System.out.println("SumDelta : "+sumDelta);
	if (sumDelta == 8 || sumDelta == (-8)) {
		result = true;
	} else if (sumDelta == 0) {
		result = false;
	} else {
		result = false;
	}

	return result;
}

//
//
//

function drawSheeps() {
    for(var i = 0; i < sheeps.length; i++) {
        sheeps[i].draw();
    }
}

function checkDead() {
    for(var i = 0; i < sheeps.length; i++) {
        if(octaneTest(sheeps[i].point())) {
            sheeps.splice(i, 1);
        }
    }
}

function moveSheeps() {
    for(var i = 0; i < sheeps.length; i++) {
        sheeps[i].move();
    }
}

function checkOut() {
    for(var i = 0; i < sheeps.length; i++) {
        var point = sheeps[i].point();
        var next = [point[0] + sheeps[i].x_speed,
                    point[1] + sheeps[i].y_speed];
            
        var past = [point[0] - sheeps[i].x_speed,
                    point[1] - sheeps[i].y_speed];

        next = [next[0] + sheeps[i].x_speed,
                next[1] + sheeps[i].y_speed];
            

        if(!insideFigure2(next)) {
            for(var j = 0; j < figure.length - 1; j++) {
                var run = true;
                if(intersect([point, next], [figure[j], figure[j + 1]])) {
                    var first = minus(point, past);
                    var second = minus(figure[j + 1], figure[j]);
                    
                    var result = mult(first, second);
                    var result1 = mult(second, second);

                    result = result / result1;
                    result = [2 * result * second[0], 2 * result * second[1]];
                    result = minus(result, first);


                    sheeps[i].x_speed = result[0];
                    sheeps[i].y_speed = result[1];
                    run = false;

                } 
            } 
        }
    }
}


//
//
//
//
//
var sheeps = [];

function setup() {
    createCanvas(X, Y);
}

function createSheeps() {
    if(sheeps.length == 0) {
        while(sheeps.length < 5) {
            var p = [Math.floor(Math.random() * X + 1), Math.floor(Math.random() * Y + 1)];
            if(insideFigure(p) && !insideInner(p))
                sheeps.push(new Sheep(p[0], p[1], Math.random() * Math.PI * 2));
        }
    }
}

function insideFigure2(p) {
    var inside;
    var Z = figure[0];
    if(side([figure[0], figure[1]], p) == 1 || side([figure[0], figure[figure.length - 2]], p) == -1)
        return false;

    var start = 0;
    var end = figure.length - 1;
    var sep;
    while(end - start > 1) {

        sep = parseInt((start + end) / 2, 10);
        if (determinant([Z, figure[sep]], p) < 0) {
            start = sep;
        } else {
            end = sep;
        }
    }

    var pStart = figure[start];
    var pEnd = figure[end];
    var result = intersect([pStart, pEnd], [Z, point]);
    if (result) {
        inside = false;
    } else {
        inside = true;
    }

    return inside;
}

function draw() {
    background("#323232");
    stroke(255);
    createSheeps();
    drawFigure();
    drawInner();
    checkOut();
    checkDead();
    moveSheeps();
    drawSheeps();
}
