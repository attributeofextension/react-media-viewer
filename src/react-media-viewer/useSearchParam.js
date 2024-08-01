import { useState, useEffect } from 'react';

export default function useSearchParam(searchParamName="view", crossOrigin= false) {
    const searchParamRegex = new RegExp(`(?:${searchParamName}\=)(?<paramValue>.*)\&|\b`);
    const [searchParamValue, setSearchParamValue] = useState(null);
    useEffect(() => {
        function handleLocationChange() {
            const results = searchParamRegex.exec(window.location.search)
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
    return searchParamValue;
}
