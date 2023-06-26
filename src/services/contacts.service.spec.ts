import { TestBed, async } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Contact } from 'src/models/contacts';

describe('ContactsServiceTsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [],
    providers: [ContactsService]
    }).compileComponents()
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return JSON on success', () => {
    service.getContacts().subscribe(data => {
      expect(data).toEqual(contactsList);
    });
    expect(service).toBeTruthy();
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