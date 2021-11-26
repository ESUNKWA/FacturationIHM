import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './homepage-routing.module';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { HomepageComponent } from './homepage.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ],
  declarations: [HomepageComponent],
  providers: [DecimalPipe],
})
export class HomeModue{}
