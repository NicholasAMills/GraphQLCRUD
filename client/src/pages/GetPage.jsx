import { useState } from 'react'
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
    const [idCb, setIdCb] = useState({isChecked: true})

    // GraphQL queries
    const querySearch = useQuery(QUERY, {variables: {"id":searchId}});
    const getAllSearch = useQuery(GET_ALL_RECIPES);

    const setKeys = () => {
        // Update filter keys to only checked boxes
        var arr = []
        const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (let box of checkedBoxes) arr.push(box.id);

        setFilterKeys(arr);
    }

    function handleSearch() {
        if (!querySearch.error){
            setKeys()
            if(querySearch.data.recipe)
                setRecipes([querySearch.data.recipe]);  
        }
        else{
            alert(querySearch.error)
        }
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
                        name="ID"
                        id="id"
                        checked={idCb.isChecked}
                        onChange={() => setIdCb({ ...idCb, isChecked: !idCb.isChecked})}
                    />
                    <label>ID</label>
                </label>   
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="Name"
                        id="name"
                        checked={nameCb.isChecked}
                        onChange={() => setNameCb({ ...nameCb, isChecked: !nameCb.isChecked})}
                    />
                    <label>Name</label>
                </label>   
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="Description"
                        id="description"
                        checked={descriptionCb.isChecked}
                        onChange={() => setDescriptionCb({ ...descriptionCb, isChecked: !descriptionCb.isChecked})}
                    />
                    <label>Description</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="Created At"
                        id="createdAt"
                        checked={createdAtCb.isChecked}
                        onChange={() => setCreatedAtCb({ ...createdAtCb, isChecked: !createdAtCb.isChecked})}
                    />
                    <label>Created At</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="Thumbs Up"
                        id="thumbsUp"
                        checked={thumbsUpCb.isChecked}
                        onChange={() => setThumbsUpCb({ ...thumbsUpCb, isChecked: !thumbsUpCb.isChecked})}
                    />
                    <label>Thumbs Up</label>
                </label> 
                <label className='text-black p-2'>
                    <input
                        type="checkbox"
                        name="Thumbs Down"
                        id="thumbsDown"
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