import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
// Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
   return player;
}

@NgModule({
   declarations: [SpinnerComponent],
   imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
   exports: [SpinnerComponent],
})
export class UtilsModule {}
