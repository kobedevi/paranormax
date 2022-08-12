import { useEffect } from "react";
import { useMission } from "../../GraphQL/Queries";
import Alert from '../../Design/Alert';
import Spinner from '../../Design/Spinner';
import { useParams } from "react-router-dom";

function MissionsDetail() {
    

    const { id } = useParams();
    
    const {data, loading, error} = useMission(id)

    useEffect(() => {
    }, [data])

    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }

    return (
        <>

            {
                error && <Alert color="danger">{error.message}</Alert>
            }
            {
                loading && <Spinner />
            }
            {
                data && (

                    <section className="py-5">
                        <div className="container px-5 my-5">
                            <div className="row gx-5">
                        
                                <div className="col-lg-3">
                                    <div className="d-flex align-items-center mt-lg-5 mb-4">
                                        <img className="img-fluid rounded-circle author-pic" src={data.entry.author.photo ? data.entry.author.photo.url : "http://localhost:8012/paranormax/web/uploads/_336x336_crop_center-center_65_none/user.svg"} alt="..."/>
                                        <div className="ms-3">
                                            <div className="fw-bold">{data.entry.author.username}</div>
                                        </div>
                                    </div>
                                    <div className="row py-3">
                                        {data.entry.missionStatus}
                                        {
                                            (data.entry.missionStatus !== 'success') && (
                                                <button>Accept</button>
                                            )
                                        }
                                    </div>
                                </div>
                                    {
                                        data && (
                                            <div className="col-lg-9">
                                                <article>
                                                    <header className="mb-4">
                                                        <h1 className="fw-bolder mb-1">{data.entry.title}</h1>
                                                        <div className="text-muted fst-italic mb-2">{new Date(data.entry.deadline).toLocaleDateString('en-UK', options)}</div>
                                                        {
                                                            data.entry.tagField && (
                                                                data.entry.tagField.map((tag) => (
                                                                    <div key={tag.id} className="badge bg-secondary text-decoration-none link-light">{tag.title}</div>
                                                                ))
                                                            )
                                                        }
                                                    </header>
                                                    <figure className="mb-4"><img className="img-fluid rounded" src={data.entry.missionImage[0] ? data.entry.missionImage[0].url : "http://kodev.be/web/uploads/_750x500_crop_center-center_65_none/spooky.jpg"} alt="..." /></figure>
                                                    <section className="mb-5">
                                                        <div dangerouslySetInnerHTML={{__html: data.entry.richText}}/>
                                                    </section>
                                                </article>
                                            </div>
                                        )
                                    }
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default MissionsDetail;