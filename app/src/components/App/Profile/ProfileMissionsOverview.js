import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContainer'
import Alert from '../../Design/Alert'
import MissionCard from '../../Design/MissionCard'
import Spinner from '../../Design/Spinner'
import { GET_USER_CREATED_MISSIONS } from '../../GraphQL/Queries'
import MissionHeader from '../Missions/MissionHeader'

function ProfileMissionsOverview() {
    
    const { user } = useAuth();

    const {error, loading, data } = useQuery(GET_USER_CREATED_MISSIONS, {
        variables: {
            id: [user.user.id]
        }
    })

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
                              <p className="lead fw-normal text-muted mb-5">Collection of all your missions</p>
                          </div>
                      </div>
                  </div>
                  <div>
                      <MissionHeader/>
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

export default ProfileMissionsOverview