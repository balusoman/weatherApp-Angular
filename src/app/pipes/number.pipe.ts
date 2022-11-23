import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberpipe'
})
export class NumberPipe implements PipeTransform {

  transform(value: any) { 
     
    let valueArray =  value.split(":",2) 
    let hour = parseInt(valueArray[0]) 
    let minute = parseInt(valueArray[1])  
    console.log(typeof(hour))
    let data=  `${hour}:${minute} am`  
    if(hour > 12){
      hour = hour -12
      return data=  `${hour}:${minute} pm`  
    }
       
    return data
    
}

}
