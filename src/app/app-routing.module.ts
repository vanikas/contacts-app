import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'contacts', pathMatch: 'full'},
  {path: 'contacts', component: ContactListComponent},
  {path: 'contacts/add', component: AddContactComponent},
  {path: '**', redirectTo: 'contacts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
