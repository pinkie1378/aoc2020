import { readFile } from 'fs/promises';

const input = await readFile('input/day-4.txt', 'utf-8');

interface Id {
    [key: string]: string;
}

interface NorthPoleId extends Id {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
}
function isNorthPoleId(obj: Id): obj is NorthPoleId {
    const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return keys.every(key => Object.keys(obj).includes(key));
}

const allPassports: Id[] = input
    .split(/\n\n/)
    .map((line: string): string[] => line.split(/\s/))
    .map((fields: string[]): Id => fields.reduce((acc: Id, field: string): Id => {
        const [key, value] = field.split(':', 2);
        acc[key] = value;
        return acc;
    }, {} as Id));
const goodFormatPassports: NorthPoleId[] = allPassports.filter(isNorthPoleId);

console.log(`Part 1: ${goodFormatPassports.length}`);

class IdValidator {
    id: NorthPoleId;
    isValid: boolean;

    constructor(obj: NorthPoleId) {
        this.id = obj;
        this.isValid = this.validate();
    }

    validate(): boolean {
        return this.checkYear('byr', 1920, 2002)
            && this.checkYear('iyr', 2010, 2020)
            && this.checkYear('eyr', 2020, 2030)
            && this.checkHeight()
            && this.checkHairColor()
            && this.checkEyeColor()
            && this.checkPassportId();
    }

    checkYear(key: 'byr' | 'iyr' | 'eyr', min: number, max: number): boolean {
        const year = Number(this.id[key]);
        return min <= year && year <= max;
    }

    checkHeight(): boolean {
        const height = Number(this.id.hgt.slice(0, this.id.hgt.length - 2));
        const unit = this.id.hgt.slice(-2);
        switch (unit) {
            case 'cm': return 150 <= height && height <= 193;
            case 'in': return 59 <= height && height <= 76;
            default: return false;
        }
    }

    checkHairColor(): boolean {
        return Boolean(this.id.hcl.match(/^#[a-f\d]{6}$/));
    }

    checkEyeColor(): boolean {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(this.id.ecl);
    }

    checkPassportId(): boolean {
        return Boolean(this.id.pid.match(/^\d{9}$/));
    }
}

const validPassports: NorthPoleId[] = goodFormatPassports
    .filter((id: NorthPoleId): boolean => new IdValidator(id).isValid);

console.log(`Part 2: ${validPassports.length}`);
