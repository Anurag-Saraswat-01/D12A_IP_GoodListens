import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
    return (
        <div className="search">
            <div className="searchInputs">
                <input className = "searchBar" type="text" placeholder = "Search Songs..."/>
                <FaSearch className="searchIcon" />
            </div>
            
        </div>
    )
}

export default SearchBar
