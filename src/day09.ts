import { readFile } from 'fs/promises';

import _ from 'lodash';
import { Combination } from 'js-combinatorics';  // Add "type": "module" to node_modules/js-combinatorics/package.json

function findNumber(numList: number[], preamble: number): number {
    const combos = [...new Combination(numList.slice(0, preamble), 2)];
    let idx = preamble;
    let num = numList[idx];
    while (combos.map(_.sum).includes(num)) {
        let removeNum = numList[idx - preamble];
        combos.forEach((pair: number[]) => pair.forEach((n, i, arr) => {
            if (n === removeNum) {
                arr[i] = num;
            }
        }));
        idx += 1;
        num = numList[idx];
    }
    return num;
}

const input: string = await readFile('input/day-9.txt', 'utf-8');
const xmas: number[] = input.trim().split('\n').map(Number);
// const xmas = [
//     35,  20,  15,  25,  47,  40,
//     62,  55,  65,  95, 102, 117,
//    150, 182, 127, 219, 299, 277,
//    309, 576
// ];
const notSum = findNumber(xmas, 25);
console.log(`Part 1: ${notSum}`);

function findRange(numList: number[], total: number, iMin: number = 0, iMax: number = 1): number {
    const range = numList.slice(iMin, iMax + 1);
    const sum = _.sum(range);
    if (sum === total) {
        return (_.min(range) as number) + (_.max(range) as number);
    } else if (sum < total) {
        return findRange(numList, total, iMin, iMax + 1);
    } else {
        return findRange(numList, total, iMin + 1, iMax);
    }
}
console.log(`Part 2: ${findRange(xmas, notSum)}`);
