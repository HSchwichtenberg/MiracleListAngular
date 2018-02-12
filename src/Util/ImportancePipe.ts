import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'importance', pure: true})
export class ImportancePipe implements PipeTransform {
  transform(value: number, kurz: boolean = true): string {
   var text = "";
   if (!kurz) text = "Importance: "
   switch(value)
   {
   case 0: return text+"A"
   case 1: return text+"B"
   default: return text+"C"
   }
  }
}