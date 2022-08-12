import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LOAD_MISSIONS } from "../../GraphQL/Queries";
import MissionCard from "../../Design/MissionCard";
import Alert from '../../Design/Alert';
import Spinner from '../../Design/Spinner';

function MissionsOverview() {

    const {error, loading, data} = useQuery(LOAD_MISSIONS)

    useEffect(() => {
    }, [data])

    return (
        <>
            <section className="py-5">
                <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <div className="text-center">
                                <h2 className="fw-bolder">MISSIONS</h2>
                                <p className="lead fw-normal text-muted mb-5">Collection of all our missions</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            error && <Alert color="danger">{error.message}</Alert>
                        }
                        {
                            loading && <Spinner />
                        }
                        {
                            data && (
                                <ul className="no-bulletpoints row gx-5">
                                    {
                                        data.entries.map((mission) => (
                                            <li className="col-lg-4 mb-5" key={mission.id}><MissionCard mission={mission}/></li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MissionsOverview;