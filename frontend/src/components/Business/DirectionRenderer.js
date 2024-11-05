import { useState, useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

function Directions({origin, destination}){
    const map = useMap("map-Id");
    const [directionService, setDirectionService] = useState();
    const [directionRenderer, setDirectionRenderer] = useState();
    useEffect(()=>{
        if(!map) return;
        setDirectionService(new window.google.maps.DirectionsService());
        setDirectionRenderer(new window.google.maps.DirectionsRenderer({map}))
    },[map])

    useEffect(()=>{
        if(!directionService || !directionRenderer) return;
        directionService.route({
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        }).then((response)=>{
            console.log(response)
            directionRenderer.setDirections(response);
        })
    },[directionService, directionRenderer, origin, destination])

    return null;
}

export default Directions;
