import React from "react";
import Details from "./details";
import Gallery from "./gallery";
import Speakers from "./speakers";
import Prerequisites from "./prerequisites";

const Events = ({ event }: any) => {
    return (
        <>
            <Details event={event} />
            <Gallery event={event} />
            <Speakers event={event} />
            <Prerequisites event={event} />
        </>
    );
};

export default Events;
