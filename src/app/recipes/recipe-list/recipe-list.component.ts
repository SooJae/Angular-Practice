import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://p0.pikrepo.com/preview/101/421/grilled-pork-belly-with-green-salad.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
