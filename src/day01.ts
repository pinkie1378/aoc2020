'use strict';
import { readFile } from 'fs/promises';

const inputStr = await readFile('input/day-1.txt', 'utf-8');
const inputNumList = inputStr
    .split('\n')
    .map((s: string): number => Number(s));

function findProduct(sum: number, num: number, numList: number[]): number {
    if (numList.length === 0) {
        return -1;
    }
    const target = sum - num;
    if (numList.includes(target)) {
        return num * target;
    } else {
        return findProduct(sum, numList[0], numList.slice(1));
    }
}

console.log(`Part 1: ${findProduct(2020, inputNumList[0], inputNumList.slice(1))}`);

function findTripleProduct(sum: number, num: number, numList: number[]): number {
    if (numList.length < 2) {
        return -1;
    }
    const targetSum = sum - num;
    const product = findProduct(targetSum, numList[0], numList.slice(1));
    if (product > 0) {
        return num * product;
    } else {
        return findTripleProduct(sum, numList[0], numList.slice(1));
    }
}

console.log(`Part 2: ${findTripleProduct(2020, inputNumList[0],inputNumList.slice(1))}`);
