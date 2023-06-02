import { NgModule } from "@angular/core";
import { EmployeeSearchPipe } from "./pipes/employee-search.pipe";
import { TextCutPipe } from "./pipes/text-cut.pipe";
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginatorModule } from "primeng/paginator";
import { DropdownModule } from "primeng/dropdown";


const declarationsList: any = [
    // HeaderComponent,
    TextCutPipe,
    EmployeeSearchPipe,
    // SpinnerComponent,
    // PaginatoinComponent
];

@NgModule({
    declarations: [
        ...declarationsList,
        PaginationComponent, 
    ],
    imports: [
        PaginatorModule,
        DropdownModule
    ],
    exports: [
        ...declarationsList,
        PaginatorModule,
        DropdownModule,
        PaginationComponent
    ],
})
export class SharedModule { }