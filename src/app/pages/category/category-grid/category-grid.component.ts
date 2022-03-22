import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Subscription } from 'rxjs';
import { InitDisplayedCol, More } from 'src/app/shared/table-ui/table-ui.component';
import { Category } from 'src/models/book';
import { BookService } from 'src/services/book.service';
import { CategoryEntryComponent } from '../category-entry/category-entry.component';

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent implements OnInit {

  public initColumn:InitDisplayedCol[] =[
    {
      name: '',
      type: 'checkbox',
      value: 'checkbox',
    },
    
    {
      name: 'ID',
      type: 'text',
      value: 'id',
    },
    {
      name: 'Name',
      type: 'text',
      value: 'name',
    },
    
    

    {
      name: '',
      type: 'more',
      value: 'more',
    },
  ]
  public more: More[] = [
    
    {
      name: 'Edit',
      value: 'edit',
    },
  ];

  private selected:Category[] = []

  private categories$?:Subscription;
  public categories:Category[] = []

  constructor(private dialog: MatDialog, private service: BookService) { }

  public add(){
    const dialogRef = this.dialog.open(CategoryEntryComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res) this.getCategories()
    })
  }
  public delete(){
   if(!this.selected.length) return;
   const selectedReq:any = []
   this.selected.map(d=>{
     selectedReq.push(this.service.deleteCategory(d))
   })
   forkJoin(selectedReq).subscribe(res=>{
     if(res) this.getCategories()
   })
  }

  public onCheckboxCheck(event:any){
    this.selected = event
  }
  public onClickMore(event:any){
    if(event.option.value === 'edit'){
      const dialogRef = this.dialog.open(CategoryEntryComponent, {data:event.item})
      dialogRef.afterClosed().subscribe(res=>{
        if(res) this.getCategories()
      })
    }
  }

  private getCategories(){
    this.service.getCategories().subscribe(res=>{
    
      this.categories = [...res];
      
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }
  ngOnDestroy(): void {
    this.categories$?.unsubscribe()
}

}
