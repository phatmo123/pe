a = [

];
var g = new jsgraphs.WeightedGraph(40);
for (i = 0; i < 40; ++i) for (j = i + 1; j < 40; ++j)
	if (a[i][j] != '-') {
		g.addEdge(new jsgraphs.Edge(i, j, a[i][j]));
		s += a[i][j];
	}
var prim = new jsgraphs.EagerPrimMST(g); 
var mst = prim.mst;
console.log(mst.map(u => u.weight).reduce(sumDigitLambda));
