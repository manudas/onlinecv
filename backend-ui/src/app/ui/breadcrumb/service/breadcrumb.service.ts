import { Injectable } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { Breadcrumb } from './breadcrumb.model'

@Injectable()
export class BreadcrumbService {

  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([])

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable()
  public asObservable = () => this.breadcrumbs$
  public getValue = () => this._breadcrumbs$.value

  constructor(private router: Router, private activatedRoute : ActivatedRoute) {
    this.router.events.pipe(
      // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((activatedRoute) => this.processRouteHierarchy(activatedRoute)),
      map(route => route.url)
    ).subscribe(event => {
      const breadcrumbArr: Breadcrumb[] = event.value.map(e => this.processRouteData(e))
      this._breadcrumbs$.next(breadcrumbArr.filter(e => e.label))
    })

    // first UrlSegment of ActivatedRoute of BehaviorSubject
    const firstRouteArr: UrlSegment[] = this.processRouteHierarchy(this.activatedRoute).url.value
    const breadcrumbs: Breadcrumb[] = firstRouteArr.map(e => this.processRouteData(e))
    this._breadcrumbs$.next(breadcrumbs.filter(e => e.label))
  }

  private getLabel(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1)
  }

  private processRouteHierarchy(activatedRoute) {
    let rootRoute = activatedRoute
    while (rootRoute.firstChild) {
      rootRoute = rootRoute.firstChild
    }
    return rootRoute
  }

  private processRouteData(route) {
    const breadcrumbElem: Breadcrumb = {
      label: this.getLabel(route.path),
      url: route.path
    }
    return breadcrumbElem
  }
}