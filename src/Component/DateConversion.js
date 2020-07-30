import React, {useEffect, useState} from 'react'

const DateConversion = (props) => {
    const [date, setDate] = useState("")
    useEffect(()=> {
        var newDate = new Date(props.date *1000)
        setDate(newDate.getDate() +'/'+ (newDate.getMonth()+1) +'/'+ newDate.getFullYear())
    }, [props.date])
    return <div>{date}</div>
}
export default DateConversion