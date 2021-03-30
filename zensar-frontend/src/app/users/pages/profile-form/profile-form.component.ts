import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersStore } from '@app/users/store/users.store';
import { UserProfile } from './../../models/profile.model';
import { mimeTypeValidator } from './../../../shared/validators/mime-type-validator';
import { Observable } from 'rxjs';

export type FormOperation = 'ADD' | 'EDIT';

@Component({
  selector: 'zensar-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  formOperation: FormOperation;
  defaultFormData: UserProfile;
  userForm: FormGroup;
  avatarPreview: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersStore: UsersStore
  ) {}

  ngOnInit(): void {
    this.initFormOperation();
    this.loadFormData();
    if (!this.defaultFormData) {
      this.goBack();
    } else {
      this.initForm();
    }
  }

  initFormOperation(): void {
    this.formOperation =
      this.route.snapshot.params.id === 'new' ? 'ADD' : 'EDIT';
  }

  loadFormData(): void {
    if (this.formOperation === 'ADD') {
      this.defaultFormData = {
        image: null,
        name: null,
        _id: null,
      };
    } else {
      this.defaultFormData = this.usersStore.getUserById(
        this.route.snapshot.params.id
      );
      this.avatarPreview = this.defaultFormData?.image;
    }
  }

  initForm(): void {
    const { name, image } = this.defaultFormData;
    this.userForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      image: new FormControl(image, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
    });
  }

  onImgChange(e): void {
    const file = (e.target as HTMLInputElement).files[0];

    if (!file) {
      // user clicked cancel button
      return;
    }

    if (!this.userForm.dirty) {
      this.userForm.markAsDirty();
    }

    this.userForm.patchValue({ image: file });
    this.userForm.get('image').markAsTouched();
    this.userForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onloadend = () => {
      this.avatarPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDeleteUser(): void {
    if (this.defaultFormData._id) {
      this.usersStore.deleteUser(this.defaultFormData._id);
      this.goBack();
    }
  }

  cancel(): void {
    if (
      !this.userForm.dirty ||
      confirm('Do you want to Discard your changes')
    ) {
      this.goBack();
    }
  }

  submit(): void {
    if (!this.userForm.valid) {
      return;
    }

    let updateUser$: Observable<UserProfile>;
    const { name, image } = this.userForm.value;
    if (this.formOperation === 'ADD') {
      updateUser$ = this.usersStore.addUser(name, image);
    } else {
      updateUser$ = this.usersStore.updateUser(
        this.defaultFormData._id,
        name,
        image
      );
    }
    updateUser$.subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
