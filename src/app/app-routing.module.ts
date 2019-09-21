import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanetListComponent } from "./views/planet-list/planet-list.component";
import { PlanetDetailsComponent } from "./views/planet-details/planet-details.component";

export const routes: Routes = [
  {
    path: "",
    component: PlanetListComponent
  },
  {
    path: "details",
    component: PlanetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
