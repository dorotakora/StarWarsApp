import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { PlanetListComponent } from "./views/planet-list/planet-list.component";
import { ApiService } from "./services/api.service";
import { FilterService } from "./services/filter.service";
import { PlanetDetailsComponent } from "./views/planet-details/planet-details.component";
import { AppRoutingModule } from "./app-routing.module";
import { JwPaginationComponent } from "jw-angular-pagination";
import { PaginationService } from "./services/pagination.service";

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
    JwPaginationComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [ApiService, FilterService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
