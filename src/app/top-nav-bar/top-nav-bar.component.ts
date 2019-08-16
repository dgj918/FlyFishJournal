import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavBarShowService } from '../services/nav-bar-show.service';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  showNavBar: boolean

  constructor(private authService: AuthService, private narBarVisService: NavBarShowService) { }

  ngOnInit() {
    this.showNavBar = false
    this.narBarVisService.visStatus$.subscribe( val =>{
      this.showNavBar = val
    })
  }

}
