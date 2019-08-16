import { Component, OnInit } from '@angular/core';
import { faCoffee, faChartBar, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { NavBarShowService } from '../services/nav-bar-show.service';

@Component({
  selector: 'bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent implements OnInit {
  public faCoffee = faCoffee;
  public faChartBar = faChartBar;
  public faMapMarkedAlt = faMapMarkedAlt;
  public showNavBar: string;

  constructor(private navBarVisService: NavBarShowService) { }

  ngOnInit() {
    this.navBarVisService.visStatus$.subscribe( val =>{
      this.showNavBar = val
    })
  }

}
