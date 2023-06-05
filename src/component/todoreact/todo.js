import React, {useState,useEffect} from 'react'
import "./style.css"

//getting the the data back from the local
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists)
    {
        return JSON.parse(lists);
    }
    else
    {
        return [];
    }
};

const Todo = () => {

    const [inputdata,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());//fatching back the data from the local
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

// adding the item 
    const addItem = () => {

        setInputData("");
        if(!inputdata)
        {
            alert("plzz fill the data first");
        }
        else if(inputdata && toggleButton)
        {
            setItems(items.map((curElem) => {
                if(curElem.id === isEditItem )
                {
                    return {...curElem, name:inputdata};
                }
                return curElem;
            }));
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
            
        }
        else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }

            setItems([...items, newInputData]);
        }
    };

// deleting the item function
    const deleteItem = (index) => {

        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        });

        setItems(updatedItems);
    };

// editing the item function
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        });

        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

// deleting all the list of todo function
    const deleteAll = () => {
        setItems([]);
    };


//adding local storage using Hook useEffect
    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(items)); //item are array, so array to string(because localStorage store the data in key: value(string))
    },[items])


  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo.svg" alt='todologo' />
                    <figcaption>Add Your List Here 🥱</figcaption>
                </figure>
                <div className='addItems'>
                    {/* taking the input */}
                    <input type='text' placeholder='✍️ Add Item' className='form-control' value={inputdata} onChange={ (event) => setInputData(event.target.value) } />

                    {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) 
                    : (<i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>) } 
                    {/* changing the icon from plus to edit as we click on edit button*/}
                    

                </div>

            {/* showing the input i.e, todo List */}
                <div className='showItems'>
                    {items.map((curElem)=>{
                        return(
                            <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                    <i class="far fa-edit add-btn" onClick={()=>{editItem(curElem.id)}}></i>
                                    <i class="far fa-trash-alt add-btn" onClick={()=>{deleteItem(curElem.id)}}></i>
                                </div>
                            </div>
                        )
                    })};
                    
                </div>


                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={deleteAll}>
                        <span>Check List</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo