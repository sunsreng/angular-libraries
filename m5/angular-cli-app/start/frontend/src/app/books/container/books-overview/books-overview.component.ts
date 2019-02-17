import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BookService } from '../../../core/services/book.service';
import { LoggingService } from '../../../core/services/logging.service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.css'],
})
export class BooksOverviewComponent implements OnInit {
  currentBooks$: Observable<Book[]>;

  private activeTabIndex = 0;

  constructor(
    private readonly bookService: BookService,
    private readonly customLoggingService: LoggingService
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  bookChanged(book: Book) {
    this.bookService.update(book).subscribe(() => {
      this.getAllBooks();
      this.customLoggingService.info('Somebody was changing a book');
    });
  }

  loadBooks(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
    this.getAllBooks();
  }

  private getAllBooks() {
    const read = this.activeTabIndex === 1;
    this.currentBooks$ = this.bookService.getAllBooks(read).pipe(share());
  }
}