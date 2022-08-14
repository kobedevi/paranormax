import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContainer";
import Alert from "../../Design/Alert";
import MissionCard from "../../Design/MissionCard";
import Spinner from "../../Design/Spinner";
import { GET_USER_HISTORY } from "../../GraphQL/Queries";


const HistoryMissions = () => {
    const {user} = useAuth();

    const {error, loading, data} = useQuery(GET_USER_HISTORY)
    const [filteredArray, setFilteredArray] = useState()
    const [amount,setAmount] = useState(0)

    const filteredData = () => {
        const filteredDataArray = []
        data.entries.map((mission) => {
            if(mission.assignedTo.some((medium) => parseInt(medium.id) === parseInt(user.user.id))) {
                filteredDataArray.push(mission)
            }
        })
        setAmount(1)
        return filteredDataArray
    }

    useEffect(() => {
    }, [data, user])

    return (
        <ul className="no-bulletpoints">
            {
                error && <Alert color="danger">{error.message}</Alert>
            }
            {
                loading && <Spinner/>
            }
            {
               ((data !== undefined) && (amount === 0)) && (
                    setFilteredArray(filteredData)
                )
            }
            {
                amount === 1 && (
                    <section className="py-5">
                        <div className="container px-5 my-5">
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">
                                    <div className="text-center">
                                        <h2 className="fw-bolder">MISSIONS</h2>
                                        <p className="lead fw-normal text-muted mb-5">Collection of all your past missions as a medium</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    data && (
                                        <ul className="no-bulletpoints row gx-5">
                                            {
                                                filteredArray.map((mission) => (
                                                    (mission.missionStatus !== 'draft' && !mission.denied) && (
                                                        <li className="col-lg-4 mb-5" key={mission.id}><MissionCard mission={mission}/></li>
                                                    )
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                )

            }
        </ul>
    )
}

export default HistoryMissions
