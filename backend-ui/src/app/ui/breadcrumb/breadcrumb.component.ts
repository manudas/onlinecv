import { LocationStrategy } from '@angular/common'
import { Component, OnChanges, SimpleChanges } from '@angular/core'
import { Observable } from 'rxjs'
import { Breadcrumb } from './service/breadcrumb.model'

import { BreadcrumbService } from './service/breadcrumb.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnChanges {

  breadcrumbs$: Observable<Breadcrumb[]>
  breadcrumbs: Breadcrumb[]

  constructor( private breadcrumbService: BreadcrumbService, private locationStrategy: LocationStrategy ) {
    this.breadcrumbs$ = this.breadcrumbService.asObservable()
    this.breadcrumbs$.subscribe(data => {
      this.breadcrumbs = [{
        label: 'Home',
        url: this.locationStrategy.getBaseHref()
      }, ...data]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.')
  }

  getRouterUrl(index: number) {
    return this.breadcrumbs.slice(0, index + 1).map( ({url}) => url)
  }
}
