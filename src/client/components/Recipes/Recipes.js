import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import Autosuggest from 'react-autosuggest';

import { formFieldsSchema, formValidationSchema } from './Recipes.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';

import './Recipes.scss';
import Button from '../elements/Button';

import recipesReducer from './Recipes.reducer';
import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

import { endpointRoots } from '../../helpers/endpointRoots';
import Tooltip from '../elements/Tooltip';
import { floatRegex } from '../../helpers/formValidationPatterns';
import AlertMessage from '../elements/AlertMessage';

export default function Recipes() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [isEditingForm, setIsEditingForm] = useState(false);

  const [recipeFormIngredientFields, setRecipeFormIngredientFields] = useState({
    current: {
      _id: '',
      name: '',
      qty: '',
      unit: ''
    },
    isAdded: []
  });
  
  const [recipesState, dispatch] = useReducer(recipesReducer, {
    ingredientList: [],
    recipeList: []
  });

  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [ingredientSuggestionValue, setIngredientSuggestionValue] = useState('');

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.all([
      axios.get(endpointRoots.recipe, authHeaders()),
      axios.get(endpointRoots.ingredient, authHeaders())
    ])
    .then(axios.spread((recipeRes, ingredientsRes) => {
      const recipeList = recipeRes.data.data || [];
      const ingredientList = ingredientsRes.data.data || [];
      dispatch({
        type: 'GET_RECIPE_LIST',
        payload: { recipeList, ingredientList }
      })
    })).catch(err => 
      console.log('Error fetching recipes', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  const submitCallback = (formData, isAddAsNew) => {
    const requestType = formData._id && ! isAddAsNew? 'edit': 'add';
    formData.ingredients = recipeFormIngredientFields.isAdded;
    if (!page.isLoading) page.setIsLoading(true);
    setIsSidebarRequestError(false);
    setIsRequestSuccess(false);
    axios.post(`${endpointRoots.recipe}${requestType}`, formData, authHeaders())
      .then(res => {
        if (requestType === 'edit') {
          dispatch({
            type: 'EDIT_RECIPE',
            payload: formData
          })
        }
        else {
          dispatch({
            type: 'ADD_RECIPE',
            payload: res.data.data.result
          })
        }
        setFormFields(formFieldsSchema)
        setRecipeFormIngredientFields({
          current: {
            _id: '',
            name: '',
            qty: '',
            unit: ''
          },
          isAdded: []
        })
        setIsEditingForm(false)
        setIsRequestSuccess(true)
      }).catch(err => 
        setIsSidebarRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  const handleToggleExpand = e => {
    const button = e.target.closest('button');
    if (button) button.classList.toggle('expanded')
  }

  const handleCollapseAll = () => {
    const accordionItems = document.querySelectorAll('.recipes__list__item__expand');
    for (let accordionItem of accordionItems) {
      accordionItem.classList.remove('expanded')
    }
  }

  const handleExpandAll = () => {
    const accordionItems = document.querySelectorAll('.recipes__list__item__expand');
    for (let accordionItem of accordionItems) {
      accordionItem.classList.add('expanded')
    }
  }

  const handleAddRecipeIngredient = () => {
    if (! recipeFormIngredientFields.current._id || ! recipeFormIngredientFields.current.qty) return;
    handleIngredientSuggestionChange(null, {newValue: ''}); // resets value
    setRecipeFormIngredientFields({
      isAdded: [
        ...recipeFormIngredientFields.isAdded,
        recipeFormIngredientFields.current
      ],
      current: {
        _id: '',
        name: '',
        qty: '',
        unit: ''
      }
    });
  }

  const handleDeleteRecipeIngredient = ingredient => {
    if (confirm("Are you sure you want to delete this ingredient?")) {
      setRecipeFormIngredientFields({
        ...recipeFormIngredientFields,
        isAdded: recipeFormIngredientFields.isAdded.filter(i => i._id !== ingredient._id)
      })
    }
  }

  const handleEditRecipe = recipe => {
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsSidebarRequestError(false);
    setIsEditingForm(true);
    const recipeIngredients = [];
    recipe.ingredients.map(ingredient => recipeIngredients.push({
        _id: ingredient._id,
        name: recipesState.ingredientList.find(ing => ing._id === ingredient._id).name,
        qty: ingredient.qty,
        unit: recipesState.ingredientList.find(ing => ing._id === ingredient._id).unit 
    }))
    setRecipeFormIngredientFields({
      current: {
        _id: '',
        name: '',
        qty: '',
        unit: ''
      },
      isAdded: recipeIngredients
    })
    setFormFields({
      _id: { value: recipe._id, error: '', isValid: true },
      name: { value: recipe.name, error: '', isValid: true },
      description: { value: recipe.description, error: '', isValid: true },
      instructions: { value: recipe.instructions, error: '', isValid: true },
    });
  }

  const handleDeleteRecipe = recipe => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      if (!page.isLoading) page.setIsLoading(true);
      setIsRequestSuccess(false);
      setIsRequestError(false);
      axios.post(`${endpointRoots.recipe}delete`, { _id: recipe._id }, authHeaders())
        .then(res => 
          setIsRequestSuccess(true),
          dispatch({
            type: 'DELETE_RECIPE',
            payload: recipe
          })
        ).catch(err => 
          setIsRequestError(true)
        ).finally(() =>
          page.setIsLoading(false)
        );
    }
  }

  const handleCancelEdit = () => {
    setFormFields(formFieldsSchema);
    setRecipeFormIngredientFields({
      current: {
        _id: '',
        name: '',
        qty: '',
        unit: ''
      },
      isAdded: []
    })
    setIsEditingForm(false);
    setIsSidebarRequestError(false);
  }

  // Recipe form - ingredients autocomplete
  const getIngredientSuggestions = value => {
    if (value) {
      const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (escapedValue === '') return [];
      const regex = new RegExp(escapedValue,'i');
      return recipesState.ingredientList.filter(ingredient => regex.test(ingredient.name) && ! recipeFormIngredientFields.isAdded.find(({ _id }) => _id === ingredient._id));
    }
  }

  const handleIngredientSuggestionChange = (e, { newValue }) => {
    if (recipeFormIngredientFields.current._id !== '') {
      setRecipeFormIngredientFields({
        ...recipeFormIngredientFields, 
        current: {
          ...recipeFormIngredientFields.current,
          _id: ''
        }
      })
    }
    setIngredientSuggestionValue(newValue)
  }

  const handleIngredientSuggestionBlur = () => {
    if (recipeFormIngredientFields.current._id === '') {
      setIngredientSuggestionValue('')
    }
  }

  const inputProps = {
    placeholder: 'Start typing ingredient',
    value: ingredientSuggestionValue,
    onChange: handleIngredientSuggestionChange,
    onBlur: handleIngredientSuggestionBlur
  }

  return (
    <section className="recipes">
      <h1>Recipes</h1>
      <div className="recipes__wrapper main-wrapper">
        <div className="recipes__main main-content">
        {! page.isLoading && <>
          { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          { isRequestSuccess && <AlertMessage type="success">Your recipes have been successfully updated!</AlertMessage>}
          { recipesState.recipeList.length > 0 ? <>
            <div className="recipes__list__controls">
              <Button
                handleClick={handleExpandAll}
              >
                Expand all
              </Button>
              <Button
                handleClick={handleCollapseAll}
              >
                Collapse all
              </Button>
            </div>
            <ul
              className="recipes__list list"
            >
              {recipesState.recipeList.map(recipe => (
                    <li
                      className="recipes__list__item list__item"
                      key={recipe._id}
                    >
                      <div className="recipes__list__item__inner list__item__inner">
                        <div className="recipes__list__item__content">
                          <Button
                            classes="recipes__list__item__expand"
                            handleClick={handleToggleExpand}
                          >
                            <span>
                              {recipe.name}
                              {recipe.description && <span className="recipes__list__item__description">{recipe.description}</span>}
                              <span className="vh">Expand recipe info</span>
                            </span>
                          </Button>
                          <div className="recipes__list__item__details">
                            { recipe.ingredients.length > 0 ?
                            <>
                              <strong>Ingredients</strong>
                              <ul>
                                {recipe.ingredients.map(ingredient =>
                                  <li
                                    key={ingredient._id}
                                  >
                                    {ingredient.qty} {recipesState.ingredientList.find(ing => ing._id === ingredient._id).unit} of {recipesState.ingredientList.find(ing => ing._id === ingredient._id).name}
                                  </li>
                                )}
                              </ul>
                            </>
                            :
                            <strong>No ingredients listed</strong>
                            }
                            { recipe.instructions && <>
                              <strong>Instructions</strong>
                              { recipe.instructions }
                            </>}
                            
                          </div>
                        </div>
                        <span className="recipes__list__item__buttons list__item__buttons">
                          <Button
                            classes="button--icon icon--edit"
                            handleClick={() => handleEditRecipe(recipe)}
                          >
                            <span className="vh">Edit</span>
                          </Button>
                          <Button
                            classes="button--icon icon--delete"
                            handleClick={() => handleDeleteRecipe(recipe)}
                          >
                            <span className="vh">Delete</span>
                          </Button>
                        </span>
                      </div>
                    </li>
                  ))}
            </ul>
            </>
            :
            <p>You haven't added any recipes yet.</p>
          }
        </>}
        </div>
        <SidebarForm classes={['recipes__side']}>
          <>
          <h2>{ isEditingForm ? "Edit" : "Add" } recipe</h2>
          <div className="form--error" aria-live="assertive">
            { isSidebarRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          </div>
          <Input
            label="Recipe name"
            name="name"
            value={formFields.name.value}
            handleChange={handleChange}
            errorMsg={formFields.name.error}
            isRequired={formValidationSchema.name.required}
          />
          <Input
            label="Recipe description"
            name="description"
            value={formFields.description.value}
            handleChange={handleChange}
            errorMsg={formFields.description.error}
            isRequired={formValidationSchema.description.required}
          />
          <Input
            label="Recipe instructions"
            name="instructions"
            value={formFields.instructions.value}
            handleChange={handleChange}
            errorMsg={formFields.instructions.error}
            isRequired={formValidationSchema.instructions.required}
          />

          <h3>Ingredients <Tooltip>Start typing the ingredient name and select the option from the dropdown. Quantity should be a number, with up to 3 decimal points. You can create recipes without ingredients, but they won't be added to your shopping lists.</Tooltip></h3>
          <div className="recipes__ingredient-form">
            <label>
              <span className="label--required">Name</span>
              <Autosuggest
                id="ingredients-autocomplete"
                suggestions={ingredientSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  setIngredientSuggestions(getIngredientSuggestions(value))
                }
                onSuggestionsClearRequested={() => 
                  setIngredientSuggestions([])
                }
                getSuggestionValue={ingredient => {
                  setRecipeFormIngredientFields({
                      ...recipeFormIngredientFields,
                      current: {
                        ...recipeFormIngredientFields.current,
                        ...ingredient
                      }
                    });
                    return ingredient.name
                }}
                renderSuggestion={ingredient =>
                    <span>{ ingredient.name } ({ ingredient.unit })</span>
                }
                inputProps={inputProps}
                highlightFirstSuggestion={true}
              />
            </label>
            <Input
              label="Qty"
              name="ingredientQty"
              handleChange={e => {
                let newQty = e.target.value.replace(/[^\d\.]/g,'');
                if (!newQty || floatRegex.test(newQty)) {
                  setRecipeFormIngredientFields({
                    ...recipeFormIngredientFields, 
                    current: {
                      ...recipeFormIngredientFields.current,
                      qty: newQty
                    }
                  })
                }
              }}
              value={recipeFormIngredientFields.current.qty}
              isRequired={true}
              isDisabled={false}
            />
            <Button
              classes="button--icon icon--add"
              handleClick={handleAddRecipeIngredient}
              isDisabled={!(recipeFormIngredientFields.current._id !== '' && recipeFormIngredientFields.current.qty !== '')}
            >
              <span className="vh">Add ingredient</span>
            </Button>
          </div>
          <input type="hidden" name="ingredientId" value={recipeFormIngredientFields.current._id} readOnly={true} />
          { recipeFormIngredientFields.isAdded.length > 0 &&
            <ul className="recipes__ingredient-form__list">
              {recipeFormIngredientFields.isAdded.map(ingredient =>
                <li
                  key={ingredient._id}
                >
                  {ingredient.qty} {ingredient.unit} of {ingredient.name} 
                  <Button
                    classes="button--icon icon--delete"
                    handleClick={() => handleDeleteRecipeIngredient(ingredient)}
                  >
                    <span className="vh">Delete</span>
                  </Button>
                </li>
              )}
            </ul>
          }
          <Button
            handleClick={handleSubmit}
            isDisabled={!isFormValid}
          >
            { isEditingForm ? "Update recipe" : "Add recipe" }
          </Button>
          { isEditingForm && <>
            <Button
              handleClick={e => handleSubmit(e, 'add_as_new')}
              isDisabled={!isFormValid}
            >
                Add as new recipe
            </Button>
            <Button
              handleClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>}
          </>
        </SidebarForm>
      </div>
    </section>
  )
}