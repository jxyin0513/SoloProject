import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './search.css'

const Search = () => {
    // const dispatch = useDispatch()
    const [enhancedSearch, setEnhancedSearch] = useState([])
    const restaurants = Object.values(useSelector(state=>state.allBusinesses))
    let search = []

    const filteredRestaurant = (e)=>{
      if(e.target.value){
        search = restaurants.filter(restaurant=>{
          if(restaurant.name.toLowerCase().startsWith(e.target.value.toLowerCase())){
            return true;
          }
          return false;
        })
      }
      console.log(search)
      setEnhancedSearch(search)
    }
    return (
        <div className='search-Bar'>
          <input
            className='restaurant-Search'
            type='text'
            placeholder="Search your favorite restaurant"
            size={40}
            onChange={
              filteredRestaurant
              }
             />
          <div className='results-container'>
            {enhancedSearch.map(result => (
              <div className='search-outer' key={result.id}>
                <NavLink className='search-restaurants' onClick={()=>setEnhancedSearch([])} to={`/businesses/${result.id}`}>
                  <div className='individual-result'>
                    <div className='search-name'>Name: {result.name}</div>
                    <div className='search-detail'>Street Address: {result.address} | Phone: {result.phoneNumber}</div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )
    };

export default Search;