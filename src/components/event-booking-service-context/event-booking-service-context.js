import React from "react";

const {
    Provider: EventBookingServiceProvider,
    Consumer: EventBookingServiceConsumer
} = React.createContext()

export {
    EventBookingServiceProvider,
    EventBookingServiceConsumer
}