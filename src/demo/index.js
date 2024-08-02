import React from "react";
import { useSearchParam, MediaViewer } from "../react-media-viewer";


const Demo = () => {
    const [resourceURL, resourceType, isCrossOrigin, errors] = useSearchParam();
    if(errors.length === 0) {
        return <MediaViewer resourceURL={resourceURL} resourceType={resourceType} isCrossOrigin={isCrossOrigin} />;
    } else {
        return errors.map(error => {
            return <p>{error.message}</p>
        })
    }

}
export default Demo;