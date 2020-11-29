const p1= "start"
const p2 = "end";
const p3 = "test";
performance.mark(p1);
for (let i = 0; i <6000000000 ; i++) {
    let x = i;
}
performance.mark(p2);
for (let i = 0; i <100000 ; i++) {
    let x = i;
}
performance.mark(p3);

performance.measure("measure p1 to p2", p1, p2);
performance.measure("measure from p2 to p3", p2, p3);
performance.measure("measure from p1 to p3", p1, p3);
console.log(performance.getEntriesByType("measure"));
