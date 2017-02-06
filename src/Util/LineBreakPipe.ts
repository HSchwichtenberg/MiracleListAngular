import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'br', pure: true})
export class LineBreakPipe implements PipeTransform {
  transform(s: string): string {

  return s.replace(/\n/g , "<br>");
  }
}