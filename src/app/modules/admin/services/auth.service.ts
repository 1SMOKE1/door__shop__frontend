import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
  ){}


  public signIn(form: Partial<{email: string | null; password: string | null}>): Promise<Response>{
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

  public logout(): Observable<string>{
    const url: string = `${this.baseUrl}/auth/logout`;

    return this.http.get<string>(url);
  }

  public updateAccessToken(): Promise<{access_token: string} | undefined>{
    const url: string = `${this.baseUrl}/auth/update-access`;

    return this.http.put<{access_token: string}>(url, {refreshToken: localStorage.getItem('refresh_token')}).toPromise()
  }


 
}
