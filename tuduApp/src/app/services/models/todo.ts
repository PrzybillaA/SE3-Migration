import { Deserialize } from "./deserialize";

export class Todo implements Deserialize {

    id: number;
    titel: string;
    beschreibung: string;
    erstellungsDatum: Date;
    faelligkeitsdatum: Date;

    deserialize(input: any) {
        Object.assign(this, input);

        this.faelligkeitsdatum = new Date(this.faelligkeitsdatum);
        this.erstellungsDatum = new Date(this.erstellungsDatum);

        return this;
    }
}
