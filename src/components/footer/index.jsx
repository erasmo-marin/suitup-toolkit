import React from "react";
import suitupable from "../component";

@suitupable(true, true)
class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { children, screen, settings, ...rest } = this.props;

        return (
            <footer {...rest}>
                {children}
            </footer>
        );
    }
}

export default Footer;