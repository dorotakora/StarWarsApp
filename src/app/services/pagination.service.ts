import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  public initialPage: number = 1;
  public pageSize: number = 5;
}
