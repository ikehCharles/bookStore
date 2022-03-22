import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEntryComponent } from './pages/book/book-entry/book-entry.component';
import { BookGridComponent } from './pages/book/book-grid/book-grid.component';
import { CategoryGridComponent } from './pages/category/category-grid/category-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookGridComponent, },
  { path: 'categories', component: CategoryGridComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
