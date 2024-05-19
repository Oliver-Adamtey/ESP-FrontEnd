import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InviteUserService } from '../../../../../services/Organizer/invite-organizer/invite-user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-invite',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,
    ReactiveFormsModule,


  ],
  templateUrl: './user-invite.component.html',
  styleUrl: './user-invite.component.css'
})
export class UserInviteComponent {

  OrganInvite: FormGroup
  isSubmitted: boolean = false;
  isError: boolean = false;

  constructor(private organizer: InviteUserService, private router: Router) {
    this.OrganInvite = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      fullName: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

ngOnInit(): void {

  this.onSubmit()
}


  onSubmit() {

console.log(this.OrganInvite)

    if (this.OrganInvite.valid) {
      const postData = this.OrganInvite.value;
      this.organizer.organizer(postData).subscribe({
        next: (response) => {
          this.isSubmitted = true;
          console.log('Invitation sent successfully', response);
          alert('Invitation sent successfully')
          this.router.navigateByUrl('/org-dash');
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
  const cancel = window.confirm('Are you sure you want to cancel');
  if(cancel){
  this.profile = false
  this.router.navigate(['/org-users']);
  }
}


}
