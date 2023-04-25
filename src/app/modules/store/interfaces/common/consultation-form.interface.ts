import { FormControl } from "@angular/forms";

export interface IConsultationForm{
  name: FormControl<string | null>
  phone: FormControl<string | null>
}