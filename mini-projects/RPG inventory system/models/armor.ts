import { Item } from './item';

export class Armor extends Item {
    constructor(
        id: number,
        name: string,
        weight: number,
        value: number,
        public defense: number,
        public durability: number
    ) {
        super(id, name, weight, value);
    }
}