import React from "react"
import { Helmet } from "react-helmet"

export const NotFoundPage = () => {
    return <div>
        <Helmet>
            <title>Page Not Found</title>
        </Helmet>
        <h1>Not found</h1>
    </div>
}
