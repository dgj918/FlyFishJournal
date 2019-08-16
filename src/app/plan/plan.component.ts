import { Component, OnInit } from '@angular/core';
import { NavBarShowService } from '../services/nav-bar-show.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private navBarShowService: NavBarShowService) {
    this.navBarShowService.show()
  }

  ngOnInit() {
  }

}
