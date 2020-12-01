'use strict';
import { readFile, writeFile } from 'fs/promises';

import bent from 'bent';

const day = process.argv[process.argv.length - 1];
const token = await readFile('.token', 'utf-8');
const getAdvent = bent(
    'https://adventofcode.com',
    'string',
    {cookie: `session=${token}`}
);
const inputStream = await getAdvent(`/2020/day/${day}/input`);
const input = await inputStream;
await writeFile(`input/day-${day}.txt`, input);
