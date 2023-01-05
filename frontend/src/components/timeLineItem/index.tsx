import React from 'react';

import './timeLineItem.scss';

type TimeLineItemProps = {
    children: React.ReactNode;
    className?: string | undefined;
    type?: 'work' | 'education' | 'point' | undefined;
};

const TimeLineItem = ({
    children,
    className = '',
    type
}: TimeLineItemProps) => {
    return (
        <div className={`line row d-flex ${className}`}>
            {/* Margin Colums (necessary for the timeline effect) */}
            <div className="col-md-1 bg1 hidden-sm hidden-xs" />
            <div
                className={`col-md-2 timeline-progress hidden-sm hidden-xs ${
                    type ? 'timeline-' + type : null
                }`}
            />
            {/* Margin Colums */}
            {/* Item Content */}
            <div className="col-md-8 content-wrap bg1">
                <>{children}</>
            </div>
            {/* Item Content */}
            {/* Margin Collum */}
            <div className="col-md-1 bg1 hidden-sm hidden-xs" />
            {/* Margin Collum */}
        </div>
    );
};

export default TimeLineItem;
