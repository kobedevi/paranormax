import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import isMedium from "../../../core/auth/utils";
import { useAuth } from "../../Auth/AuthContainer";

const BecomeMedium = () => { 
    const [userIsMedium, setUserIsMedium] = useState(false)

    const GET_MEDIUMS = gql`
        query getMediums {
            users(group: "mediums") {
                id
            }
        }
    `;

    const {errorMediums, loading: loadingMediums, data: mediums} = useQuery(GET_MEDIUMS)

    const { user } = useAuth();
    useEffect(() => {
        if(mediums !== undefined) {
            // setUserIsMedium(isMedium(user, mediums.users))
        }
    }, [mediums, user])

    return(
        <>
        {
            userIsMedium && (
                <p>You Already are a medium</p>
            )
        }
        {
            !userIsMedium && (
                <button>Become a medium</button>
            )
        }
        </>
    )
}

export default BecomeMedium