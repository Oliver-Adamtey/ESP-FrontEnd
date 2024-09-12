import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InviterAdminService } from '../../../../../services/Admin/invite-admin/inviter-admin.service';

@Component({
  selector: 'app-users-admin-invite',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,RouterLink,

  ],
  templateUrl: './users-admin-invite.component.html',
  styleUrl: './users-admin-invite.component.css'
})
export class UsersAdminInviteComponent {

  adminInvite: FormGroup;
  isSubmitted: boolean = false;
  isError: boolean = false;

  constructor(private admin: InviterAdminService, private router: Router) {
    this.adminInvite = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      fullName: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
console.log(this.adminInvite)

    if (this.adminInvite.valid) {
      const postData = this.adminInvite.value;
      this.admin.admin(postData).subscribe({
        next: (response) => {
          this.isSubmitted = true;
          console.log('Invitation sent successfully', response);
          alert('Invitation sent successfully')
          this.router.navigateByUrl('/admin-dash');
        },
        error: (error) => {
          console.error('Error creating post:', error);
          console.log(postData);
          alert('Failed to create event. Please try again later');
        }
      });
    } else {
      this.isError = true;

    }
  }



  closeModal(){
    this.router.navigate(['/org-dash']);
    // this.router.navigate(['/org-u']);
  }
  cancelModal(){

    this.router.navigate(['/org-dash']);

  }


  profile: boolean = true;

  offToggle(){
    // this.profile = false
    this.profile = !this.profile
    // const cancel = window.confirm('Are you sure you want to cancel');
    // if(cancel){
    this.router.navigate(['/admin-users']);
    // }

  }





}
