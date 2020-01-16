import React from "react";

class Clock extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {date_time: props.date || new Date()};
        this.interval = props.interval || 1000;
    }

    tick()
    {
        const myNewState = {date_time: new Date(this.state.date_time.getTime() + this.interval)};
        this.setState(myNewState);
    }

    //ngOnInit
    componentDidMount() {
        this.jsInterval = setInterval(this.tick.bind(this), this.interval);
    }

    //before component die (onDestroy)
    componentWillUnmount() {
        clearInterval(this.jsInterval);
    }

    render() {
        return(
            <div>
                <h1>Hello world</h1>
                <h3>{this.state.date_time.toLocaleString()}</h3>
            </div>
        )
    }
}
export default Clock;
