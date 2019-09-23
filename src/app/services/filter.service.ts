import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Subject } from "rxjs";

@Injectable()
export class FilterService {
  constructor(private apiService: ApiService) {}

  private planetList: Array<any>;
  private filteredList: Array<any>;
  public filterSubject = new Subject();
  public searchPhrase: string;

  // Prod
  getPlanets() {
    if (!this.planetList) {
      this.apiService.getPlanets().subscribe(data => {
        this.planetList = this.filteredList = [
          ...data[0]["results"],
          ...data[1]["results"],
          ...data[2]["results"],
          ...data[3]["results"],
          ...data[4]["results"],
          ...data[5]["results"],
          ...data[6]["results"]
        ];
        this.filterSubject.next(JSON.stringify(this.filteredList));
      });
    } else {
      if (this.searchPhrase) {
        this.filterSubject.next(
          JSON.stringify(
            this.planetList.filter(
              planet =>
                planet.name
                  .toLowerCase()
                  .indexOf(this.searchPhrase.toLowerCase()) !== -1
            )
          )
        );
      } else {
        this.filterSubject.next(JSON.stringify(this.filteredList));
      }
    }
  }

  //
  filterPlanets(event: any) {
    console.log(`FilterService filterPlanets()`);
    this.filteredList = this.planetList.filter(
      planet =>
        planet.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
        -1
    );
    this.filterSubject.next(JSON.stringify(this.filteredList));
    this.searchPhrase = event.target.value;
  }

  //
  refreshPlanetList() {
    console.log(`FilterService test()`);
    this.filterSubject.next(JSON.stringify(this.filteredList));
  }
}
