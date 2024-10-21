for (i = 1; i < 10; i++) {
  const result = 2 * i;
  console.log(`2 * ${i} = ` + result);
}

console.log("-------------");
for (let i = 2; i < 10; i++) {
  console.log(`/n -----${i}단------`);
  for (let j = 1; j < 10; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}
