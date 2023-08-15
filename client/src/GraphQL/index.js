import { gql } from "@apollo/client"

const GET_RECIPES = gql`
    query Query($amount: Int) {
      getRecipes(amount: $amount) {
        createdAt
        description
        name
        thumbsDown
        thumbsUp
      }
    }
  `

  const QUERY = gql`
    query Query($id: ID!){
      recipe(ID: $id) {
        name
        description
        createdAt
        thumbsUp
        thumbsDown
      }
    }
  `
  
  const GET_ALL_RECIPES = gql`
    query Query {
      getAllRecipes {
        name
        description
        createdAt
        thumbsUp
        thumbsDown
      }
    }
  `

  const CREATE_RECIPE = gql`
    mutation Mutation($recipeInput: RecipeInput){
      createRecipe(recipeInput: $recipeInput){
        name
        description
      }
    }
  `

  const EDIT_RECIPE = gql`
    mutation Mutation($id: ID!, $recipeInput: RecipeInput) {
      editRecipe(ID: $id, recipeInput: $recipeInput)
    }
  `

  const DELETE_RECIPE = gql`
    mutation Mutation($id: ID!){
      deleteRecipe(ID: $id)
    }
  `

  export { GET_RECIPES, QUERY, GET_ALL_RECIPES, CREATE_RECIPE, DELETE_RECIPE, EDIT_RECIPE }