import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDepartmentService {

  private API = environment.API
  private SUB = 'department'
  constructor(private http: HttpClient) { }
  departmentOption(params: HttpParams) {
    return this.http.get(`${this.API}/${this.SUB}/departmentOption`, { params: params })
  }
}
