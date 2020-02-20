import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './pages/ships/ships.component';
import { LoginRoutingModule } from './ships-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from 'src/app/shared/components/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { UtilsModule } from 'src/app/shared/components/utils/utils.module';

@NgModule({
   declarations: [ShipsComponent, CardLoginComponent],
   imports: [
      CommonModule,
      LoginRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      DirectivesModule,
      UtilsModule,
   ],
})
export class ShipsModule {}
