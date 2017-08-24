import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    
      this.state = {
        newRecipe: [ 
          {
            title: '',
            ingredients: undefined,
            method: undefined
          } 
        ]
      }
  }

  
  render() {
    
        return (
    <div>
      <button type="button" className="btn btn-primary" data-toggle="modal" href="#exampleModalLong">
        Add a Recipe
      </button>

      <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add a Recipe</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1">Recipe</label>
                  <input type="title" className="form-control" id="titleInput" aria-describedby="title" 
                    onChange={(event) => {this.state.newRecipe[0].title = event.target.value
                    this.setState(this.state);
                      }}/>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Ingredients</label>
                  <textarea className="form-control" id="exampleTextarea" rows="3" 
                    onChange={(event) => {this.state.newRecipe[0].ingredients = event.target.value
                                         this.setState(this.state);
                                         }}></textarea>
                  <small id="ingredientsHelp" class="form-text text-muted">Enter ingredients separated by a '+'</small>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Method</label>
                  <textarea className="form-control" id="exampleTextarea" rows="3" 
                    onChange={(event) => {this.state.newRecipe[0].method = event.target.value
                                         this.setState(this.state)}}></textarea>
                  <small id="methodHelp" class="form-text text-muted">Enter method steps separated by a '+'</small>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.addRecipe(this.state.newRecipe)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
        )
    }
  } // END MODAL

class RecipeList extends React.Component{  
  render(){
  let listItem = this.props.recipes.map( (item, index) => {
    return (
    <div>
      <RecipeListItem 
        title={item.title}
        ingredients={item.ingredients}
        method={item.method}
        index={index}
        deleteItem={() => this.props.deleteItem(index)}
      />
      <ModalListItem 
        title={item.title}
        ingredients={item.ingredients}
        method={item.method}
        changeState={this.props.changeState}
        index={index}
        />
    </div>
    )
  })
  return (
    <div className="accordion" role="tablist" aria-multiselectable='true'>
      {listItem}
    </div>
  )
  }
} // END Recipe List 

const RecipeListItem = (props) => {
  console.log(props)
  const IngredientListItem = ({ingredient}) => {
  return (
      <li className="list-group-item recipeText">{ingredient}</li>
  )  
} // END IngredientListItem

  
  const ingredientList = props.ingredients.split('+').map( item => {
    return (
      <IngredientListItem
        ingredient={item}
      />
    )
  })
  
  const methodList = props.method.split('+').map( (item, index) => {
    return ( 
      <li className = "list-group-item recipeText">{item}</li>
    )
  })
  
  return (
    <div>
     <div className="card">
        <div className="card-header d-flex justify-content-between p-2 align-items-center" role="tab" id={'heading' + props.index}>
          <h5 className="mb-0">
            <a data-toggle="collapse" href= {'#collapse' + props.index} data-parent="#accordion" aria-expanded="true" aria-controls={'collapse' + props.index}>
              {props.title}
            </a>
            
          </h5>
          <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-outline-info p-2" data-toggle="modal" href={'#editModal' + props.index}>Edit</button>
          <button type="button" className="btn btn-outline-danger p-2" onClick={() => props.deleteItem()}>Delete</button>
          </div>
        </div>   
        <div id={'collapse' + props.index} className="collapse" role="tabpanel" aria-labelledby={'heading' + props.index}>
          <div className="card-block">
            <h4 className ="text-center ingredientHeader">Ingredients</h4>
              <ul className="list-group">
                {ingredientList}
              </ul>
            <h4 className ="text-center methodHeader">Method</h4>
            <ul className ="list-group">              
                {methodList}
            </ul>
            <div className = "buttons d-flex justify-content-start">
              <button type="button" className="btn btn-outline-info p-2" data-toggle="modal" href={'#editModal' + props.index}>Edit</button>
          <button type="button" className="btn btn-outline-danger p-2" onClick={() => props.deleteItem()}>Delete</button>
            </div>
            </div>
        </div>
    </div>
    
  </div>
  );
} // END Recipe List Item

class ModalListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: this.props.ingredients,
      method: this.props.method,
      title: this.props.title,
      index: this.props.index
    }
    
  }
  
  render() {
    
    return (
      <div>
      <div className="modal fade" id={'editModal' + this.props.index} tabindex="-1" role="dialog" aria-labelledby={'editModal' + this.props.index} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={'editModal' + this.props.index}>Edit Recipe</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1">Recipe</label>
                <input type="title" className="form-control" id="titleInput" aria-describedby="title" value={this.state.title}
                   onChange={event => this.setState({title: event.target.value})} />
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Ingredients</label>
                  <textarea className="form-control" id="exampleTextarea" rows="3" value={this.state.ingredients}
                    onChange={(event) => this.setState({ingredients: event.target.value})}></textarea>
                  <small id="ingredientsHelp" className="form-text text-muted">Enter ingredients separated by a '+'</small>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Method</label>
                  <textarea className="form-control" id="exampleTextarea" rows="3" value={this.state.method}
                    onChange={(event) => this.setState({method: event.target.value})}></textarea>
                  <small id="methodHelp" class="form-text text-muted">Enter method steps separated by a '+'</small>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.changeState(this.state)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
  }
}


  class App extends React.Component {
  constructor(props){
    super(props)   
     this.state = {
        recipes: [{title: "Colleen's Slow Cooker Jambalaya",
                  ingredients: "1 pound skinless, boneless chicken breast halves - cut into 1 inch cubes + 1 pound andouille sausage, sliced + 1 (28 ounce) can diced tomatoes with juice + 1 large onion, chopped + 1 large green bell pepper, chopped + 1 cup chopped celery + 1 cup chicken broth + 2 teaspoons dried oregano + 2 teaspoons dried parsley + 2 teaspoons Cajun seasoning + 1 teaspoon cayenne pepper + 1/2 teaspoon dried thyme + 1 pound frozen cooked shrimp without tails",
                   method: "In a slow cooker, mix the chicken, sausage, tomatoes with juice, onion, green bell pepper, celery, and broth. Season with oregano, parsley, Cajun seasoning, cayenne pepper, and thyme. + Cover, and cook 7 to 8 hours on Low, or 3 to 4 hours on High. Stir in the shrimp during the last 30 minutes of cook time."
                  },
                 {title: "Old Fashioned Pancakes",
                  ingredients: "1 1/2 cups all-purpose flour + 3 1/2 teaspoons baking powder + 1 teaspoon salt + 1 tablespoon white sugar + 1 1/4 cups milk + 1 egg + 3 tablespoons butter, melted",
                  method: "In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth. + Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."
                 },
                {title: "Huevos Rancheros",
                  ingredients: "1 Tbsp olive oil + 1/2 medium onion, chopped (about a half cup) + 1 15-ounce can whole or crushed  + tomatoes, preferably fire-roasted, (or 1 -2 large fresh vine-ripened tomatoes, when in season) + 1/2 6-ounce can diced green Anaheim chiles + Chipotle chili powder, adobo sauce, or ground cumin to taste (optional) + 4 corn tortillas + Butter + 4 fresh eggs + 2 Tbsp fresh cilantro, chopped (optional)",
                 method: "Make the sauce: Sauté the onions in a little olive oil in a large skillet on medium heat. Once the onions are translucent, add the tomatoes and their juices. If using whole canned tomatoes, break them up with your fingers or a spatula as you put them in the pan.If you are using fresh tomatoes, chop them first, then add. Note that fresh tomatoes will take longer to cook as canned tomatoes are already cooked to begin with. Add chopped green chilies. Add additional chili to taste, either chipotle chili powder, adobo sauce, regular chili powder, or even ground cumin. Bring to a simmer, reduce heat to low, and let simmer while you do the rest of the cooking, stirring occasionally. Reduce to warm after it has been simmering for 10 minutes. Add salt to taste if needed. + Warm the plates: Heat the oven to a warm 150°F, place serving plates in the oven to keep warm. + Prepare the tortillas: Heat a teaspoon of olive oil in a large non-stick skillet on medium high, coating the pan with the oil. One by one (or more if your pan is big enough) heat the tortillas in the pan, a minute or two on each side, until they are heated through, softened, and pockets of air bubble up inside of them.Then remove them and stack them on one of the warming plates in the oven to keep warm while you continue cooking the rest of the tortillas and the eggs. + Fry the eggs: Using the same skillet as was used for the tortillas, add a little butter to the pan, about two teaspoons for 4 eggs. Heat the pan on medium high heat. Crack 4 eggs into the skillet and cook for 3 to 4 minutes for runny yolks, more for firmer eggs. + Assemble and serve: To serve, spoon a little of the sauce onto a warmed plate. Top with a tortilla, then a fried egg. Top with more sauce, sprinkle with cilantro if desired. Serve either one or two eggs/tortillas per plate, depending on how much you want to eat. I'm a 2-egg 2 tortilla person myself."
                },
                  {title: "Enchiladas",
                  ingredients: "3 tablespoons vegetable oil + 1 1/2 pounds skinless boneless chicken breast + Salt and pepper + 2 teaspoons cumin powder + 2 teaspoons garlic powder + 1 teaspoon Mexican Spice Blend + 1 red onion, chopped + 2 cloves garlic, minced + 1 cup frozen corn, thawed + 5 canned whole green chiles, seeded and coarsely chopped + 4 canned chipotle chiles, seeded and minced + 1 (28-ounce) can stewed tomatoes + 1/2 teaspoon all-purpose flour + 16 corn tortillas + 1 1/2 cups enchilada sauce, canned + 1 cup shredded Cheddar and Jack cheeses + Garnish: chopped cilantro leaves, chopped scallions, sour cream, chopped tomatoes",
                 method: "Coat large saute pan with oil. Season chicken with salt and pepper. Brown chicken over medium heat, allow 7 minutes each side or until no longer pink. Sprinkle chicken with cumin, garlic powder and Mexican spices before turning. Remove chicken to a platter, allow to cool. + Saute onion and garlic in chicken drippings until tender. Add corn and chiles. Stir well to combine. Add canned tomatoes, saute 1 minute. + Pull chicken breasts apart by hand into shredded strips. Add shredded chicken to saute pan, combine with vegetables. Dust the mixture with flour to help set. + Microwave tortillas on high for 30 seconds. This softens them and makes them more pliable. Coat the bottom of 2 (13 by 9-inch) pans with a ladle of enchilada sauce. Using a large shallow bowl, dip each tortilla in enchilada sauce to lightly coat. Spoon 1/4 cup chicken mixture in each tortilla. Fold over filling, place 8 enchiladas in each pan with seam side down. Top with remaining enchilada sauce and cheese. + Bake for 15 minutes in a preheated 350 degree F oven until cheese melts. Garnish with cilantro, scallion, sour cream and chopped tomatoes before serving. Serve with Spanish rice and beans."
                  }
              ]
      } //End this.state
    this.newRecipe = this.newRecipe.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getLocalStorage();
  } // END Constructor.props
    
    changeState(value) {      
      let index = value.index
      this.state.recipes[index] = value;
      this.setState(this.state) 
      localStorage.setItem('_recipeBook', JSON.stringify(this.state.recipes))
      // this.setState({recipes: value})
    }
    
    
    
  getLocalStorage() {
    let localStorageObj = localStorage.getItem('_recipeBook');
    if (localStorageObj != undefined) {
      this.state.recipes = JSON.parse(localStorageObj); 
      this.setState(this.state)
    }
  }
  
  newRecipe(recipe){
    this.state.recipes = this.state.recipes.concat(recipe)
    this.setState(this.state);
    localStorage.setItem('_recipeBook', JSON.stringify(this.state.recipes))
  }
    
  deleteItem(index){
    this.state.recipes.splice(index, 1)
    this.setState(this.state)
    localStorage.setItem('_recipeBook', JSON.stringify(this.state.recipes))
  }

  render() {
  const newRecipe = (recipe) => { this.newRecipe(recipe) }
  const deleteItem = (index) => { this.deleteItem(index) }
    return (
    <div className ="container">
        <h3 className ="center-align">Recipe Book</h3>
        <div className ="col s8">
          <RecipeList 
            recipes={this.state.recipes} 
            addRecipe={newRecipe}
            deleteItem={deleteItem}
            changeState={(value) => this.changeState(value)}
            />
          <Modal addRecipe={newRecipe}/>
        </div>
    </div>
    )
  };
} // END APP COMPONENT
  

export default App;
