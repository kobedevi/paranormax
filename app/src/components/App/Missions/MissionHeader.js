import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../core/routing'

function MissionHeader() {
  return (
      <div className="col-lg-3 col-xl-3">
        <div className="card mb-5">
          <div className="d-grid">
            <Link className="col-md btn btn-outline-primary" to={Routes.MissionCreate}>Add an assignment</Link>
          </div>
        </div>
    </div>
  )
}

export default MissionHeader