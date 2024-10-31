import React, {useState} from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";

function PlaceAutocomplete(){
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({});

    async function onSelect(address) {
        const results = await geocodeByAddress(address);
        const latlng = await getLatLng(results[0]);
        setCoordinates(latlng);
        setAddress(address);
    }
    return (
        <div className="search-Places">
            {/* <div>places</div> */}
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={onSelect}>
            {()=>{<div>place</div>}}
            {/* {({ getInputProps, suggestions, getSuggestionItemProps, loading })=>{
                <div>
                    <div>place</div>
                    <input {...getInputProps({placeholder: 'Search Places'})}/>
                    {loading? <div>...loading</div>:null}
                    <div>
                        {suggestions.map((suggestion)=>{
                            const style = {
                                backgroundColor: suggestion.active? "blue":"#fff",
                                cursor:"pointer"
                            }
                            return (
                                <div {...getSuggestionItemProps(suggestion, {style})}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div>
            }} */}
            </PlacesAutocomplete>
        </div>
    )
}

export default PlaceAutocomplete;
