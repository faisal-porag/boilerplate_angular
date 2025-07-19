import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private titleService: Title,
    private router: Router
  ) { }

  students: any[] = [];
  pageInfo: any = null;
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.titleService.setTitle('Show Students');
    this.getAllStudents(this.currentPage);
  }

  getAllStudents(page: number) {
    // Logic to fetch all students from the server
    // This could involve making an HTTP GET request to an API endpoint
    console.log('Fetching all students...');
    const url = `${environment.apiBaseUrl}/users?page=${page}&size=${this.pageSize}`;
    console.log(`Request URL: ${url}`);
    // Use HttpClient to make the request and handle the response
    this.httpClient.get<any>(url).subscribe(response => {
      console.log('Students fetched successfully', response);
      this.students = this.students = response?.data?.items || [];
      this.pageInfo = response?.data?.pageInfo || null;
      this.currentPage = this.pageInfo?.currentPage || 1;
    }, error => {
      console.error('Error fetching students', error);
    });

  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.getAllStudents(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.pageInfo?.hasNextPage) {
      this.getAllStudents(this.currentPage + 1);
    }
  }


  goToViewDetails(studentId: number) {
    console.log('View details Id:', studentId);
    this.router.navigate(['/students/details', studentId]);
  }

  goToEditStudent(studentId: number) {
    console.log('Edit student:', studentId);
    this.router.navigate(['/students/edit', studentId]);
  }

  goToDeleteStudent(studentId: number) {
    console.log('Delete Student Id:', studentId);
    this.router.navigate(['/students/delete', studentId]);
  }

  goToAddStudent() {
    console.log('Navigate to add student');
    this.router.navigate(['/add-student']);
  }

}
