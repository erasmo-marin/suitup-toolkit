import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import suitupable from "../component";
import { NavLink as Link } from "react-router-dom";

@suitupable(true, true)
class MenuSubItem extends React.PureComponent {

    static contextTypes = {
        hide: PropTypes.func
    }

    shouldHide = () => {
        if(this.props.hideOnRedirect && this.context.hide) {
            this.context.hide();
        }
    }

    render() {
        let { active, hideOnRedirect, text, href, screen, settings, ...rest } = this.props;
        const subItemClasses = classnames({active});

        const content = (
            <div {...rest} className="menu-sub-item">
                <Choose>
                    <When condition={text}>
                        <span>{text}</span>
                    </When>
                    <Otherwise>
                        {children}
                    </Otherwise>
                </Choose>
            </div>
        );

        return (
            <Choose>
                <When condition={href}>
                    <Link exact to={href} activeClassName="active" className={subItemClasses} onClick={this.shouldHide}>
                        {content}
                    </Link>
                </When>
                <Otherwise>
                    <div className={subItemClasses}>
                        {content}
                    </div>
                </Otherwise>
            </Choose>
        );
    }
}

export default MenuSubItem;
