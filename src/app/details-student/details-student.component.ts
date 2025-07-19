import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {

  studentId!: number;
  studentDetails: any;
  showError = false;
  errorMessage = '';

  constructor(
    private titleService: Title,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Student Details');
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Student ID from route:', this.studentId);
    this.getUserDetails(this.studentId);
  }

  getUserDetails(studentId: number) {
    const url = `${environment.apiBaseUrl}/users/${studentId}`;

    this.httpClient.get<ApiResponse>(url)
      .subscribe({
        next: (response) => {
          this.studentDetails = response.data;
          console.log('Student details loaded:', this.studentDetails);
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

  goBackToList() {
    this.router.navigate(['/show-student']);
  }

}
