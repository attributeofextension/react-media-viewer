import React from "react";


export default function MediaViewer({ resourceUrl }) {
    if(resourceUrl && URL.canParse(resourceUrl)) {
        return <React.Fragment>{resourceUrl}</React.Fragment>
    }
    return <React.Fragment />;
}