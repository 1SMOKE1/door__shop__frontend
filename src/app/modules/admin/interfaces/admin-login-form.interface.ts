import { FormControl } from "@angular/forms";

export interface IAdminLoginForm{
  email: FormControl<string | null>,
  password: FormControl<string | null>
}