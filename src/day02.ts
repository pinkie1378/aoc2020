'use strict';
import { readFile } from 'fs/promises';

type Entry = [string, string, string, string, string]
function isEntry(arr: string[]): arr is Entry {
    return arr.length === 5;
}

const allEntries: Entry[] = (await readFile('input/day-2.txt', 'utf-8'))
    .split('\n')
    .map((line: string): string[] => line.split(/\W/))
    .filter(isEntry);

function validateEntry([ min, max, letter, _, password ]: Entry ): boolean {
    const letterCount: number = password
        .split('')
        .filter((char: string): boolean => char === letter)
        .length;
    return Number(min) <= letterCount && letterCount <= Number(max);
}

console.log(`Part 1: ${allEntries.filter(validateEntry).length}`);

function reValidateEntry([ pos1, pos2, letter, _, password ]: Entry): boolean {
    return [pos1, pos2]
        .map((i: string): boolean => password.charAt(Number(i) - 1) === letter)
        .filter((b: boolean): boolean => b)
        .length === 1;
}

console.log(`Part 2: ${allEntries.filter(reValidateEntry).length}`);
