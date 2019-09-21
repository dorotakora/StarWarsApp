import { Component, OnInit, OnDestroy, Input } from "@angular/core";

import { FilterService } from "src/app/services/filter.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PaginationService } from "src/app/services/pagination.service";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html"
})
export class PlanetListComponent implements OnInit, OnDestroy {
  // Variables
  private subscription = new Subscription();
  public planetList;
  private filterSubscription: Subscription;
  public searchPhrase;
  public pageOfPlanets: Array<any>;
  // public initialPage = "1";
  // public pageSize = "5";
  public initialPage;
  public pageSize;
  public pageSizeOptions = [5, 10, 25, 100];

  //
  constructor(
    private filterService: FilterService,
    private router: Router,
    private paginationService: PaginationService
  ) {
    this.initialPage = this.paginationService.initialPage;
    this.pageSize = this.paginationService.pageSize;

    // Subscribe to get list of all planets
    // this.subscription.add(
    //   (this.planetListSubscription = this.filterService.planetListSubject.subscribe(
    //     data => (this.planetList = data)
    //   ))
    // );

    // Subscribe to get list of filtered planets
    this.subscription.add(
      (this.filterSubscription = this.filterService.filterSubject.subscribe(
        (data: string) => (this.planetList = JSON.parse(data))
      ))
    );

    this.filterService.getPlanets();
    this.searchPhrase = this.filterService.searchPhrase;
  }

  //
  ngOnInit() {}

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
    // console.log(pageOfPlanets);
    if (document.querySelector(".page-item.number-item.active")) {
      // console.log(
      //   document.querySelector(".page-item.number-item.active").textContent
      // );
      this.paginationService.initialPage = document.querySelector(
        ".page-item.number-item.active"
      ).textContent;
    }
  }

  //
  // test() {
  //   this.planetList.length = 0;
  //   this.filterService.test();
  // }

  // Change page size
  changePageSize(event: any) {
    this.pageSize = event.target.value;
    this.paginationService.pageSize = event.target.value;
    this.planetList.length = 0;
    this.filterService.refreshPlanetList();
  }
}
