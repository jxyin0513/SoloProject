import React from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";

function PlacesAutocomplete({setSelected}){

    const {
        ready,
        value,
        setValue,
        suggestions:{status, data},
        clearSuggestions
    } = usePlacesAutocomplete();
    return

}

export default PlacesAutocomplete;
