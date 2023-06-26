import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contacts';
import { ContactsService } from 'src/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  contactsList: Contact[] = [];
  form!: FormGroup;
  enableEditIndex = null;
  newAddedContact: Contact | any;

  constructor(public contactService: ContactsService, private formBuilder: FormBuilder, private router: Router) {
    this.newAddedContact = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.getContactsList();
    this.initializeForm();
  }


  initializeForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]],
      id: ['']
    });
  }

  getContactsList() {
    this.contactService.getContacts().subscribe(response => {
      this.contactsList = response;
      if (this.newAddedContact) {
        this.newAddedContact.id = this.contactsList.length + 1;
        this.contactsList.push(this.newAddedContact);
      }
    }, (error : any)=> {
        if (error?.status == 404) {
          // show alert
        }
    });
  }

  update(i: number) {
    this.enableEditIndex = null;
    this.contactsList[i] = this.form.value;
  }

  switchEditMode(i: any) {
    console.log(i);
    console.log(this.contactsList);
    let user = this.contactsList[i];
    if (user) {
      this.form.setValue({ firstName: user?.firstName, lastName: user?.lastName, phone: user?.phone, id: user?.id });
    }
    this.enableEditIndex = i;
  }

  delete(i: number) {
    this.enableEditIndex = null;
    this.contactsList.splice(i, 1);
  }
}
