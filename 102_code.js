/*
https://projecteuler.chat/viewtopic.php?t=2508

http://mathworld.wolfram.com/TriangleInterior.html
*/
function det(u, v) {
    return u[0]*v[1] - u[1]*v[0];
}
v = [0, 0]; co = 0;
for (i = 0; i < 6000; i += 6) {
    v0 = [a[i], a[i+1]];
    v1 = [a[i+2] - a[i], a[i+3] - a[i+1]];
    v2 = [a[i+4] - a[i], a[i+5] - a[i+1]];
	u = det(v1, v2);
    b = (det(v, v2) - det(v0, v2)) / u;
    c = (det(v0, v1) - det(v, v1)) / u;
    if (b > 0 && c > 0 && b+c < 1)
        co++;
} co;
