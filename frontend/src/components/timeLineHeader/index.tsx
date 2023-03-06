import './timeLineHeader.scss'

type TimeLineHeaderProps = {
    name: string;
};

const TimeLineHeader = ({name}: TimeLineHeaderProps) => {
    return <>
        {/* VERTICAL MARGIN (necessary for the timeline effect) */}
        <div
            className="line row timeline-margin content-wrap"
        >
            <div className="col-md-1 bg1 timeline-space hidden-sm hidden-xs" />
            <div className="col-md-2 timeline-progress hidden-sm hidden-xs" />
            <div className="col-md-9 bg1" />
        </div>
        {/* /VERTICAL MARGIN */}
        {/* SECTION TITLE */}
        <div className="line row d-flex">
            {/* Margin Collums (necessary for the timeline effect) */}
            <div className="col-md-1 bg1 timeline-space hidden-sm hidden-xs" />
            <div className="col-md-2 hidden-sm hidden-xs timeline-title" />
            {/* /Margin Collums */}
            {/* Item Content */}
            <div className="col-md-8 content-wrap bg1">
                {/* Section title */}
                <h2 className="section-title">
                    {name}
                </h2>
                {/* /Section title */}
            </div>
            {/* Item Content */}
            {/* Margin Collum*/}
            <div className="col-md-1 bg1 timeline-space hidden-sm hidden-xs" />
            {/* Margin Collum*/}
        </div>
        {/* SECTION TITLE */}
    </>
}

export default TimeLineHeader
