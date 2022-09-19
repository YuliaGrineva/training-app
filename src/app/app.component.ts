import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password: string = '';

  

  onButtonClick() {
    this.password = "my password"
  }

  openSidenav = false;


 
}
