export default class Device {
    constructor(name, orientations) {
        this.name = name;
        this.orientations = orientations;
    }

    get orientationLabels() {
        return Object.keys(this.orientations)
            .map(orientation => `${orientation[0]}${orientation.substr(1)}`);
    }
}
