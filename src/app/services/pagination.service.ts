import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  public initialPage = "1";
  public pageSize = "5";

  //   getInitialPage() {
  //     return this.initialPage;
  //   }
}
