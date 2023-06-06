import {
  onionImage,
  vegetarianImage,
  cheeseImage,
  addImage,
  ketchupImage,
} from './Images';
import { IngredientInterface } from './RestaurantBottomSheet';
import { BurgerInterface } from './restaurantConstants';

export const ingredients: IngredientInterface[] = [
  {
    name: 'Onion',
    image: onionImage,
    types: [
      { name: 'Gssauda', price: 0.5 },
      { name: 'Germantas', price: 0.15 },
      { name: 'Illertaler', price: 0.45 },
      { name: 'Comte', price: 0.26 },
    ],
  },
  {
    name: 'Vegetarians',

    image: vegetarianImage,
    types: [
      { name: 'Gsauda', price: 0.5 },
      { name: 'Germantas', price: 0.15 },
      { name: 'Illertaler', price: 0.45 },
      { name: 'Comte', price: 0.26 },
    ],
  },
  {
    name: 'Cheese',
    image: cheeseImage,
    types: [
      { name: 'Gauda', price: 0.5 },
      { name: 'Germantas', price: 0.15 },
      { name: 'Illertaler', price: 0.45 },
      // { name: 'Comte', price: 0.26 },
    ],
  },
  {
    name: 'Ketchup',

    image: ketchupImage,
    types: [
      { name: 'Gaudsa', price: 0.5 },
      { name: 'Germantas', price: 0.15 },
      { name: 'Illertaler', price: 0.45 },
      { name: 'Comte', price: 0.26 },
    ],
  },
  {
    name: 'Add',
    image: addImage,
    types: [
      { name: 'Gsauda', price: 0.5 },
      { name: 'Germantas', price: 0.15 },
      { name: 'Illertaler', price: 0.45 },
      { name: 'Comte', price: 0.26 },
    ],
  },
];

export const specialOffersList: BurgerInterface[] = [
  {
    id: '1',
    name: 'Cheese Burger',
    price: 3.15,
    image:
      'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',

    weight: 325,
  },
  {
    id: '2',
    name: 'BBQ Burger',
    price: 3.15,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
    weight: 325,
  },
  {
    id: '3',
    name: 'Hot Burger ',
    price: 4.6,
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    weight: 325,
  },
  // {
  //   id: '4',
  //   name: 'Cheese Burger',
  //   price: 3.15,
  //   image:
  //     'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',

  //   weight: 325,
  // },
];
