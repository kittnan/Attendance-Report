import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpExcelReadService {

  private API = environment.API
  private SUB = 'read-excel'
  constructor(private http: HttpClient) { }
  upload(data: any) {
    return this.http.post(`${this.API}/${this.SUB}/upload`, data)
  }
}
