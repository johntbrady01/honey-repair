import {useState, useEffect} from "react"
import { Customer } from "./Customers"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers]=useState([])


useEffect(
    () => {
       fetch(` http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((customerArray) =>{
                setCustomers(customerArray)
            })
    },
    [] 
)

return <article className="customers">
        {
            customers.map(customer=> <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                />)
        }
</article>
}