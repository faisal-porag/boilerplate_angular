import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface ApiResponse<T = any> {
  code: string;
  success: boolean;
  message: string;
  data?: T;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Add Student');
  }

  student = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3)
    ])
  });

  showSuccess = false;
  showError = false;
  errorMessage: string = '';
  successMessage: string = '';

  handleSubmit() {
    if (this.student.invalid) {
      this.student.markAllAsTouched();
      return;
    }

    const url = 'http://localhost:8087/api/v1/users';

    this.httpClient.post<ApiResponse>(url, this.student.value)
      .subscribe(response => {
        console.log('Student added successfully', response);
        this.student.reset();

        this.successMessage = response.message || 'Student added successfully!';
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
            this.successMessage = '';
            this.router.navigate(['/show-student']); // Redirect after 1 sec
        }, 1000);
      }, error => {
          console.error('Error adding student', error);

          // Cast error.error as ApiResponse to safely access message
          const errResp = error.error as ApiResponse;

          this.errorMessage = errResp?.message || 'Failed to add student. Please try again.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
            this.errorMessage = '';
          }, 3000);
      });
  }

}
