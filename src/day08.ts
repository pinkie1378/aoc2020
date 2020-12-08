import { readFile } from 'fs/promises';

function readProgram(program: string[], acc: number, i: number = 0, visited: number[] = []): number {
    if (i >= program.length) {
        return acc;
    } else if (visited.includes(i)) {
        throw Error(`Visited line ${i + 1} twice. Current value: ${acc}`);
    }
    visited.push(i);
    let [instruction, numText] = program[i].split(' ', 2);
    if (instruction === 'acc') {
        return readProgram(program, acc + Number(numText), i + 1, visited);
    } else if (instruction === 'jmp') {
        return readProgram(program, acc, i + Number(numText), visited);
    } else {
        return readProgram(program, acc, i + 1, visited);
    }
}

function changeLine(program: string[], i: number): boolean {
    const line = program[i];
    let changed = true;
    if (line.charAt(0) === 'n') {
        program[i] = line.replace('nop', 'jmp');
    } else if (line.charAt(0) === 'j') {
        program[i] = line.replace('jmp', 'nop');
    } else {
        changed = false;
    }
    return changed;
}

function fixProgram(program: string[], fixLine: number = 0, initialRun = true): number {
    try {
        return readProgram(program, 0);
    }
    catch (err) {
        changeLine(program, fixLine);
        if (!initialRun) {
            do {
                fixLine += 1;
            } while (!changeLine(program, fixLine));
        }
        return fixProgram(program, fixLine, false);
    }
}

const input: string = await readFile('input/day-8.txt', 'utf-8');
const instructions: string[] = input.trim().split('\n');
try {    
    readProgram(instructions, 0);
} catch (err) {
    console.log(`Part 1: ${err.message}`);
}
console.log(`Part 2: ${fixProgram(instructions)}`);
