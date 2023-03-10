
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule}from '@angular/material/grid-list'

// Material file 

@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        MatTableModule, 
        MatListModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatGridListModule,
    ]
})
export class material_module {


}