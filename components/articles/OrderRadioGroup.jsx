import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useState } from "react"

function OrderRadioGroup(){
    const [order, setOrder] = useState("ascending")
    return (<FormControl>
        <FormLabel id="order-label">Order:</FormLabel>
        <RadioGroup aria-labelledby="order-label" name="order-radio-buttons" value={order} onChange={(event) => {setOrder(event.target.value)}} row>
            <FormControlLabel value="ascending" control={<Radio/>} label="Ascending"/>
            <FormControlLabel value="descending" control={<Radio/>} label="Descending"/>
        </RadioGroup>
    </FormControl>)

    function handleOrder(event){
        setOrder(event.target.value)
        
    }
}

export default OrderRadioGroup