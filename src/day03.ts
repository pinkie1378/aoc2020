'use strict';
import { readFile } from 'fs/promises';

interface Point {
    x: number;
    y: number;
}

const terrain: string[] = (await readFile('input/day-3.txt', 'utf-8'))
    .split('\n');
const tree = '#';
const xEdge: number = terrain[0].length;
const maxY: number = terrain.length;

function traverseTerrain(position: Point, speed: Point, hits: number): number {
    if (position.y >= maxY) {
        return hits;
    }
    position.x %= xEdge;
    if (terrain[position.y][position.x] === tree) {
        hits += 1;
    }
    return traverseTerrain({x: position.x + speed.x, y: position.y + speed.y}, speed, hits);
}

console.log(`Part 1: ${traverseTerrain({x: 0, y: 0}, {x: 3, y: 1}, 0)}`);

const speeds: Point[] = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2}
]

const hitsProduct: number = speeds
    .map((speed: Point): number => traverseTerrain({x: 0, y: 0}, speed, 0))
    .reduce((n: number, m: number): number => n * m, 1);

console.log(`Part 2: ${hitsProduct}`);
