import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminSidebarService {

  sidebarSubject: Subject<any> = new Subject();
  sidebar$: Observable<any> = this.sidebarSubject.asObservable();


}
