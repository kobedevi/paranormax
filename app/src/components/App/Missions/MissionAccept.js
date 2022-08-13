import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ASSIGN_USER } from "../../GraphQL/Mutations";
import ErrorAlert from "../../Shared/ErrorAlert";

const MissionAccept = ({missionId, userId}) => {

    const [buttonText, setButtonText] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [error, setError] = useState()

    const [assignUser] = useMutation(ASSIGN_USER);
    

    const acceptOrDeny = (e) => {
        e.preventDefault()
        acceptMission()
    }

    const acceptMission = () => {
        setButtonDisabled(!buttonDisabled)
        console.log(`${missionId} ${userId}`)
        assignUser({
            variables: {
                missionId,
                assignee: parseInt(userId)
            }, onCompleted:(returnValue) => {
                console.log(returnValue)
                setButtonText(!buttonText)
                setButtonDisabled(false)
            }
        }).catch((e) =>{
            setError(e)
            setButtonDisabled(false)
        })
    }

    return (
        <>
            {
                error && (
                    <ErrorAlert error={error} />
                )
            }
            <button onClick={acceptOrDeny} disabled={buttonDisabled}>{buttonText ? 'Request mission' : 'Cancel request'}</button>
        </>
    )

}

export default MissionAccept