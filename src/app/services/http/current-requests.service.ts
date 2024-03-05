import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CurrentRequestsService {
  private currentRequests: BehaviorSubject<string[]>;

  constructor() {
    this.currentRequests = new BehaviorSubject<string[]>([]);
  }

  canRequest(req: HttpRequest<unknown>): boolean {
    if (!this.currentRequests.value.includes(req.url)) {
      this.currentRequests.value.push(req.url);
      return true;
    }
    return false;
  }

  removeRequest(req: HttpRequest<unknown>): void {
    this.currentRequests.value.splice(this.currentRequests.value.indexOf(req.url), 1);
  }
}
