import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ShowStudentComponent } from './show-student/show-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DetailsStudentComponent } from './details-student/details-student.component';

const routes: Routes = [
  {path:"", component: ShowStudentComponent},
  {path:"add-student", component: AddStudentComponent},
  {path:"show-student", component: ShowStudentComponent},
  {path:"students/delete/:id", component: DeleteStudentComponent},
  {path:"students/edit/:id", component: EditStudentComponent},
  {path:"students/details/:id", component: DetailsStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
