import { useMutation } from "@apollo/client"
import { useState } from "react"
import Alert from "../../Design/Alert"
import { SET_MISSION_SUCCESS, SET_MISSION_FAIL } from "../../GraphQL/Mutations"

const FinishMission = ({missionId}) => {

    const [error, setError] = useState()
    const [btnDisable, setBtnDisable] = useState(false)
    const [setMissionSuccess] = useMutation(SET_MISSION_SUCCESS)
    const [setMissionFail] = useMutation(SET_MISSION_FAIL)


    const handleSuccess = (e) => {
        e.preventDefault();
        setBtnDisable(true)
        setMissionSuccess({
            variables: {
                missionId
            }, onCompleted:() => {
                setBtnDisable(false)
            }
        }).catch((e) =>{
            setError(e)
            setBtnDisable(false)
        })
    }

    const handleFail = (e) => {
        e.preventDefault();
        setBtnDisable(true)
        setMissionFail({
            variables: {
                missionId
            }, onCompleted:() => {
                setBtnDisable(false)
            }
        }).catch((e) =>{
            setError(e)
            setBtnDisable(false)
        })
    }
    
    return (
        <>
            {
                error && <Alert color="danger">{error.message}</Alert>
            }
            <div class="d-grid p-0 pt-3">
                <button onClick={handleSuccess} disabled={btnDisable}class="btn btn-success btn-lg" id="submitButton" type="submit">Mission Success</button>
            </div>
            <div class="d-grid p-0 pt-2">
                <button onClick={handleFail} disabled={btnDisable}class="btn btn-danger btn-lg" id="submitButton" type="submit">Mission Failed</button>
            </div>
        </>
    )
}

export default FinishMission