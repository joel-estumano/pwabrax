import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public forgot = false;
  public pages = ['Login', 'Register'];
  public current_page = this.pages[0];

  ngOnInit() {
    this.autoplayVideo();
  }

  autoplayVideo() {
    const videoElement: HTMLVideoElement | null =
      document.querySelector('.video');

    if (videoElement) {
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.play();
    }
  }

  async login() {
    this.current_page = this.pages[0];

    if (this.forgot) {
      this.forgot = false;
    }
  }

  async register() {
    this.current_page = this.pages[1];
  }

  goToForgot(bool: boolean) {
    this.forgot = bool;
  }
}
