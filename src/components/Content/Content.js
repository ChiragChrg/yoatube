import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

const Content = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Dashboard />
        </div>
    )
}

export default Content