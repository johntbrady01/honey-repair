import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"




export const UpdateTicket= () => {
    const {ticketId}=useParams()
    // TODO: Provide initial state for profile
    const [ticket, updateTicket]= useState({
        description:"",
        emergency:false,
        userId:0,
    })
    const [feedback, setFeedback] = useState("")

    const navigate=useNavigate()

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

    
  

    // TODO: Get employee profile info from API and update state
    useEffect(()=>{
        fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
            .then(response=>response.json())
            .then((data)=>{
                const ticketObject=data[0]
                updateTicket(ticketObject)
            })


    },  [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

      

            return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
    })


            .then(response=>response.json())
            .then(()=>{
                
            })
            .then(() => {
                setFeedback("Ticket successfully saved")
            })
            .then(() => {
                navigate("/tickets")
            })
    
    }

    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
        <form className="profile">
            <h2 className="profile__title">Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...ticket}
                                copy.description=evt.target.value
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        className="form-control"
                        value={ticket.emergency}
                        checked={ticket.emergency}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...ticket}
                                copy.emergency=evt.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=> handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>
    
}
