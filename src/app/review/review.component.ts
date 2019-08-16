import { Component, OnInit } from '@angular/core';
import { NavBarShowService } from '../services/nav-bar-show.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private navBarShowService: NavBarShowService) {
    this.navBarShowService.show()
  }

  ngOnInit() {
  }

}
