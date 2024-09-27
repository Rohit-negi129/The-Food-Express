import { Component } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../service/restaurant-service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-restaurant',
  templateUrl: './check-restaurant.component.html',
  styleUrls: ['./check-restaurant.component.css']
})
export class CheckRestaurantComponent {

  restaurant: Restaurant = {
    foodMenu: [],
  };

  check:FormGroup=new FormGroup({
    restaurantId:new FormControl('',[Validators.required]),
    
   })
   get restaurantId(){return this.check.get("restaurantId")}

   constructor(private restaurantService: RestaurantService , private router:Router) {}

   submit(){
    const data=this.check.value;
    console.log(data);
    this.restaurantService.getRestaurant(data.restaurantId).subscribe(
      (res : Restaurant)=>{
        console.log(res);
        if (res) {
          this.router.navigateByUrl("/add-foodMenu");
        } else {
          alert("Restaurant with this Id is not existing")
        //  this.router.navigateByUrl("/page-not-found");
      }
    }
    )
   }

}
