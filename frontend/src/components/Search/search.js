import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './search.css'

const Search = () => {
    const [searchResult, setSearchResult] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const restaurants = Object.values(useSelector(state=>state.allBusinesses))
    let search = [];

    useEffect(() => {
      if (!showSearch) return;

      const closeMenu = () => {
        setShowSearch(false);
      };

      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener("click", closeMenu);
  }, [showSearch]);

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
      if(search.length>0){
        setSearchResult(search)
        setShowSearch(true)
      }
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
          {showSearch && searchResult.length>0 && (<div className='results-container'>
            {searchResult.map(result => (
              <div className='search-outer' key={result.id}>
                <NavLink className='search-restaurants' onClick={()=>setSearchResult([])} to={`/businesses/${result.id}`}>
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
