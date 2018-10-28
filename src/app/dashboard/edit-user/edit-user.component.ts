import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { TestService } from 'src/app/services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  id: number;
  user: IUser;
  userForm = this.fb.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, Validators.required],
    street: [null, Validators.required],
    suite: [null, Validators.required],
    city: [null, Validators.required],
    zipcode: [null, Validators.required],
    phone: [null, Validators.required],
    website: [null, Validators.required],
    companyname: [null, Validators.required],
    catchphrase: [null, Validators.required],
    bs: [null, Validators.required]
  });
  private sub: any;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });
    this.testService.getUserData(this.id).subscribe((result: IUser) => {
      this.user = result;
      this.userForm = this.fb.group({
        name: [this.user.name, Validators.required],
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.required],
        street: [this.user.address.street, Validators.required],
        suite: [this.user.address.suite, Validators.required],
        city: [this.user.address.city, Validators.required],
        zipcode: [this.user.address.zipcode, Validators.required],
        phone: [this.user.phone, Validators.required],
        website: [this.user.website, Validators.required],
        companyname: [this.user.company.name, Validators.required],
        catchphrase: [this.user.company.catchPhrase, Validators.required],
        bs: [this.user.company.bs, Validators.required]
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    this.user.name = this.userForm.value.name;
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.address.street = this.userForm.value.street;
    this.user.address.suite = this.userForm.value.suite;
    this.user.address.city = this.userForm.value.city;
    this.user.address.zipcode = this.userForm.value.zipcode;
    this.user.phone = this.userForm.value.phone;
    this.user.website = this.userForm.value.website;
    this.user.company.name = this.userForm.value.companyname;
    this.user.company.catchPhrase = this.userForm.value.catchphrase;
    this.user.company.bs = this.userForm.value.bs;
    this.testService.editUserData(this.user).subscribe(data => {
      this.router.navigate(['/dashboard']);
    });
  }
}
