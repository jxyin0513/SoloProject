import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './search.css'

const Search = () => {
    const [enhancedSearch, setEnhancedSearch] = useState([])
    const restaurants = Object.values(useSelector(state=>state.allBusinesses))
    let search = []
    const filteredRestaurant = (e)=>{
      if(e.target.value){
        search = restaurants.filter(restaurant=>{
          if(restaurant.name.toLowerCase().startsWith(e.target.value.toLowerCase())){
            return true;
          }else{
            return false;
          }
        })
      }
      setEnhancedSearch(search)
    }
    return (
        <div className='search-Bar'>
          <form className='search-form'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              className='restaurant-Search'
              type='text'
              placeholder="Search your favorite restaurant"
              size={50}
              onChange={
                filteredRestaurant
                }
            ></input>
            </form>
          {enhancedSearch.length>0 && (<div className='results-container'>
            {enhancedSearch.map(result => (
              <div className='search-outer' key={result.id}>
                <NavLink className='search-restaurants' onClick={()=>setEnhancedSearch([])} to={`/businesses/${result.id}`}>
                  <div className='individual-result' >
                    <div className='search-name' >Name: {result.name}</div>
                    <div className='search-detail' >Street Address: {result.address} | Phone: {result.phoneNumber}</div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>)}
        </div>
      )
    };

export default Search;
