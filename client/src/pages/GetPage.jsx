import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { CreateTable } from '../components';
import { GET_ALL_RECIPES, GET_RECIPES, QUERY } from '../GraphQL';


const GetPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchId, setSearchId] = useState("");

    // Table headers are filter-able
    const [filterKeys, setFilterKeys] = useState([])

    // Checkboxes
    const [nameCb, setNameCb] = useState({key: "name", display: "Name", isChecked: true});
    const [descriptionCb, setDescriptionCb] = useState({key: "description", display: "Description", isChecked: true});
    const [createdAtCb, setCreatedAtCb] = useState({key: "createdAt", display: "Created At", isChecked: true});
    const [thumbsUpCb, setThumbsUpCb] = useState({key: "thumbsUp", display: "Thumbs Up", isChecked: true});
    const [thumbsDownCb, setThumbsDownCb] = useState({key: "thumbsDown", display: "Thumbs Down", isChecked: true});

    // GraphQL queries
    const querySearch = useQuery(QUERY, {variables: {"id":searchId}});
    const getAllSearch = useQuery(GET_ALL_RECIPES);

    const setKeys = () => {
        // Update filter keys to only checked boxes
        var arr = []
        const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (let box of checkedBoxes) arr.push(box.name);

        setFilterKeys(arr);
    }

    function handleSearch() {
        setKeys()
        setRecipes([querySearch.data.recipe]);
    }

    function handleGetAll() {
        setKeys()
        if (getAllSearch.data){
            setRecipes(getAllSearch.data.getAllRecipes)
        }
    }


    return (
        <div className='items-center'>
            <div className='flex mb-2 gap-2'>
                <input
                    type='text'
                    placeholder='Search by ID'
                    onChange={(e) => setSearchId(e.target.value)}
                    className='w-full item-center px-3 rounded-md'
                />
                    <button 
                        className='font-semibold text-xs bg-[#c1bec2] py-1 px-2 rounded-[5px] text-black'
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    <button 
                        className='font-semibold text-xs bg-[#c1bec2] py-1 px-2 rounded-[5px] text-black'
                        onClick={handleGetAll}
                    >
                        Get All
                    </button> 
            </div>
            <div className='flex gap-2'>
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="name"
                        checked={nameCb.isChecked}
                        onChange={() => setNameCb({ ...nameCb, isChecked: !nameCb.isChecked})}
                    />
                    <label>Name</label>
                </label>   
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="description"
                        checked={descriptionCb.isChecked}
                        onChange={() => setDescriptionCb({ ...descriptionCb, isChecked: !descriptionCb.isChecked})}
                    />
                    <label>Description</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="createdAt"
                        checked={createdAtCb.isChecked}
                        onChange={() => setCreatedAtCb({ ...createdAtCb, isChecked: !createdAtCb.isChecked})}
                    />
                    <label>Created At</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="thumbsUp"
                        checked={thumbsUpCb.isChecked}
                        onChange={() => setThumbsUpCb({ ...thumbsUpCb, isChecked: !thumbsUpCb.isChecked})}
                    />
                    <label>Thumbs Up</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="thumbsDown"
                        checked={thumbsDownCb.isChecked}
                        onChange={() => setThumbsDownCb({ ...thumbsDownCb, isChecked: !thumbsDownCb.isChecked})}
                    />
                    <label>Thumbs Down</label>
                </label> 
            </div>
            {<CreateTable recipes={recipes} isUpdate={false} keys={filterKeys} />}
        </div>
    )
}

export default GetPage