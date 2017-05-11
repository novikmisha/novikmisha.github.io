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
let convex = [];

function drawPoints() {
    fill(255, 255, 255);
    for(let i = 0; i < points.length; i++) {
        ellipse(points[i].x, Y - points[i].y, 5);
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

function determinant(line, p) {
	return ((line[1][0] - line[0][0]) * (p[1] - line[0][1]) - ((p[0] - line[0][0]) * (line[1][1] - line[0][1])));
}

function addPoint() {
    let x = Math.random() * (X - 100) + 50;
    let y = Math.random() * (Y - 100) + 50;
    let r = Math.random() * Math.PI * 2;
    points.push(new Point(x, y, r));
}

function sortIndexes(indexes) {
    let end = -1;
    let result = [];

    for(let i = 0; i < indexes.length - 1; i++) {
        if(indexes[i][1] != indexes[i + 1][0]) {
            end = i;
            break;
        }
    } 

    if(end == -1) {
        return indexes;
    } else {
        for(let i = 0; i <= end; i++) {
            result.push(indexes[i]);
        } 

        for(let i = 0; i < indexes.length - end - 1; i++) {
            result.splice(0, 0, indexes[indexes.length - 1 - i])

        }


        return result;
    }

}


function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function sortArr(arr) {
    if(arr.indexOf(0) != -1) {
        let result = [];
        for(let i = 0; i < arr.length; i++) {
            if(arr.indexOf(i + 1) == -1) {
                let end = i;

                for(let j = 0; j <= i; j++) {
                    result.push(j);
                }

                for(let j = i + 1; j < arr.length; j++) {
                    result.splice(j - i - 1, 0, arr[j]);
                }

                break;
            }
        }
        return result;
    } else {
        return arr;
    }
}

function alg(point) {
    if(convex.length == 0) {
        convex.push(point);
    } else if(convex.length == 1) {
        if(point.equals(convex[0])) {
            ;
        } else {
            convex.push(point);
        }
    } else if(convex.length == 2) {
        if(point.equals(convex[0]) || point.equals(convex[1])) {
            ;
        } else {
            let determ = determinant([convex[0].getPoint(), convex[1].getPoint()],
                                     point.getPoint());
            if(determ == 0) {
                let pointOne = new Point(convex[1].x - convex[0].x,
                                         convex[1].y - convex[0].y,
                                         0);

                let pointTwo = new Point(point.x - convex[0].x,
                                         point.y - convex[0].y,
                                         0);

                if(mult(pointOne.getPoint(), pointTwo.getPoint()) < 0) {
                    convex = [];
                    convex.slice(0, 1);
                    convex.push(point);
                } else {
                    pointOne = new Point(convex[0].x - convex[1].x,
                                         convex[0].y - convex[1].y,
                                         0);

                    pointTwo = new Point(point.x - convex[1].x,
                                         point.y - convex[1].y,
                                         0);

                    if(mult(pointOne, pointTwo) < 0) {
                        convex.pop();
                        convex.push(point);
                    }
                }
            } else if(determ > 0) {
                convex.push(point);
            } else {
                convex.splice(1, 0, point);
            }
        };
    } else {
        let indexes = [];
        for(let i = 0; i < convex.length - 1; i++) {
            if(side([convex[i].getPoint(), convex[i + 1].getPoint()], point.getPoint()) == 1) {
                indexes.push([i, i + 1])
            }
        }

        if(side([convex[convex.length - 1].getPoint(), convex[0].getPoint()], point.getPoint()) == 1) {
            indexes.push([convex.length - 1, 0])
        }

        indexes = sortIndexes(indexes);

        if(indexes.length == 1) {
            convex.splice(indexes[0][1], 0, point);
        } /*else if(indexes.length == 2) {

        } */else if (indexes.length > 0) {
            let deletePoints = [];
            for(let i = 0; i < indexes.length - 1; i++) {
                deletePoints.push(convex[indexes[i][1]]);
            }

            let indexPoint = convex[indexes[indexes.length - 1][1]];

            for(let i = 0; i < deletePoints.length; i++) {
                convex.splice(convex.indexOf(deletePoints[i]), 1);
            }

            convex.splice(convex.indexOf(indexPoint), 0, point);
        }
    }
}

console.log(sortIndexes([[0, 1], [1, 2], [2, 3], [6, 7], [7, 8], [8, 0]]))
console.log(sortIndexes([[6, 7], [7, 8], [8, 0]]))
console.log(sortIndexes([[0, 1], [1, 2], [2, 3]]))
console.log(sortIndexes([[0, 1], [1, 2], [2, 3], [8, 0]]))
console.log(sortIndexes([[0, 1], [6, 7], [7, 8], [8, 0]]))
console.log(sortIndexes([[0, 1]]))

function drawLines() {
    for(let i = 0; i < convex.length - 1; i++) { 
        line(convex[i].x, Y - convex[i].y, convex[i + 1].x, Y - convex[i + 1].y);
    }
    if(convex.length > 1) {
        line(convex[0].x, Y - convex[0].y, convex[convex.length - 1].x, Y - convex[convex.length - 1].y);
    }

    for(let i = 0; i < convex.length; i++) {
        text(i, convex[i].x + 5, Y - convex[i].y - 5);
    }
}

function setup() {
    createCanvas(X, Y);
    frameRate(1);
}

function draw() {
    background(51);
    stroke(255);
    addPoint();
    alg(points[points.length - 1]);
    drawPoints();
    drawLines();
}
