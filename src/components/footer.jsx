import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { children, ...rest } = this.props;

        return (
            <footer {...rest}>
                {children}
            </footer>
        );
    }
}

export default Footer;