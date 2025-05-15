import { useEffect, useState } from "react"
import styles from "./css/monthFilterForm.module.css"

function MonthFilterForm() {

    const [months, setMonths] = useState([])
    const [years, setYears] = useState([])
    const [yearMultiplier, setYearMultiplier] = useState([])

    function getMonthName(monthNumber) {
        const date = new Date()
        date.setMonth(monthNumber) 
        return date.toLocaleString('en-EN', { month: "long" })
      }

    useEffect(()=>{
        const today = new Date()
        setYearMultiplier(today.getFullYear() - 2020)
    }, [])

    useEffect(()=>{
        setYears([])
        for(let i = 0; i <= yearMultiplier; i++){
            setYears(years => [...years, 2020 + i])
        }
    }, [yearMultiplier])

    

      useEffect(() => {
        setMonths([])
        for(let i = 0; i < 12; i++){
            setMonths(months => [...months, getMonthName(i)])
        }
      }, [])

      useEffect(() => {
        console.log(years, yearMultiplier)
      }, [years, yearMultiplier])

    return(
        <div className={styles.filterFormContainer}>
            <form>
                <select>
                    {
                       months.map(month => {
                        return <option>{month}</option>
                       }) 
                    }
                </select>
                <select>
                    {
                       years.map(year=> {
                        return <option>{year}</option>
                       }) 
                    }
                </select>
                <button>Submit</button>
            </form>
        </div>   
    )

}

export default MonthFilterForm