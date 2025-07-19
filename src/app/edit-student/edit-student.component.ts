import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface ApiResponse<T = any> {
  code: string;
  success: boolean;
  message: string;
  data?: T;
}

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
    studentId!: number;
    showError = false;
    errorMessage = '';
    showSuccess = false;
    successMessage = '';

    student = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    constructor(
      private titleService: Title,
      private router: Router,
      private httpClient: HttpClient,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Edit Student');
      this.studentId = Number(this.route.snapshot.paramMap.get('id'));
      this.getUserDetails(this.studentId);
    }

  
    getUserDetails(studentId: number) {
      const url = `${environment.apiBaseUrl}/users/${studentId}`;
      this.httpClient.get<ApiResponse>(url).subscribe({
        next: (response) => {
          const studentData = response.data;
          this.student.patchValue({ name: studentData.name });
        },
        error: (error) => {
          const errResp = error.error as ApiResponse;
          this.errorMessage = errResp?.message || 'Failed to fetch student details.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
            this.errorMessage = '';
            this.router.navigate(['/show-student']);
          }, 3000);
        }
      });
    }

    handleEditSubmit() {
      if (this.student.invalid) {
        this.student.markAllAsTouched();
        return;
      }

      const url = `${environment.apiBaseUrl}/users/${this.studentId}`;
      this.httpClient.put<ApiResponse>(url, this.student.value).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Student updated successfully!';
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
            this.successMessage = '';
            this.router.navigate(['/show-student']);
          }, 2000);
        },
        error: (error) => {
          const errResp = error.error as ApiResponse;
          this.errorMessage = errResp?.message || 'Failed to update student.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
            this.errorMessage = '';
          }, 3000);
        }
      });
    }
  
    goBackToList() {
      this.router.navigate(['/show-student']);
    }

}
