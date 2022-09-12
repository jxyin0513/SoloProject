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
              <NavLink className='search-restaurants' onClick={()=>setEnhancedSearch([])} key={result.id} to={`/businesses/${result.id}`}>
                <div className='individual-result'>
                  <div className='search-name'>Name: {result.name}</div>
                  <div className='search-detail'>Street Address: {result.address} | Phone: {result.phoneNumber}</div>
                  <div className='distinguish'></div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )
    };

export default Search;
