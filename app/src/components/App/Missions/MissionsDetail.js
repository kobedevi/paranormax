import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LOAD_MISSIONS } from "../../GraphQL/Queries";
import Alert from '../../Design/Alert';
import Spinner from '../../Design/Spinner';

function MissionsDetail() {

    const {error, loading, data} = useQuery(LOAD_MISSIONS)

    useEffect(() => {
    }, [data])

    return (
        <>
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5">

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
                                <p>detail</p>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MissionsDetail;