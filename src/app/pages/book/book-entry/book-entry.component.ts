import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, Category } from 'src/models/book';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css'],
})
export class BookEntryComponent implements OnInit {
  public categories:Category[] = [];
  public imageSrc: string | ArrayBuffer | null = null
  private file: File | null = null;

  public form!: FormGroup;
  public onEdit:boolean = false

  constructor(private fb: FormBuilder, private service: BookService, private dialogRef: MatDialogRef<BookEntryComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(this.dialogRef)
  }

  

  public onCategoryChange(e:Event){}

  public onChange(event:Event) {
    const fileInput = event.target as HTMLInputElement
    this.file = fileInput?.files?.length?fileInput?.files[0]:null;
    console.log(this.file)
    if(this.file){
      console.log(this.file)
      // if(this.file.size > 15728640){
      //   alert("File too large")
      //   this.imageSrc = null
      //   return
      // }
      this.readURL(this.file)
    }
}

private readURL(file: File): void {
 
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      console.log(this.imageSrc)
      reader.readAsDataURL(file);
  
}

  private initForm() {
    this.form = this.fb.group({
      categoryId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(File, [Validators.required]),
    });
    this.service.getCategories().subscribe(res=>{
      this.categories = res
    })
    if(this.data){
      this.form.patchValue(this.data);
      this.imageSrc = this.data.imageUrl
      this.onEdit = true
    }
  }

  public onSubmit(){
    const val:Book = this.form.value;
    if(!this.form.valid) return;
    
    this.form.disable();
    if(this.onEdit){
      if(!this.file){
        this.service.editBook({...val, imageUrl: this.data.imageUrl, id: this.data.id}).subscribe(res=>{
          if(!res) return
          this.dialogRef.close(true)
        })
        return
      }
      
      this.service.saveImage(this.file, val.title).subscribe(res=>{
        this.form.enable()
        if(!res.success) return;
        val.imageUrl = res.data.url;
        val.id = this.data.id;
        this.service.editBook(val).subscribe(res=>{
          console.error(res)
          this.dialogRef.close(true)
        });
      })
      return
    }
    if(!this.file) return;
    this.service.saveImage(this.file, val.title).subscribe(res=>{
      this.form.enable()
      if(!res.success) return;
      val.imageUrl = res.data.url;
      this.service.addBook(val).subscribe(res=>{
        if(!res) return;
        this.dialogRef.close(true)
      });
    })
  }

  ngOnInit(): void {
    this.initForm();
  }
}
