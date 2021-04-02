import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, LocationStrategy } from '@angular/common';
import { CanActivate } from '@angular/router';

@Injectable()
export class NotfoundGuardService implements CanActivate {

  constructor(@Inject(DOCUMENT) private readonly document: any,
    private readonly locationStrategy: LocationStrategy) { }

  getUrl(): string {
    return `${this.document.location.origin}${this.locationStrategy.getBaseHref()}`
  }

  canActivate(): boolean {
    window.location.href = `${this.getUrl()}notfound`
    return false
  }

}
