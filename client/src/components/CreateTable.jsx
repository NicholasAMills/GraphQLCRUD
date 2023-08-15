import React, { useState } from 'react'


const CreateTable = ({ recipes, isUpdate, keys, handleEdit=null, handleOnChange=null }) => {
  /* Reusable component to create the html table
    args:
        recipes: returned result(s) from gql query
        isUpdate: is user on edit recipe page
        keys: table headers which are the recipe key values
        handleEdit: function reference from UpdatePage component
        handleOnChange: function reference from UpdatePage component
  */
    const renderTableHeader = (keys) => {
        return (
        <thead>
            <tr>
                {
                    keys.map(key => <th key={key} className='border border-slate-600 px-3 text-black'>{key} </th>)
                }
            </tr>
        </thead>)
      
    }
  
    const renderTableBody = (keys) => {
      /* To be able to reuse this component, 'recipes' needs to be checked for a single value, in which case it will not be an array.
         Forcing 'recipes' to be an array with one value caused issues in other areas.
      */
      return (recipes.length == 0 && keys.length > 0) ? 
      <tr>
        <td>No records found</td>
      </tr>
      : Array.isArray(recipes) ? recipes.map((recipe) => {
          return <tr key={recipe.createdAt}>
              {
                !isUpdate ? 
                keys.map((k) => {
                    return <td key={k} className='border border-slate-700 px-3 text-black'>
                        {recipe[k]} 
                    </td>
                    
                }) : (
                    <>
                        <td>
                            <input 
                                    type='text'
                                    value={recipe.name}
                                    onChange={(e) => handleOnChange(e)}
                                    className='bg-white border border-slate-700 px-3 text-black'
                            />
                        </td>
                        <td>
                            <input 
                                    type='text'
                                    value={recipe.description}
                                    onChange={(e) => handleOnChange(e)}
                                    className='bg-white border border-slate-700 px-3 text-black'
                            />
                        </td>
                    </>
                )
              }
              <td>
                { isUpdate && (
                <div className='flex gap-2'>
                    <button 
                        className="font-semibold text-xs bg-[#ffae00] py-1 px-2 rounded-[5px] text-black"
                        onClick={() => handleEdit("update")}
                        >
                        Update
                    </button>
                    <button 
                        className="font-semibold text-xs bg-[#cf0000] py-1 px-2 rounded-[5px] text-black"
                        onClick={() => handleEdit("delete")}
                        >
                        Delete
                    </button>

                </div>
                )

                }
                    
                </td>
            </tr>
      }) : 
      // Single recipe (not in an array)
      <tr key={recipes.createdAt}>
      {
        !isUpdate ? 
        keys.map((k) => {
            return <td key={k} className='border border-slate-700 px-3 text-black'>
                {recipes[k]} 
            </td>
            
        }) : ( // Since the user can only update the recipe name and description, writing out both inputs is more readable than another map function
            <>
                <td>
                    <input 
                            type='text'
                            value={recipes.name}
                            name="name"
                            onChange={(e) => handleOnChange(e, "name")}
                            className='bg-white border border-slate-700 px-3 text-black'
                    />
                </td>
                <td>
                    <input 
                            type='text'
                            value={recipes.description}
                            name="description"
                            onChange={(e) => handleOnChange(e, "description")}
                            className='bg-white border border-slate-700 px-3 text-black'
                    />
                </td>
            </>
        )
      }
        <td>
            { isUpdate && ( // Update and Delete buttons
            <div className='flex gap-2'>
                <button 
                    className="font-semibold text-xs bg-[#ffae00] py-1 px-2 rounded-[5px] text-black"
                    onClick={() => handleEdit("update")}
                    >
                    Update
                </button>
                <button 
                    className="font-semibold text-xs bg-[#cf0000] py-1 px-2 rounded-[5px] text-black"
                    onClick={() => handleEdit("delete")}
                    >
                    Delete
                </button>

            </div>
            )

            }
                
            </td>
        </tr>
    }
  
    const renderTable = (keys) => {
      return (
          <table className='border-separate border-spacing-2 border border-slate-500 mx-auto'>
              {renderTableHeader(keys)}
              <tbody>
                  {renderTableBody(keys)}
              </tbody>
          </table>
      )
    }
    return renderTable(keys);
}

export default CreateTable