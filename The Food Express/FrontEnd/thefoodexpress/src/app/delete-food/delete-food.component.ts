import { Component } from '@angular/core';
import { RestaurantService } from '../service/restaurant-service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-food',
  templateUrl: './delete-food.component.html',
  styleUrls: ['./delete-food.component.css']
})
export class DeleteFoodComponent {
  restaurantId: string = '';
  itemId: number = 0;

  constructor(private foodService: RestaurantService ,private router:Router) {}

  deleteFoodItem() {
    this.foodService.deleteFoodItem(this.restaurantId, this.itemId).subscribe(
      (response) => {
        console.log('Food item deleted successfully');
        this.router.navigateByUrl("/admin");
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error deleting food item', error);
        // Handle error, e.g., show an error message
      }
    );

}

}