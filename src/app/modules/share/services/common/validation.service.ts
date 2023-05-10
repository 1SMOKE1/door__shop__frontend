import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public phonePattern(): RegExp {
    return /^(?:\+38)?(?:\(\d{3}\)[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}|\d{3}[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}|\d{3}\d{7})$/;
  }
  
  public emailPattern(): RegExp{
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  }

  public passwordPattern(): RegExp{
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}/;
  }

  public positiveNumberPattern(): RegExp{
    return /^[+]?\d+([.]\d+)?$/;
  }
}
