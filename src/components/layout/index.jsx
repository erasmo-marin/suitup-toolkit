import React from "react";
import { isArray, isObject, without, findIndex } from "lodash/fp";
import { EventEmitter } from "fbemitter";
import classnames from "classnames";
import suitupable from "../component";

class ModalMountController extends EventEmitter {

    constructor(args) {
        super(args);
        this.modals = [];
        this.changeEvent = "modalsChanged";
        this.requestModalUpdate = ::this.requestModalUpdate;
        this.requestModalMount = ::this.requestModalMount;
        this.requestModalUnmount = ::this.requestModalUnmount;
    }

    requestModalMount(component) {
        this.modals.push(component);
        this.emitChange(this.modals);
    }

    requestModalUpdate(component) {
        this.modals[findIndex({key: component.key}, this.modals)] = component;
        this.emitChange(this.modals);
    }

    requestModalUnmount(component) {
        this.modals = without(component, this.modals);
        this.emitChange(this.modals);
    }

    emitChange(modals) {
        this.emit(this.changeEvent, modals);
    }

    onModalsChange(callback) {
        return this.addListener(this.changeEvent, callback);
    }
} 

const modalMountController = new ModalMountController();
const requestModalMount = modalMountController.requestModalMount;
const requestModalUnmount = modalMountController.requestModalUnmount;
const requestModalUpdate = modalMountController.requestModalUpdate;

@suitupable(true, true)
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.onModalsChange = ::this.onModalsChange;
        this.modalsController = modalMountController;
        this.state = {
            modals: []
        }
    }

    componentDidMount() {
        this.findHeader(this);
        this.modalsMountListener = modalMountController.onModalsChange(this.onModalsChange);
    }

    componentWillUnmount() {
        this.modalsMountListener.remove();
    }

    onModalsChange() {
        this.setState({
            modals: this.modalsController.modals
        });
    }

    findHeader(x) {
        if (!x || !x.props) return;
        if (x.type && (x.type.name == "Header" || x.type.name == "Component(Header)")) {
            this.setState({
                header: x
            });
            return;
        }  

        React.Children.forEach(x.props.children, (x) => {
            if (x.type && (x.type.displayName == "Header" || x.type.displayName == "Component(Header)")) {
                this.setState({
                    header: x
                });
                return;
            }
            this.findHeader(x);
        });
    }

    render() {
        let { children, screen, settings, ...rest } = this.props;
        let classes = classnames({
            layout: true,
            "fixed-header": this.state.header && this.state.header.props.fixed ? true : false,
            [`is-${screen}`]: true
        });

        return (
            <div>
                <div {...rest} className={classes} id="layout">
                    {children}
                </div>
                <div className="modal-mount-point">
                    {this.state.modals}
                </div>
            </div>
        );
    }
}

export { Layout, requestModalMount, requestModalUnmount, requestModalUpdate };
export default Layout;