export default class Behavior {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.warn(`You forgot to update ${this.name} behavior`);
    }
}
