import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { QueryDataComponent } from './page/query-data/query-data.component';
import { ImportComponent } from './page/import/import.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'query-data',
    pathMatch: 'full'
  },
  {
    path:'query-data',
    component: QueryDataComponent
  },
  {
    path:'import',
    component: ImportComponent
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
