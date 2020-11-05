import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './messages/message.service';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageTitle = 'Acme Product Management';



  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  displayMessages(): void{
    this.router.navigate([{outlets: {popup: ['messages']}}]);
    this.messageService.isDisplayed = true;
  }
  hideMessages(): void {
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed = false;
  }


  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/welcome']);
  }
}
