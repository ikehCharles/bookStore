import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/models/book';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent implements OnInit {

  


  public form!: FormGroup;
  public onEdit:boolean = false


  constructor(private fb: FormBuilder, private service: BookService, private dialogRef: MatDialogRef<CategoryEntryComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }


  private initForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(){
    const val:Category = this.form.value;
    if(!this.form.valid) return;
    this.form.disable()
    if(this.onEdit){
      const id = this.data.id
      this.service.editCategory({...val, id}).subscribe(res=>{
        this.form.enable()
        if(res) this.dialogRef.close(true)
 
      });
      return;
    }

    this.service.addCategory(val).subscribe(res=>{
      this.form.enable()
      if(res) this.dialogRef.close(true)
      
    });
    
  }



  ngOnInit(): void {
    this.initForm();
    if(this.data){
      this.form.patchValue(this.data)
      this.onEdit = true
    }
  }

}
