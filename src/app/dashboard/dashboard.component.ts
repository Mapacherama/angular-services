import { Component, OnInit } from "@angular/core";

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from "../core/logger.service";
import { DataService } from "../core/data.service";
import { BookTrackerError } from "../models/bookTrackerError";

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
    private dataService: DataService
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

    this.loggerService.log(
      "Done with the initialization process of the Dashboard."
    );
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
