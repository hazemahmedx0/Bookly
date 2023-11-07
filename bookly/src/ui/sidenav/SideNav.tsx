import React from 'react'
import UserHeader from './UserHeader'
import MainCategories from './MainCategories'
import NavCollecetionsMenu from './menuTree/NavCollecetionsMenu'

function SideNav() {
    return (
        <nav className="bg-slate-50 border-r border-zinc-200 pt-2 px-2 h-screen w-full  overflow-y-auto  space-y-3">
            <UserHeader />
            <MainCategories />
            <NavCollecetionsMenu />
        </nav>
    )
}

export default SideNav
