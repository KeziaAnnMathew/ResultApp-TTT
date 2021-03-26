import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  readonly baseurl='http://localhost:3000';
  constructor(private http:HttpClient) { }
  getResultsService(list:any){
    return this.http.post(this.baseurl+`/getResults`,{'list':list})
  }
}
