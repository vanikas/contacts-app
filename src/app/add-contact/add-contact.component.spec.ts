import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddContactComponent } from './add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    declarations: [AddContactComponent],
    providers: []
  }).compileComponents()
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should run on submit', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.submit();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('contacts');
  });
});