import React, {useState} from 'react'
import { CreateTable } from '../components'
import { useQuery } from '@apollo/client';
import { QUERY, EDIT_RECIPE, DELETE_RECIPE } from '../GraphQL';
import { useMutation } from '@apollo/client';



const UpdatePage = () => {
    const [keys, setKeys] = useState([])
    const [recipes, setRecipes] = useState([]);
    const [searchId, setSearchId] = useState("");
    const querySearch = useQuery(QUERY, {variables: {"id":searchId}});
    const [editRecipe, {data}] = useMutation(EDIT_RECIPE, {ID: searchId})
    const [deleteRecipe, {error}] = useMutation(DELETE_RECIPE);


    const handleSearch = () => {
        if (!querySearch.error){
            setKeys(["name", "description"])
            setRecipes(querySearch.data.recipe);
        }
        else {
            alert("error: ", querySearch.error);
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setRecipes(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleEdit = (action) => {
        if (action === "update"){
            if (recipes.name.trim() && recipes.description.trim()){
                editRecipe({
                    variables: {
                        id: searchId,
                        recipeInput: {
                            name: recipes.name,
                            description: recipes.description
                        }
                    }
                })
                alert(`Updated!\nName: ${recipes.name}\nDescription: ${recipes.description}`)
            }
            else{
                alert("Fields cannot be empty")
            }
        }
        else if (action === "delete"){
            if (confirm("Delete this recipe?")){
                deleteRecipe({
                    variables:{
                        id: searchId
                    }
                })
                alert("Deleted!")
            }
        }
    }
    
  return (
    <div className='w-full items-center'>
        <div className='flex mb-2 gap-2'>
            <input
                type='text'
                value={searchId}
                placeholder='Search for an ID to update'
                onChange={(e) => setSearchId(e.target.value)}
                className='w-full item-center px-3 rounded-md'
            />
                <button 
                    className='font-semibold text-xs bg-[#c1bec2] py-1 px-2 rounded-[5px] text-black'
                    onClick={handleSearch}
                >
                    Search
                </button>
        </div>
        <CreateTable recipes={recipes} isUpdate={true} keys={keys} handleEdit={handleEdit} handleOnChange={handleOnChange} />
        
    </div>
  )
}

export default UpdatePage