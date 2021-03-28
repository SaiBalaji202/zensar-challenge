import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersStore } from '@app/users/store/users.store';
import { UserProfile } from './../../models/profile.model';
import { mimeTypeValidator } from './../../../shared/validators/mime-type-validator';

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
      // this.goBack();
    } else {
      this.initForm();
    }
  }

  initFormOperation() {
    this.formOperation =
      this.route.snapshot.params.id === 'new' ? 'ADD' : 'EDIT';
  }

  loadFormData() {
    if (this.formOperation === 'ADD') {
      this.defaultFormData = {
        Image: null,
        name: null,
        id: null,
      };
    } else {
      this.defaultFormData = this.usersStore.getUserById(
        this.route.snapshot.params.id
      );
      this.avatarPreview = this.defaultFormData?.Image;
    }
  }

  initForm(): void {
    const { name, Image } = this.defaultFormData;
    this.userForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      Image: new FormControl(Image, {
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

    this.userForm.patchValue({ Image: file });
    this.userForm.get('Image').markAsTouched();
    this.userForm.get('Image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onloadend = () => {
      this.avatarPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  deleteUser(): void {
    if (this.defaultFormData.id) {
      this.usersStore.deleteUser(this.defaultFormData.id);
      this.goBack();
    }
  }

  cancel(): void {
    this.goBack();
  }

  submit(): void {
    if (!this.userForm.valid) {
      return;
    }

    const { name, Image } = this.userForm.value;
    if (this.formOperation === 'ADD') {
      this.usersStore.addUser(name, this.avatarPreview);
    } else {
      this.usersStore.updateUser(
        this.defaultFormData.id,
        name,
        this.avatarPreview
      );
    }
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
