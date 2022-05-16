import React from "react"
import { Helmet } from "react-helmet"

export const ServerErrorPage = () => {

    return <div>
        <Helmet>
            <title>Internal Server Error</title>
        </Helmet>
        <h1>Internal Server Error</h1>
    </div>
}
