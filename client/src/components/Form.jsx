import React, {useState, useEffect} from 'react'
import { CREATE_RECIPE } from '../GraphQL';
import { useMutation } from '@apollo/client';

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createRecipe, { loading, error, data }] = useMutation(CREATE_RECIPE)

  const addRecipe = () => {
    createRecipe({
        variables: {
            recipeInput: {
                name: name,
                description: description
            }
        }
    })

    alert("Recipe added!");

    setName("");
    setDescription("");

    if (error) console.log("error: ", error)
  }

  useEffect(() => {
    if (data) {
        console.log(data);
    }
    },[data])

  return (
    <div>
            <input
                type='text'
                placeholder='Recipe Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-full item-center p-3 mt-2'
            /> <br/>
            <textarea
                type='textarea'
                value={description}
                rows={4}
                cols={50}
                placeholder='Recipe Description'
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full p-3'
            /> <br/>
            
            <button className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md' onClick={addRecipe}>Add Recipe!</button>
    </div>
  )
}

export default Form