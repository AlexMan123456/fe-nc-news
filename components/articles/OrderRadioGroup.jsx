import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import setQuery from "../../utils/set-query"

function OrderRadioGroup(){
    const location = useLocation()
    const navigate = useNavigate()
    function handleOrder(event){
        console.log(location.search)
        const queryString = location.search ? setQuery(location.search, "order", event.target.value) : `?order=${event.target.value}`
        navigate(`${location.pathname}${queryString}`)
    }
    return (<FormControl>
        <FormLabel id="order-label">Order:</FormLabel>
        <RadioGroup 
            aria-labelledby="order-label" 
            name="order-radio-buttons"
            defaultValue="desc"
            onChange={handleOrder} 
            row>
                <FormControlLabel value="desc" control={<Radio/>} label="Descending (default)"/>
                <FormControlLabel value="asc" control={<Radio/>} label="Ascending"/>
        </RadioGroup>
    </FormControl>)
}

export default OrderRadioGroup