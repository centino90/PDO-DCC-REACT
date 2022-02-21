import React from 'react'
import {
    Link,
    Route,
    Routes,
    useParams,
    Outlet
} from 'react-router-dom'

export function Topics() {
    let { topicId } = useParams()
    console.log(topicId)

    return (
        <div>
            <h1>TOPICS</h1>

            <Outlet />
        </div>
    )
}