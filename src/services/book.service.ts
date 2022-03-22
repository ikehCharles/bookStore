import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, Category } from 'src/models/book';



const key = {
    Books: "TaskBooks",
    Categories: "TaskCategories"
}


interface ImageRes {
  data: Image;
  status: number;
  success: boolean;
}

interface Image {
  delete_url: string;
  display_url: string;
  expiration: string;
  id: string;

  extension: string;
  filename: string;
  mime: string;
  name: string;
  url: string;
  size: number;
  time: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private categoryEndpoint = `categories`
  private bookEndpoint = `books`


  constructor(private http: HttpClient) {
  }

  

  public  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseApi}${this.categoryEndpoint}`);

  }
  
  public getBooks():Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.baseApi}${this.bookEndpoint}`);
  }
 
  public addCategory(category: Category) {
    category.id = Math.floor(Math.random() * 100).toString();
    return this.http.post<any>(`${environment.baseApi}${this.categoryEndpoint}`, category);
    
    
  }
  public editCategory(category: Category) {
    return this.http.put<any>(`${environment.baseApi}${this.categoryEndpoint}/${category.id}`, category);
   
  }
  public deleteCategory(category: Category) {
    
    return this.http.delete<any>(`${environment.baseApi}${this.categoryEndpoint}/${category.id}`);
  
  }
  public addBook(book: Book) {
    book.id = Math.floor(Math.random() * 100).toString();
    return this.http.post<any>(`${environment.baseApi}${this.bookEndpoint}`, book);
    
  }
  public editBook(book: Book) {
    return this.http.put<any>(`${environment.baseApi}${this.bookEndpoint}/${book.id}`, book);
    
  }
  public deleteBook(book: Book) {
    return this.http.delete<any>(`${environment.baseApi}${this.bookEndpoint}/${book.id}`);
   
  }
  public toggleBookAsFav(book: Book) {
    return this.http.put<any>(`${environment.baseApi}${this.bookEndpoint}/${book.id}`, book);

  }
  public saveImage(bookImage: File, name: string): Observable<ImageRes> {
    const imageName = name + Date.now();
    const formData = new FormData();
    formData.append('key', 'd8269a7046257c6c7e4038ca3f0ad098');
    formData.append('name', imageName);
    formData.append('image', bookImage, 'image');

    return this.http.post<ImageRes>('https://api.imgbb.com/1/upload', formData);
  }
}
