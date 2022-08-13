import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../core/routing'

function MissionHeader() {
  return (
    <Link to={Routes.MissionCreate}>Add an assignment</Link>
  )
}

export default MissionHeader