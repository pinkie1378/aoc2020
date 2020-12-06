import { readFile } from 'fs/promises';
import _ from 'lodash';

const input = await readFile('input/day-6.txt', 'utf-8');
const groupAnswers: string[] = input.split('\n\n');

const anyone: number = groupAnswers
    .map((s: string): number => new Set(s.replace(/\n/g, '').split('')).size)
    .reduce((sum, i) => sum + i, 0);

console.log(`Part 1: ${anyone}`);

const everyone: number = groupAnswers
    .map((s: string): string[][] => s.trim().split('\n').map(s2 => s2.split('')))
    .map((s2d: string[][]): number => _.intersection(...s2d).length)
    .reduce((sum, i) => sum + i, 0);

console.log(`Part 2: ${everyone}`);
