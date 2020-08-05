import React, { Component } from 'react';
import RecipesContent from './RecipesContent';
import Button from './Button';

class DetailsPage extends Component {
  render() {
    return 
      <div>
        <RecipesContent data={data} />
        <Details />
        <Button id={data.id} />
      </div>
  }
}

export default DetailsPage;
