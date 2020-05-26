import { Component, OnInit } from '@angular/core';
import { NavBarShowService } from '../services/nav-bar-show.service';
import { Observable } from 'rxjs';
import { SaveTripPlanService } from '../services/save-trip-plan.service';
import { map } from 'rxjs/operators';

export interface returnedTripData {
  id: string,
  data: tripData
}

export interface fishMap{
  species: string,
  number: number
}

export interface tripData {
  date: string,
  start: string,
  end: string,
  startloc: string,
  endloc: string,
  Fish: fishMap[]
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  tripDataArr: tripData[]

  constructor(private navBarShowService: NavBarShowService,
    private tripDataService: SaveTripPlanService) {
    this.tripDataArr = []
  }

  ngOnInit() {
    this.navBarShowService.show()
    this.getTrips()

  }

  getTrips(): void {
    let _tripData = this.tripDataService.getTrips().pipe(
      map(tripDetailsObj => {
        return tripDetailsObj.map(tripDetails =>{
          return {
            'data': tripDetails.payload.doc.data(),
            'id': tripDetails.payload.doc.id
        }
      })}))

    _tripData.subscribe((data) => {
      data.map((data) => {
        console.log(data)
        this.tripDataArr.push(
          {
            'date': data['id'],
            'start': data['data']['startTime'],
            'end': data['data']['endTime'],
            'startloc': data['data']['putInLocation'],
            'endloc': data['data']['takeOutLocation'],
            'Fish': data['data']['Fish']
          }
        )
      })
    })

    console.log(this.tripDataArr)
  }

}
