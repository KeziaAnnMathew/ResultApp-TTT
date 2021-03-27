import { Component } from '@angular/core';
import { ResultsService } from './results.service';

export interface result{
  rollnum:number;
  status:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resultArray:result[]=[];

  title = 'TTT';
  //assigning a variable to get the search parameter
  searchvalue:any;
  rollnumlist=[];
  i=0;;
  regex=/^\d+(,\d+)*$/;
  loading:Boolean=false;
  output:Boolean=false;
  err:Boolean=false;
  constructor(private results:ResultsService){}
  //the function which calls and pass value to the service
  getResults(){
    if(!this.searchvalue.match(this.regex)){
      this.searchvalue='';
      this.output=false;
      this.loading=false;
      alert('Invalid input')
    }
    else{
      this.loading=true;
      this.output=false;
      this.rollnumlist=this.searchvalue.split(',');
      this.results.getResultsService(this.rollnumlist)
      .subscribe((val:any)=>{
        if(val.error){
          this.err=true
        }
        else{
          this.loading=false;
          this.output=true;
          for(this.i=0;this.i<val.table.length;this.i++){
            this.resultArray.push({rollnum:val.list[this.i],status:val.table[this.i]})
          }
        }
       
      });
      this.searchvalue='';
      this.resultArray=[];
    }
   
  }
}
