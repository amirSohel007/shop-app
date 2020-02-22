import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  constructor(private fb : FormBuilder) {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

}
