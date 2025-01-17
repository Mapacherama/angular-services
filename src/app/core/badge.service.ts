import { Injectable } from "@angular/core";

@Injectable()
export class BadgeService {
  constructor() {}

  getReaderBaddge(minutesRead: number): string {
    if (minutesRead > 5000) {
      return "Book Worm";
    } else if (minutesRead > 2500) {
      return "Page Turner";
    } else {
      return "Getting Started";
    }
  }
}
