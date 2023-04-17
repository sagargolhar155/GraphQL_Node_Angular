import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';


import gql from 'graphql-tag';

const GET_RECIPES = gql`
query Customer($id: ID!) {
  customer(ID: $id) {
    products {
      name
      price
      quantity
      description
    }
  }
}
`;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_RECIPES, variables: {
          "id": "64393ab588693d0e2b36058e"
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result.data.customer.products[0];
      });
  }

}
