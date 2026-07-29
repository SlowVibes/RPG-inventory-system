import { Item } from './item';

export class Ring extends Item {
    constructor(
        id: number,
        name: string,
        weight: number,
        value: number,
        public bonusStrength: number,
        public bonusHealth: number
    ) {
        super(id, name, weight, value);
    }
}