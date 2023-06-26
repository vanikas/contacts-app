import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactsService } from 'src/services/contacts.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Contact } from 'src/models/contacts';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

describe('ContactListComponent', () => {
  let comp: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactsService;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    declarations: [ContactListComponent],
    providers: [ContactsService, FormBuilder]
  }).compileComponents()
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    comp = fixture.componentInstance;
    comp.contactsList = contactsList;
    formBuilder = TestBed.inject(FormBuilder);
    comp.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]]
    });
    contactService = TestBed.inject(ContactsService);
    fixture.detectChanges();
  });


  it('should run on getContact List from API', () => {
      spyOn(contactService, 'getContacts').and.returnValue(of(contactsList));
      comp.getContactsList();
      expect(comp.contactsList).toEqual(contactsList);
  });

  it('should run on getContact List from back of add new contact', () => {
    comp.newAddedContact = {
      firstName: 'Ankur',
    lastName: 'Agarwal',
    phone: 987654321
    }
    spyOn(contactService, 'getContacts').and.returnValue(of(contactsList));
    comp.getContactsList();
    expect(comp.contactsList).toEqual(contactsList);
});

  it('should run on update contact', () => {
    const form = {
      value: {
        firstName: 'Anju',
        lastName: 'Agarwal',
        phone: '123456789'
      }
    };
    comp.contactsList[0].firstName = form.value.firstName;
    comp.update(1);
    expect(comp.contactsList[0].firstName).toEqual('Anju');
  });

  it('should run on delete contact', () => {
    comp.delete(3);
    expect(comp.contactsList.length).toEqual(2);
  });
});
const contactsList: Contact[] = [
  {
    firstName: 'Anuj',
    lastName: 'Agarwal',
    phone: 123456789,
    id: 1
  }
]