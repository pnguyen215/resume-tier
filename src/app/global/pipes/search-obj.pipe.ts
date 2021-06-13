import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchObj',
  pure: false
})
export class SearchObjPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      const matches = Object.keys(filter).every(f => {
        return filter[f] === 'All' || filter[f] === 'all' || filter[f] === '' || filter[f] === undefined || item[f] === filter[f];
      });

      return matches;
    })
  }

}
