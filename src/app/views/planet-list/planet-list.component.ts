import { Component, OnInit, OnDestroy, Input } from "@angular/core";

import { FilterService } from "src/app/services/filter.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PaginationService } from "src/app/services/pagination.service";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html"
})
export class PlanetListComponent implements OnDestroy {
  // Variables
  private subscription = new Subscription();
  public planetList: Array<any>;
  private filterSubscription: Subscription;
  public searchPhrase: string;
  public pageOfPlanets: Array<any>;
  public initialPage: number;
  public pageSize: number;
  public pageSizeOptions = [5, 10, 25, 100];

  //
  constructor(
    private filterService: FilterService,
    private router: Router,
    private paginationService: PaginationService
  ) {
    this.initialPage = this.paginationService.initialPage;
    this.pageSize = this.paginationService.pageSize;
    this.searchPhrase = this.filterService.searchPhrase;

    // Subscribe to get list of filtered planets
    this.subscription.add(
      (this.filterSubscription = this.filterService.filterSubject.subscribe(
        (data: string) => (this.planetList = JSON.parse(data))
      ))
    );

    this.filterService.getPlanets();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //
  filterPlanets(event: any) {
    this.filterService.filterPlanets(event);
  }

  //
  showDetails(planet: object) {
    this.router.navigate(["details"], {
      queryParams: { planetdetails: JSON.stringify(planet) }
    });
  }

  //
  onChangePage(pageOfPlanets: Array<any>) {
    // update current page of items
    this.pageOfPlanets = pageOfPlanets;

    if (document.querySelector(".page-item.number-item.active")) {
      this.paginationService.initialPage = Number(
        document.querySelector(".page-item.number-item.active").textContent
      );
    }
  }

  // Change page size
  changePageSize(event: any) {
    console.log(typeof event.target.value);
    this.pageSize = Number(event.target.value);
    this.paginationService.pageSize = Number(event.target.value);
    this.planetList.length = 0;
    this.filterService.refreshPlanetList();
  }
}
