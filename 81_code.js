// reuse 67_code.js
ar = [131, 673, 234, 103, 18, 201, 96, 342, 965, 150, 630, 803, 746, 422, 111, 537, 699, 497, 121, 956, 805, 732, 524, 37, 331];
len = 80; k = -1; a = [];
// read to 2-m array
for (i = 0; i < len; ++i) {
    t = [];
    for (j = 0; j < len; ++j) {
        t.push(ar[++k]);
    }
    a.push(t);
}
ar = [];
// use 1e4 to shape the triangle, not diamond
for (i = 0; i < 2*len-1 ; ++i) {
    for (j = 0; j <= i; ++j) {
        t = a[i-j];
        if (t) t = t[j];
        if (!t) t = 1e4;
        ar.push(t);
    }
} ar;

ba = [];
ai = 0;
i = 1;
j = 0;
while (ai < ar.length) {
    var a = [];
    ba.push(a);
    for (j = 0; j < i; ++j) {
        a.push(ar[ai++]);
    }
    i++;
}
i--; min = 1e6;
for (j = 1; j < i; ++j) {
    var a = ba[j];
    var k = 0;
    a[k] += ba[j-1][k]; if (j == i-1) min = Math.min(a[k], min);
    for (k = 1; k < a.length - 1; ++k) {
        a[k] += Math.min(ba[j-1][k-1], ba[j-1][k]);
        if (j == i-1) min = Math.min(a[k], min);
    }
    a[k] += ba[j-1][k-1];  if (j == i-1) min = Math.min(a[k], min);
}
min;

---------------------------------------------------------------------

ar = [131, 673, 234, 103, 18, 201, 96, 342, 965, 150, 630, 803, 746, 422, 111, 537, 699, 497, 121, 956, 805, 732, 524, 37, 331];

len = 5; k = -1; a = [];
// read to 2-m array
for (i = 0; i < len; ++i) {
    t = [];
    for (j = 0; j < len; ++j) {
        t.push(ar[++k]);
    }
    a.push(t);
}

len2 = len*len;
var g = new jsgraphs.WeightedDiGraph(len2+1);
g.addEdge(new jsgraphs.Edge(len2, 0, a[0][0]));

for (j = 1; j < len; ++j) {
    g.addEdge(new jsgraphs.Edge(j-1, j, a[0][j])); // first row link right
}


for (i = 1; i < len; ++i) {
    g.addEdge(new jsgraphs.Edge((i-1)*len, i*len, a[i][0])); // first column link down
    for (j = 1; j < len; ++j) {
        g.addEdge(new jsgraphs.Edge(i*len+j-1, i*len+j, a[i][j])); // link right
        g.addEdge(new jsgraphs.Edge((i-1)*len+j, i*len+j, a[i][j])); // link down
    }
}

var dijkstra = new jsgraphs.Dijkstra(g, len2);
console.log(dijkstra.distanceTo(len2 - 1));
