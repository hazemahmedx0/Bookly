import React from 'react'

function CenterdPage({ children }: { children: React.ReactNode }) {
    return (
        <div className=" flex flex-col items-center justify-center">
            {children}
        </div>
    )
}

export default CenterdPage
