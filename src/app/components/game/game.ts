export class Game {
  title: string;
  releaseDate: Date;
  console: string;
  personalNotes?: string;
  completionDate?: Date;
  age?: string;

  constructor(title: string, releaseDate: Date, console: string, personalNotes?: string, completionDate?: Date) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.console = console;
    this.personalNotes = personalNotes;
    this.completionDate = completionDate;
  }
}
