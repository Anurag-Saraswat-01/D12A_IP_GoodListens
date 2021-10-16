import { FaSearch } from 'react-icons/fa'

const SearchBar = ({term, setTerm}) => {
    //Getting search
    return (
        <div className="search">
            <div className="searchInputs">
                <input className = "searchBar" type="text" placeholder = "Search Songs..." value={term} onChange={(e) => {setTerm(e.target.value)}} />
                <FaSearch className="searchIcon" />
            </div>
            
        </div>
    )
}

export default SearchBar
