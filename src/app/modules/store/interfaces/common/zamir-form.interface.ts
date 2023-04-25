import { FormControl } from "@angular/forms";

export interface IZamirForm{
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
  address: FormControl<string | null>;
}