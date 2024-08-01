import { useState, useEffect } from 'react';

export default function useSearchParam(searchParamName="view", crossOrigin= false) {
    const searchParamRegex = new RegExp(`(?:${searchParamName}\=)(?<paramValue>.*)\&?`);
    const [searchParamValue, setSearchParamValue] = useState(null);
    const [contentType, setContentType] = useState(null);
    useEffect(() => {
        function handleLocationChange() {
            const results = searchParamRegex.exec(window.location.search)
            console.log(results)
            const newSearchParamValue = results.groups?.paramValue ?? null
            if  (newSearchParamValue && URL.canParse(decodeURIComponent(newSearchParamValue),window.location.origin)) {
                const resourceURL = new URL(decodeURIComponent(newSearchParamValue),window.location.origin)
                if(crossOrigin || resourceURL.hostname === window.location.hostname) {
                    if(newSearchParamValue !== resourceURL.href) {
                        setSearchParamValue(resourceURL.href)
                    }
                    return
                }
            }

            setSearchParamValue(null);
        }

        handleLocationChange()


        return () => {}
    }, [])
    useEffect(() => {
        function getContentType() {
            if(searchParamValue !== null) {
                let url = new URL(searchParamValue, window.location.origin);
                const request = new Request(url, { mode: "no-cors"});
                console.log("fetch" + request.url)
                fetch(request).then(response => {
                    if (response.statusCode === 302) {
                        console.log(response.headers.get("Location"))
                        setSearchParamValue(response.headers.get('Location').);
                    } else if(response.ok) {
                        console.log(response.headers.get("Content-Type"))
                        setContentType(response.headers.get("Content-Type") ?? null);
                    } else {
                        console.log(response.ok + "+" + response.statusCode);
                        console.log(response)
                        setContentType("something is wrong");
                    }
                })
            }
        }
        console.log("useEffect[searchParamValue]=" + searchParamValue);
        getContentType()

    },[searchParamValue, contentType ])
    return [searchParamValue, contentType]
}
