import './Location_det.css'
import search from'../../assets/search-b.png'
const Location_det = () => {
  return (
    <div className='box'>
        <div className='Input'>
        <input type="text"  placeholder='Enter Pickup Location'/  >
       <input type='text' placeholder='Enter Destination'></input>
       <div> <button className='Search'>Search Prices
        <i><img className='search-icon' src={search} alt="" /></i>  </button>
       </div>
      
     
        </div>
      
        
    </div>
  )
}

export default Location_det