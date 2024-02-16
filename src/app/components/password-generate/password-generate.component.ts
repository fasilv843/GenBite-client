import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

interface StringOptions {
  numbers?: boolean,
  lowercase?: boolean,
  uppercase?: boolean,
  symbols?: boolean
}

@Component({
  selector: 'app-password-generate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-generate.component.html',
  styleUrl: './password-generate.component.css'
})
export class PasswordGenerateComponent {
  readonly = true
  form: FormGroup

  constructor () {
    this.form = new FormGroup({
      length: new FormControl(8, [Validators.required, Validators.min(3), Validators.max(20)]),
      uppercase: new FormControl(true),
      lowercase: new FormControl(true),
      numbers: new FormControl(true),
      symbols: new FormControl(true),
      password: new FormControl('') // Reset generated password on form update
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.getRawValue()
      const { length, lowercase, uppercase, numbers, symbols } = data
      this.form.get('password')?.setValue(this.generateRandomString(length, { lowercase, uppercase, numbers, symbols }))
      this.readonly = false
    }
  }
  
  generateRandomString(length: number, options: StringOptions = {
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true
  }): string {
  
    // Build character set based on user options
    let charSet = "";
    if (options.numbers) {
      charSet += "01234567890123456789";
    }
    if (options.uppercase) {
      charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (options.lowercase) {
      charSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (options.symbols) {
      charSet += "!@#$%^&*()_+-=[]{};':\"\\|,<.>/?~";
    }
  
    // Validate character set length (must be at least 1)
    if (!charSet.length) {
      return 'Please Select At least One'
    }
  
    // Generate random password
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
  
    return array.reduce((password, byte) => {
      const charIndex = byte % charSet.length; // Random index within character set
      return password + charSet[charIndex];
    }, "");
  }
}
