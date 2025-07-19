import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

interface ApiResponse<T = any> {
  code: string;
  success: boolean;
  message: string;
  data?: T;
}

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {

    studentId!: number;
    showError = false;
    errorMessage = '';
    showSuccess = false;
    successMessage = '';

    constructor(
      private httpClient: HttpClient,
      private titleService: Title,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
  
    ngOnInit(): void {
      this.titleService.setTitle('Delete Student');
      this.studentId = Number(this.route.snapshot.paramMap.get('id'));
      this.confirmAndDelete(this.studentId);
    }
  
    confirmAndDelete(studentId: number) {
    if (confirm(`Are you sure you want to delete student ID ${studentId}?`)) {
      const url = `http://localhost:8087/api/v1/users/delete-user`;

      const body = { id: studentId }; // Assuming your backend expects ID in body

      this.httpClient.post<ApiResponse>(url, body).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Student deleted successfully';
          this.showSuccess = true;

          this.showSuccess = false;
          this.router.navigate(['/show-student']);
        },
        error: (error) => {
          const errResp = error.error as ApiResponse;
          this.errorMessage = errResp?.message || 'Error deleting student.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
            this.router.navigate(['/show-student']);
          }, 3000);
        }
      });
    } else {
      this.router.navigate(['/show-student']);
    }
  }
}
