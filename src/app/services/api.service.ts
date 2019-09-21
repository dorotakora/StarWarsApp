import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  url: string = "https://swapi.co/api/planets";

  constructor(private httpClient: HttpClient) {}

  public getPlanets(): Observable<any[]> {
    let resp1 = this.httpClient.get(`${this.url}/?page=1`);
    let resp2 = this.httpClient.get(`${this.url}/?page=2`);
    let resp3 = this.httpClient.get(`${this.url}/?page=3`);
    let resp4 = this.httpClient.get(`${this.url}/?page=4`);
    let resp5 = this.httpClient.get(`${this.url}/?page=5`);
    let resp6 = this.httpClient.get(`${this.url}/?page=6`);
    let resp7 = this.httpClient.get(`${this.url}/?page=7`);

    return forkJoin([resp1, resp2, resp3, resp4, resp5, resp6, resp7]);
  }
}
