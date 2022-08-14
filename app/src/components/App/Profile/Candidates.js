import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { GET_CANDIDATES_FOR_MISSION } from "../../GraphQL/Queries"
import CandidateCard from "./CandidateCard"
import Spinner from '../../Design/Spinner';
import Alert from '../../Design/Alert';



const Candidates = ({accepted}) => {

    const { id } = useParams();

    const {error, loading, data} = useQuery(GET_CANDIDATES_FOR_MISSION, {
        variables: {
            id
        }
    })

    useEffect(() => {
    }, [data]) 

    return(
        <ul className="no-bulletpoints">
            {
                error && <Alert color="danger">{error.message}</Alert>
            }
            {
                loading && <Spinner/>
            }
            {
                data && (
                    data.entry.mediumQueue.map((medium) => (
                        <li key={medium.id}>
                            <CandidateCard medium={medium}/>
                        </li>
                    ))
                )
            }
            {
                accepted && (
                    accepted.map((medium) => (
                        <li key={medium.id}>
                            <CandidateCard accepted={accepted} medium={medium}/>
                        </li>
                    ))
                )
            }
            
        </ul>
    )
}

export default Candidates