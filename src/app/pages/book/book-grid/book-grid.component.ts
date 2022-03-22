import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Subscription } from 'rxjs';
import { Book, Category } from 'src/models/book';
import { BookService } from 'src/services/book.service';
import { BookEntryComponent } from '../book-entry/book-entry.component';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css'],
})
export class BookGridComponent implements OnInit {
  public selected = '';
  public filters = [
    { name: 'All', value: '', selected: true },
    { name: 'Favorite', value: 'favorite', selected: false },
  ];

  public books: Book[] = [];
  public booksBackup: Book[] = [];

  constructor(private dialog: MatDialog, private service: BookService) {}

  public onFilterChange(val: string) {
    this.selected = val
    if(val === ""){
      this.books = this.booksBackup
    }
    const splitVal = val.split(" ");
    if(splitVal[1] && splitVal[1] === 'cat'){
      const selectedBooks = this.booksBackup.filter(book=>book.category?.id === splitVal[0]);
      this.books = selectedBooks
      return
    }
    if(splitVal[0] === 'favorite'){
      const selectedBooks = this.booksBackup.filter(book=>book.favorite);
      this.books = selectedBooks
    }
  }

  private extractCategoriesAddToFilter(categories:Category[]) {
    categories.map(cat=>{
      this.filters.push({name: `By Category(${cat.name})`, value: `${cat.id} cat`, selected: false})
    })
  }

  public add() {
    const dialogRef = this.dialog.open(BookEntryComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res) this.getBooks()
    })
  }
  public edit(book: Book) {
    const dialogRef =  this.dialog.open(BookEntryComponent, { data: book });
    dialogRef.afterClosed().subscribe(res=>{
      if(res) this.getBooks()
    })
  }
  public delete(book: Book) {
    this.service.deleteBook(book).subscribe(res=>{
      if(res) this.getBooks()
    });
  }

  public addToFavorite(book: Book) {
    book.favorite = !book.favorite
    this.service.toggleBookAsFav(book).subscribe(res=>{
      if(res)  this.getBooks();
    });
  }

  private getBooks() {
    
    const req = {
      books: this.service.getBooks(),
      categories: this.service.getCategories(),
    };
    forkJoin(req).subscribe((res:{categories:Category[], books: Book[]}) => {
      const categories = res.categories;
      this.extractCategoriesAddToFilter(categories)
      const books = res.books;
      const catObj: any = {};
      categories.map((cat) => {
        catObj[cat.id] = cat;
      });
      books.forEach((book) => {
        book.category = catObj[book.categoryId];
        return book;
      });
      this.books = books;
      this.booksBackup = books;
      this.onFilterChange(this.selected)
    });
    
  }

  ngOnInit(): void {
    this.getBooks();
  }

  
}
