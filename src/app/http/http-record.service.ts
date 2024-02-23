import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpRecordService {

  private API = environment.API
  private SUB = 'record'
  constructor(private http: HttpClient) { }
  get(params: HttpParams) {
    return this.http.get(`${this.API}/${this.SUB}`, { params: params })
  }
}
