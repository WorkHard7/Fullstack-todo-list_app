import {Component, OnInit} from '@angular/core';
import {ParticlesConfig} from "../../particles-config";
declare var particlesJS: any;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  ngOnInit() {
    particlesJS('particles-js', ParticlesConfig);
  }
}
