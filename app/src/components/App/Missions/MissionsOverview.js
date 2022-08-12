import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import LogoutButton from "../../Auth/LogoutButton";
import { LOAD_MISSIONS } from "../../GraphQL/Queries";


function MissionsOverview() {

    const {error, loading, data} = useQuery(LOAD_MISSIONS)

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <>
            <div>
                <h1>MissionsPage</h1>
                <ul>
                {
                    data && (
                        data.entries.map((mission) => (
                            <li key={mission.id}>{mission.title}</li>
                        ))
                    )
                }
                </ul>
            </div>

            
        </>
    )
}

export default MissionsOverview;