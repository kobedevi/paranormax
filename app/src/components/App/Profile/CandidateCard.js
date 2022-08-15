import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ASSIGN_USER_ACCEPT } from "../../GraphQL/Mutations";

const CandidateCard = ({medium, accepted=null}) => {

    const {id} = useParams()
    const [acceptUser] = useMutation(ASSIGN_USER_ACCEPT);

    const handleSubmit = (e) => {
        e.preventDefault();
        acceptUser({
            variables: {
                missionId: id,
                assignee: [parseInt(medium.id)]
            }, onCompleted:() => {
                window.location.reload()
            }
        })
    }

    return(
        <aside className={accepted !== null ? "bg-success bg-gradient rounded-3 p-3 p-sm-3 mt-3 " : "bg-primary bg-gradient rounded-3 p-3 p-sm-3 mt-3 "}>
            <div className="d-flex align-items-flex-start justify-content-between flex-column flex-xl-row text-start text-xl-start">
                <div className="mb-2 mb-xl-2">
                    <div className="fs-6 fw-bold text-white">{medium.username}</div>
                    <div className="text-white-50">{medium.email}</div>
                    {
                        !accepted && <button onClick={handleSubmit} className="btn btn-outline-light mt-3" id="button-newsletter" type="button">Accept</button>
                    }
                </div>
            </div>
        </aside>
    )
}

export default CandidateCard