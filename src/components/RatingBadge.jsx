import React from 'react';

const RatingBadge = ({ rating }) => {
    const score = Number(rating);

    const getBadgeColor = (val) => {
        if (val >= 8) return 'bg-green-500';
        if (val >= 7) return 'bg-blue-500';
        return 'bg-red-500';
    };

    return (
        <span className={`${getBadgeColor(score)} text-white px-2 py-1 rounded text-sm font-medium`}>
            Rating: {score.toFixed(1)}
        </span>
    );
};

export default RatingBadge;
