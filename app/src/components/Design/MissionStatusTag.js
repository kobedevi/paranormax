const MissionStatusTag = ({status}) => {

    if(status === 'success') {
        return <div className="badge bg-success bg-gradient rounded-pill mb-2">{status}</div>
    } else if (status === 'failed') {
        return <div className="badge bg-danger bg-gradient rounded-pill mb-2">{status}</div>
    } else {
        return <div className="badge bg-primary bg-gradient rounded-pill mb-2">{status}</div>
    }
}

export default MissionStatusTag