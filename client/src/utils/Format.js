import React from "react";
import PropTypes from "prop-types";

import FullStarIcon from "@material-ui/icons/Star";
import HalfStarIcon from "@material-ui/icons/StarHalf";
import EmptyStarIcon from "@material-ui/icons/StarBorder";

export const formatPhoneNumber = phoneNumber => {
    let output = "";
    if (!phoneNumber) {
        return output;
    }
    const input = phoneNumber.replace(/\D/g, "");
    const area = input.substr(0, 3);
    const pre = input.substr(3, 3);
    const tel = input.substr(6, 4);
    if (area.length === 0) {
        output = ``;
    } else if (area.length < 3) {
        output = `(${area}`;
    } else if (area.length === 3 && pre.length === 0) {
        output = `(${area}`;
    } else if (area.length === 3 && pre.length < 3) {
        output = `(${area})${pre}`;
    } else if (area.length === 3 && pre.length === 3 && tel.length === 0) {
        output = `(${area})${pre}`;
    } else if (area.length === 3 && pre.length === 3 && tel.length > 0) {
        output = `(${area})${pre}-${tel}`;
    }
    return output;
};

export const RatingStars = props => {
    const { rating, className } = props;
    // round to the closest 0.5
    const fullStar = Math.floor(rating);
    const halfStar = rating - fullStar;
    const emptyStar = Math.floor(5 - fullStar - halfStar);
    return (
        <>
            {fullStar > 0 && new Array(fullStar).fill().map((a, index) => <FullStarIcon key={index} className={className} />)}

            {halfStar > 0 && <HalfStarIcon className={className} />}

            {emptyStar > 0 && new Array(emptyStar).fill().map((a, index) => <EmptyStarIcon key={index} className={className} />)}

        </>
    );

};
RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
};
