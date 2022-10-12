export class Parking {
  readonly id: string;
  readonly label: string;
  readonly endTime: string;

  constructor(init: Parking) {
    this.id = init.id;
    this.label = init.label;
    this.endTime = init.endTime;
  }
}
