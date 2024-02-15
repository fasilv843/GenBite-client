import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password: string = ''
  length: number = 6
  title = 'password-generator';
  
  generatePassword() {
    const array = new Uint8Array(this.length);
    window.crypto.getRandomValues(array);
  
    // Convert the random bytes to characters
    this.password = array.reduce((password, byte) => {
      const charCode = 33 + byte % 94; // Choose characters from "!" to "~"
      return password + String.fromCharCode(charCode);
    }, '');
  }
  
}
