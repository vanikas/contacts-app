import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contacts';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router : Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigateByUrl('contacts', { state: this.form.value });
  }
}
