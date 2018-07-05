
import {ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle} from '@angular/router';



export class CustomRouteReuseStrategy extends RouteReuseStrategy { 
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null !; }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      debugger;
    //let name = future.component && (<any>future.component).name;
    return future.routeConfig === curr.routeConfig ; 
  }
} 
