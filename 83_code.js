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
    g.addEdge(new jsgraphs.Edge(j, j-1, a[0][j-1])); // first row link left
}

for (i = 1; i < len; ++i) {
    g.addEdge(new jsgraphs.Edge((i-1)*len, i*len, a[i][0])); // first column link down
    g.addEdge(new jsgraphs.Edge(i*len, (i-1)*len, a[i-1][0])); // first column link up
    for (j = 1; j < len; ++j) {
        g.addEdge(new jsgraphs.Edge(i*len+j-1, i*len+j, a[i][j])); // link right
        g.addEdge(new jsgraphs.Edge(i*len+j, i*len+j-1, a[i][j-1])); // link left
        g.addEdge(new jsgraphs.Edge((i-1)*len+j, i*len+j, a[i][j])); // link down
        g.addEdge(new jsgraphs.Edge(i*len+j, (i-1)*len+j, a[i-1][j])); // link up
    }
}

var dijkstra = new jsgraphs.Dijkstra(g, len2);
console.log(dijkstra.distanceTo(len2 - 1));
