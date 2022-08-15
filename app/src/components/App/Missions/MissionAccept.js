import { useMutation } from "@apollo/client";
import { useState } from "react"
import Alert from "../../Design/Alert";
import { ASSIGN_USER } from "../../GraphQL/Mutations";

const MissionAccept = ({missionId, userId, mediumQueue}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [error, setError] = useState()

    const [assignUser] = useMutation(ASSIGN_USER);

    const acceptOrDeny = (e) => {
        e.preventDefault()

        // denyMission
        let tempArray = [];
        
        // let tempArray = [...mediumQueue];
        if(mediumQueue.some((medium) => medium.id === userId)) {
            const userIndexInQueue = mediumQueue.findIndex(x => x.id === userId);
            mediumQueue.map((medium, index) => {
                if(userIndexInQueue !== index) {
                    tempArray.push(parseInt(medium.id))
                }
            })
            toggleAcceptOrDenyMission(tempArray)
        }
        // accept 
        else {
            mediumQueue.map((medium) => {
                tempArray.push(parseInt(medium.id))
            })
            tempArray.push(parseInt(userId))
            toggleAcceptOrDenyMission(tempArray);
        }
    }

    const toggleAcceptOrDenyMission = (userQueue) => {
        setButtonDisabled(!buttonDisabled)
        assignUser({
            variables: {
                missionId,
                assignee: userQueue
            }, onCompleted:() => {
                setButtonDisabled(false)
            }
        }).catch((e) =>{
            setError(e)
            setButtonDisabled(!buttonDisabled)
        })
    }

    if(mediumQueue.some((medium) => medium.id === userId)) {
        return (
            <>
                {
                    error && <Alert color="danger">{error.message}</Alert>
                }
                <div class="d-grid p-0 pt-3">
                    <button onClick={acceptOrDeny} disabled={buttonDisabled}class="btn btn-danger btn-lg" id="submitButton" type="submit">Cancel request</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                {
                    error && <Alert color="danger">{error.message}</Alert>
                }
                <div class="d-grid p-0 pt-3">
                    <button onClick={acceptOrDeny} disabled={buttonDisabled}class="btn btn-success btn-lg" id="submitButton" type="submit">Request mission</button>
                </div>
            </>
        )
    }

}

export default MissionAccept