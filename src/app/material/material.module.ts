import { NgModule } from '@angular/core';
import {
   MatButtonModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatNativeDateModule,
   MatSelectModule,
   MatTabsModule,
   MatDatepickerModule,
   MatCardModule,
   MatToolbarModule,
   MatSidenavModule,
   MatMenuModule,
   MatListModule,
   MatTableModule,
   MatTooltipModule,
   MatBottomSheetModule,
   MatExpansionModule,
   MatBadgeModule,
   MatSortModule,
   MatDividerModule,
   MatRadioModule,
   MatCheckboxModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const material = [
   MatButtonModule,
   MatCardModule,
   MatNativeDateModule,
   MatTabsModule,
   MatSelectModule,
   MatDividerModule,
   MatInputModule,
   MatIconModule,
   MatFormFieldModule,
   ReactiveFormsModule,
   MatDatepickerModule,
   MatToolbarModule,
   MatSidenavModule,
   MatRadioModule,
   MatCheckboxModule,
   MatMenuModule,
   MatListModule,
   MatTableModule,
   MatTooltipModule,
   MatBottomSheetModule,
   MatExpansionModule,
   MatBadgeModule,
   MatSortModule,
];

const flexLayout = [FlexLayoutModule];

@NgModule({
   imports: [material, flexLayout],
   exports: [material, flexLayout],
})
export class MaterialModule {}
