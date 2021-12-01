const debugName = "debugging";

console.time(debugName);

for (let i = 0; i < 100; i++) {
  console.log(i);
}
console.timeEnd(debugName);
