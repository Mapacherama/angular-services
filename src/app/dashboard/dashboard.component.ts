import { Component, OnInit, Version, VERSION } from "@angular/core";

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from "../core/logger.service";
import { DataService } from "../core/data.service";
import { BookTrackerError } from "../models/bookTrackerError";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private title: Title
  ) {}

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllReaders().subscribe(
      (data: Reader[] | BookTrackerError) => (this.allReaders = <Reader[]>data),
      (err: BookTrackerError) => this.loggerService.log(err.friendlyMessage),
      () => this.loggerService.log("All done getting readers!")
    );
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.getAuthorRecommendationAsync(1).catch((err) =>
      this.loggerService.error(err)
    );

    this.title.setTitle(`Book Tracker ${VERSION.full}`);

    this.loggerService.log(
      "Done with the initialization process of the Dashboard."
    );

    throw new Error("Ugly technical bananza!");
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(
      readerID
    );
    this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
