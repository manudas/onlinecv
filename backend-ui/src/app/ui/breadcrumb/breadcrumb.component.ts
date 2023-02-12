import { LocationStrategy } from '@angular/common'
import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Breadcrumb } from './service/breadcrumb.model'

import { BreadcrumbService } from './service/breadcrumb.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

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

  getRouterUrl(index: number) {
    return this.breadcrumbs.slice(0, index + 1).map( ({url}) => url)
  }
}
