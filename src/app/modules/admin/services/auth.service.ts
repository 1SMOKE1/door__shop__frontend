import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HandleFormsErrorService } from '../../share/services/errors/handle-forms-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly handleFormsErrorService: HandleFormsErrorService
  ){}

  signIn(form: Partial<{email: string | null; password: string | null}>): Promise<Response>{
    const url: string = `${this.baseUrl}/auth/sign-in`;

    return fetch(url, {
      method: 'POST',
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

  }

  logout(): Observable<string>{
    const url: string = `${this.baseUrl}/auth/logout`;

    return this.http.get<string>(url);
  }
}
