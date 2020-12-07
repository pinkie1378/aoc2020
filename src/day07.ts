import { readFile } from 'fs/promises';
import _ from 'lodash';

const input = await readFile('input/day-7.txt', 'utf-8');

interface Graph {
    [key: string]: Node;
}

interface Child {
    node: Node;
    weight: number;
}

class Node {
    color: string;
    rawEdges: string[];
    parents: Set<Node>;
    children: Set<Child>;

    constructor(color: string, rawEdges: string[]) {
        this.color = color;
        this.rawEdges = rawEdges;
        this.parents = new Set();
        this.children = new Set();
    }

    setEdges(graph: Graph) {
        this.rawEdges.forEach((s: string) => {
            let [weight, adjective, color] = s.split(' ', 3);
            if (Number(weight)) {
                const child = graph[`${adjective} ${color}`];
                child.parents.add(this);
                this.children.add({node: child, weight: Number(weight)});
            }
        });
    }

    getAncestors(queue: Node[] = [this], ancestors: Node[] = []): Node[] {
        if (queue.length === 0) {
            return ancestors;
        }
        const node = queue.shift();
        node?.parents.forEach(n => {
            if (!ancestors.includes(n)) {
                ancestors.push(n);
                queue.push(n);
            }
        });
        return this.getAncestors(queue, ancestors);
    }

    get bagCount(): number {
        if (this.children.size === 0) {
            return 1;
        } else {
            return 1 + _.sum(Array.from(this.children)
                .map(({weight, node}) => weight * node.bagCount)
            );
        }
    }
}

const bags: Graph = input.trim()
    .split('\n')
    .map(s => s.split(' bags contain ', 2))
    .reduce((g, [color, contents]) => {
        g[color] = new Node(color, contents.split(', '));
        return g
    }, {} as Graph);
Object.values(bags).forEach((bag: Node) => bag.setEdges(bags));

console.log(`Part 1: ${bags['shiny gold'].getAncestors().length}`);
console.log(`Part 2: ${bags['shiny gold'].bagCount - 1}`);
