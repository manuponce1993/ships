import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './pages/news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
   declarations: [NewsComponent],
   imports: [CommonModule, NewsRoutingModule, MaterialModule],
})
export class NewsModule {}
