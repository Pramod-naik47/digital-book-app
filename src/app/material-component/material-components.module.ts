import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
    declarations: [],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
  })
  export class MaterialComponentsModule {}