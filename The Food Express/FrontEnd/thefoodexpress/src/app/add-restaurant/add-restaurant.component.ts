import { Component } from '@angular/core';
import { RestaurantService } from '../service/restaurant-service/restaurant.service';
import { foodMenu } from '../model/foodMenu';
import { Restaurant } from '../model/restaurant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenInterceptorService } from '../service/token-interceptor-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  restaurant: Restaurant = {
    foodMenu: [],
  };
  registration:FormGroup=new FormGroup({
    restaurantId:new FormControl('',[Validators.required]),
    restaurantName:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    restaurantImage:new FormControl('',[Validators.required]),
    location:new FormControl('',[Validators.required]) 
   })
   get restaurantId(){return this.registration.get("restaurantId")}
   get restaurantName(){return this.registration.get("restaurantName")}
   get description(){return this.registration.get("description")}
   get restaurantImage(){return this.registration.get("restaurantImage")}
   get location(){return this.registration.get("location")}


  // Inject the restaurant service
  constructor(private restaurantService: RestaurantService , private router:Router) {}

    submit(){
      const data=this.registration.value;
      console.log(data);
      this.restaurantService.addRestaurant(data).subscribe(
        res=>{
          console.log(res);
          this.router.navigateByUrl("/add-foodMenu")
        }
      )
    }







  // Method to handle form submission
  // addRestaurant() {
  //   // Call your restaurant service to add the restaurant
  //   this.restaurantService.addRestaurant(this.restaurant).subscribe(
  //     (response) => {
  //       console.log('Restaurant added successfully:', response);
  //       // Optionally, you can navigate to another page or perform other actions after success
  //     },
  //     (error) => {
  //       console.error('Error adding restaurant:', error);
  //       // Handle the error as needed
  //     }
  //   );
  //}

}
