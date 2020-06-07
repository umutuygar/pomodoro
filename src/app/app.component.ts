import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  minutes: number = 0;
  seconds: number = 5;
  intervalId;
  isPaused = true;
  isReset = true;
  
  sessionCounters = [
    { min: this.minutes, sec: this.seconds },
    { min: 0, sec: 3 },
    { min: this.minutes, sec: this.seconds },
    { min: 0, sec: 3 },
    { min: this.minutes, sec: this.seconds },
    { min: 0, sec: 3 },
    { min: this.minutes, sec: this.seconds },
  ];
  session: number = 0;
  counter = this.sessionCounters[this.session];

  playStart() {
    let audio = new Audio();
    audio.src = "../assets/audio/start.wav";
    audio.load();
    audio.play();
  }

  playEnd() {
    let audio = new Audio();
    audio.src = "../assets/audio/buzzer.wav";
    audio.load();
    audio.play();
  }
  
  startTimer() {
    if (this.counter == this.sessionCounters[0]) this.playStart();
    this.intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      }
      else this.counter.sec -= 1;
      console.log(`${this.counter.min}:${this.counter.sec}`);
      if (this.counter.min === 0 && this.counter.sec == 0) {
        if (this.session==6) {
          this.resetClicked();
        } else {
          this.playEnd();
          this.session += 1;
          this.counter = this.sessionCounters[this.session];
        }
      }
    }, 1000)
  }

  startClicked() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      clearInterval(this.intervalId);
    } else {
      this.startTimer();
      this.isReset = false;
    }
  }

  resetClicked() {
    clearInterval(this.intervalId);
    this.session = 0;
    this.sessionCounters = [
      { min: this.minutes, sec: this.seconds },
      { min: 0, sec: 3 },
      { min: this.minutes, sec: this.seconds },
      { min: 0, sec: 3 },
      { min: this.minutes, sec: this.seconds },
      { min: 0, sec: 3 },
      { min: this.minutes, sec: this.seconds },
    ];
    this.counter = this.sessionCounters[this.session];
    this.isPaused = true;
    this.isReset = true;
  }
}
