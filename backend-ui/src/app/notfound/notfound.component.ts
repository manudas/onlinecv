import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-notfound',
  template: '',
})
export class NotfoundComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private readonly document: any,
    private readonly locationStrategy: LocationStrategy) { }

  getUrl(): string {
    return `${this.document.location.origin}${this.locationStrategy.getBaseHref()}`
  }

  ngOnInit(): void {
    window.location.href = `${this.getUrl()}notfound`
  }

}
