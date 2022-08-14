import React from 'react'
import { Link } from 'react-router-dom'
import { route, Routes } from '../../core/routing'

function MissionCard({mission, reRenderer=null}) {    

    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }

  return (
    <div>
        <div className="card h-100 shadow border-0">
            <img className="card-img-top blog" src={mission.missionImage[0] ? mission.missionImage[0].url : "http://kodev.be/web/uploads/_750x500_crop_center-center_65_none/spooky.jpg"} alt="..."/>
            <div className="card-body p-4">
                {
                    mission.tagField && (
                        mission.tagField.map((tag) => (
                            <div key={tag.id} className="badge bg-primary bg-gradient rounded-pill mb-2">{tag.title}</div>
                        ))
                    )
                }
                <Link className="text-decoration-none link-dark stretched-link" to={route(Routes.MissionDetail, {id: mission.id})}><h5 className="card-title mb-3">{mission.title}</h5></Link>
                <p className="card-text mb-0">{mission.shortDescription}</p>
            </div>
            <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div className="d-flex align-items-end justify-content-between">
                    <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3 author-pic" src={mission.author.photo ? mission.author.photo.url : "http://localhost:8012/paranormax/web/uploads/_336x336_crop_center-center_65_none/user.svg"} alt="..."/>
                        <div className="small">
                            <div className="fw-bold">{mission.author.username}</div>
                            <div className="text-muted">{new Date(mission.deadline).toLocaleDateString('en-UK', options)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MissionCard