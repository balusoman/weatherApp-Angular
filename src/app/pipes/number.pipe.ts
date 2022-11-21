import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberpipe'
})
export class NumberPipe implements PipeTransform {

  transform(value: any) { 
     
    let valueArray =  value.split(":",2) 
    let hour = valueArray[0]
    let minute = valueArray[1] 
    let data=  `${hour}:${minute}`  
    return data
    
}

}
