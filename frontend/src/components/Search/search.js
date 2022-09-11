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
          if(restaurant.name.toLowerCase().includes(e.target.value.toLowerCase())){
            return true;
          }
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
            size={28}
            onChange={
              filteredRestaurant
              }
             />
          <div className='results-container'>
            {enhancedSearch.map(result => (
              <NavLink key={result.id} to={`/businesses/${result.id}`}>
                <div className='individual-result'>
                  <p className='search-name'>{result.name}</p>
                  <p className='search-detail'>Street Address: {result.street} | Phone: {result.phone}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )
    };

export default Search;
