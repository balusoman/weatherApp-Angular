import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberpipe'
})
export class NumberPipe implements PipeTransform {

  transform(value: any) { 
     
    let valueArray =  value.split(":",2) 
    // console.log(valueArray)
    let hour = valueArray[0]
    let minute = valueArray[1] 
     
    // console.log(typeof(hour))
    let data=  `${hour}:${minute} am`  

    if(hour > 12){
      let hour = parseInt(valueArray[0]) 
    let minute = parseInt(valueArray[1]) 
      hour = hour -12 

      if(hour < 10 || minute < 10){ 
        if(hour < 10 && minute >= 10 ){
          return data =  `0${hour}:${minute} pm`
        }
        else if(minute < 10 && hour >= 10){
          return data =  `${hour}:0${minute} pm`
        }
        else{
          return data =  `0${hour}:0${minute} pm`
        }
      } 

      return data=  `${hour}:${minute} pm`  
    }
       
    return data
    
}

}
