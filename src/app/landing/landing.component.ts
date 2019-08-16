import { Component, OnInit } from '@angular/core';
import { NavBarShowService } from '../services/nav-bar-show.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private navBarShowService: NavBarShowService) { }

  ngOnInit() {
    this.navBarShowService.hide()
  }

}
