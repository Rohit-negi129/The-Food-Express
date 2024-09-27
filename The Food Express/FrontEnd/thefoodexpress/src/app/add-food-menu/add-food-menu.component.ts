import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant-service/restaurant.service';
import { Router } from '@angular/router';
import { foodMenu } from '../model/foodMenu';
import { AlertServiceService } from '../service/alert-service.service';

@Component({
  selector: 'app-add-food-menu',
  templateUrl: './add-food-menu.component.html',
  styleUrls: ['./add-food-menu.component.css']
})
export class AddFoodMenuComponent {
  
  foodMenu: foodMenu = {
    itemName: '',
    itemId: 0,
    price: 0,
    foodImage: '',
    description: '',
  };
  foodMenuForm:FormGroup=new FormGroup({
    restaurantId:new FormControl('',[Validators.required]),
    itemName:new FormControl('',[Validators.required]),
    itemId:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    foodImage:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]) 
   })
   get restaurantId(){return this.foodMenuForm.get("restaurantId")}
   get itemName(){return this.foodMenuForm.get("itemName")}
   get itemId(){return this.foodMenuForm.get("itemId")}
   get price(){return this.foodMenuForm.get("price")}
   get foodImage(){return this.foodMenuForm.get("foodImage")}
   get description(){return this.foodMenuForm.get("description")}

   constructor(private restaurantService: RestaurantService , private router:Router, private alertService:AlertServiceService) {}

   submit(){
    if (this.foodMenuForm.valid) {
      const data = this.foodMenuForm.value;
      console.log(data);
    this.restaurantService.getRestaurant(data.restaurantId).subscribe(
      res=>{
        console.log(res);
        const newFoodMenu: foodMenu = {
          itemName: data.itemName,
          itemId: data.itemId,
          price: data.price,
          foodImage: data.foodImage,
          description: data.description,
        };
        console.log(newFoodMenu);

        // this.foodMenu = { ...this.foodMenu, ...data };
         this.restaurantService.addFoodItem(data.restaurantId,newFoodMenu).subscribe(
          (response)=>{
            console.log('Food item added successfully:', response)
            this.alertService.openSnackBar('Food item added successfully'); 
            this.router.navigateByUrl("/admin")
          }
         )
        
      }
    )
  }

}
}