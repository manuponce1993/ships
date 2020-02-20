import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './base-layout.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
   declarations: [BaseLayoutComponent, SideNavComponent],
   imports: [CommonModule, BaseLayoutRoutingModule, MaterialModule],
})
export class BaseLayoutModule {}
