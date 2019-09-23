import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-planet-details",
  templateUrl: "./planet-details.component.html"
})
export class PlanetDetailsComponent {
  public details;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.details = JSON.parse(params.planetdetails);
    });
  }

  goBack() {
    this.router.navigate([""]);
  }
}
