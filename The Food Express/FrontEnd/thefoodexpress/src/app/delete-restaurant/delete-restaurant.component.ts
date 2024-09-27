import { Component } from '@angular/core';
import { RestaurantService } from '../service/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-restaurant',
  templateUrl:'./delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.css']
})
export class DeleteRestaurantComponent {

check:FormGroup=new FormGroup({
  restaurantId:new FormControl('',[Validators.required]),
  
 })
 get restaurantId(){return this.check.get("restaurantId")}

  constructor(private restaurantService: RestaurantService, private router:Router) {}

  deleteRestaurant() {
    const data=this.check.value;
    console.log(data);
    
    this.restaurantService.deleteRestaurant(data.restaurantId).subscribe(
      (response) => {
        console.log('Restaurant deleted successfully');
        this.router.navigateByUrl("/admin")
      }
    );
  }
}
