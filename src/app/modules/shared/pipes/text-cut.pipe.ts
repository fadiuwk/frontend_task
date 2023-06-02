import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'textCut',
})
export class TextCutPipe implements PipeTransform {
  transform(text: string, maxLength: number) {
    if (text.length > maxLength) text = text.slice(0, maxLength) + ' ...';
    return text;
  }
}
