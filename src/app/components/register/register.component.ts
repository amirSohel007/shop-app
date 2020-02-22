import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  constructor(
    private fb : FormBuilder,
    private router : Router,
    private datashare : DataShareService) {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required]
    })
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
   }

  ngOnInit(): void {
  }

  regsiter(){
    if(this.registerForm.valid) {
      localStorage.setItem('userInfo', JSON.stringify(this.registerForm.value));  
      JSON.parse(localStorage.getItem('userInfo'))
       window.location.href = "/products";
    }
  }
}