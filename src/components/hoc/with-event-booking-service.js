import React from "react";
import {EventBookingServiceConsumer} from "../event-booking-service-context";

const withEventBookingService = () => (Wrapped) => {
    return (props)=>{
        return(
            <EventBookingServiceConsumer>
                {
                    (eventBookingService)=>{
                       return  <Wrapped {...props} eventBookingService={eventBookingService}/>
                    }
                }
            </EventBookingServiceConsumer>
        )
    }
}

export default withEventBookingService