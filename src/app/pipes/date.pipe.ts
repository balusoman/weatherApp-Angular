import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'datepipe'
})
export class DatePipe implements PipeTransform{
    transform(value: any) { 
        let dateString = new Date(value * 1000).getDate(); 
        let month = new Date(value * 1000).toLocaleString('default', { month: 'long' });

        let date:any =`${month} ${dateString}`

        return date
        
    }
}
