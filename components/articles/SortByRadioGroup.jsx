import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import setQuery from "../../utils/set-query"

function SortByRadioGroup(){
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleSortBy(event){
        const queryString = location.search ? setQuery(location.search, "sort_by", event.target.value) : `?sort_by=${event.target.value}`
        navigate(`${location.pathname}${queryString}`)
    }

    return (<FormControl>
        <FormLabel id="sort-by-label">Sort by:</FormLabel>
        <RadioGroup 
            aria-labelledby="sort-by-label" 
            name="sort-by-radio-buttons"
            defaultValue="created_at"
            onChange={handleSortBy} 
            row>
                <FormControlLabel value="created_at" control={<Radio/>} label="Date (default)"/>
                <FormControlLabel value="comment_count" control={<Radio/>} label="Comment count"/>
                <FormControlLabel value="votes" control={<Radio/>} label="Votes"/>
        </RadioGroup>
    </FormControl>)

    
}

export default SortByRadioGroup