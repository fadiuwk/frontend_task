import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @ViewChild('pp') ngPaginator!: Paginator;

  @Input() limit = 10;
  @Input() total = 0;
  @Input() selectOptions = [5,10,20,30,50]

  @Output() pageIndexChange = new EventEmitter();
  
  page = 1;
  displayedOptions:{key:string,value:number}[] = []

  constructor() { }

  ngOnInit(): void {
    this.selectOptions.forEach(o => {
      this.displayedOptions.push({key:o+' rows', value:o})
    })
  }

  selectedOptions(e:any){
    
    this.limit = e.value
    this.page = 1
    this.resetPP()
  }

  onPageChange(e:any){
        this.page = e.page
    const res:SimplePagination = {page:this.page, limit:this.limit}
    this.pageIndexChange.emit(res)
  }

  resetPP(){
    this.ngPaginator.changePage(0);
  }
}

interface SimplePagination {
  page:number,
  limit:number
}
