import { readFile } from 'fs/promises';

const input = await readFile('input/day-5.txt', 'utf-8');

type BF = 'B' | 'F';
type LR = 'L' | 'R';
type Row = `${BF}${BF}${BF}${BF}${BF}${BF}${BF}`;
type Col = `${LR}${LR}${LR}`
type Seat = `${Row}${Col}`;
function isSeat(s: string): s is Seat {
    return Boolean(s.match(/^[BF]{7}[LR]{3}$/));
}

function seatStrToInt(seat: Seat): number {
    let binary: string = seat.replace(/[FL]/g, '0');
    binary = binary.replace(/[BR]/g, '1');
    return Number(`0b${binary}`);
}

const seatIds: number[] = input.split('\n')
    .filter(isSeat)
    .map(seatStrToInt)
    .sort((a, b) => a - b);

console.log(`Part 1: ${seatIds[seatIds.length - 1]}`);

const emptySeat: number = seatIds.reduce((mySeat, current, i, allSeats) => {
    return (allSeats[i + 1] - current === 2) ? current + 1 : mySeat;
}, 0);

console.log(`Part 2: ${emptySeat}`);
