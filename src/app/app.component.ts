import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  minutes: number = 0;
  seconds: number = 15;
  counter = { min: this.minutes, sec: this.seconds };
  intervalId;
  isPaused = true;
  isReset = true;
  startButtonText = "Start";

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      }
      else this.counter.sec -= 1;
      console.log(`${this.counter.min}:${this.counter.sec}`);
      if (this.counter.min === 0 && this.counter.sec == 0) {
        clearInterval(this.intervalId);
        this.counter = { min: this.minutes, sec: this.seconds };
      }
    }, 1000)
  }

  startClicked() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      clearInterval(this.intervalId);
      this.startButtonText = "Start";
    } else {
      this.startTimer();
      this.startButtonText = "Pause";
      this.isReset = false;
    }
  }

  resetClicked() {
    clearInterval(this.intervalId);
    this.counter = { min: this.minutes, sec: this.seconds };
    this.isPaused = true;
    this.isReset = true;
  }
}
