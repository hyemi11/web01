function gugudan() {
    for (let i = 2; i <= 9; i++) {
        console.log(`\n=== ${i}단 ===`);
        for (let j = 1; j <= 9; j++) {
            console.log(`${i} * ${j} = ${i * j}`);
        }
    }
}

// gugudan();

function gugudan_n(dan) {
    console.log(`\n=== ${dan}단 ===`);
    for (let j = 1; j <= 9; j++) {
        console.log(`${dan} * ${j} = ${dan * j}`);
    }
}

gugudan_n(5);
