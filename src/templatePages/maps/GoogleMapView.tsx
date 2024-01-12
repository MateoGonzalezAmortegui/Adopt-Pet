"use client"
//* Maps
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api"

//* Components
import { LoadingPages } from "@/components/common/skeletons"
import { MarkerPets } from "./MarketPets"

//* React
import { useEffect, useState } from "react"

//* Interfaces
import { PetsDto } from "@/interfaces/PetsDto"

interface Location {
    lat: number
    lng: number
}

export const GoogleMapView = ({ pets }: { pets: PetsDto[] }) => {
    let APIKEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    if (APIKEY == undefined) {
        return
    }

    const mapContainerStyle = {
        width: "100%",
        height: "90vh",
    }

    const [locationInit, setLocationInit] = useState<Location>()

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocationInit({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            })
        })
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <section>
            <article>
                {locationInit ? (
                    <LoadScript googleMapsApiKey={APIKEY}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={locationInit}
                            zoom={14}
                        >
                            <Marker position={locationInit}></Marker>
                            {pets &&
                                pets?.map((pet, index) => (
                                    <MarkerPets
                                        pet={pet}
                                        key={index}
                                        index={index}
                                    />
                                ))}
                        </GoogleMap>
                    </LoadScript>
                ) : (
                    <LoadingPages />
                )}
            </article>
        </section>
    )
}
