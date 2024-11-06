import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useState } from "react"
import { redirect } from "react-router-dom"

function SortByRadioGroup(){
    const [sortBy, setSortBy] = useState("date")
    return (<FormControl>
        <FormLabel id="sort-by-label">Sort by:</FormLabel>
        <RadioGroup aria-labelledby="sort-by-label" name="sort-by-radio-buttons" value={sortBy} onChange={handleSortBy} row>
            <FormControlLabel value="date" control={<Radio/>} label="Date (default)"/>
            <FormControlLabel value="comment_count" control={<Radio/>} label="Comment count"/>
            <FormControlLabel value="votes" control={<Radio/>} label="Votes"/>
        </RadioGroup>
    </FormControl>)

    function handleSortBy(event){
        setSortBy(event.target.value)
        redirect(`?sort_by=${sortBy}`)
    }
}

export default SortByRadioGroup