import React, { Component } from "react";
import MenuLinks from "./MenuLink";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this._menuToggle = this._menuToggle.bind(this);
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick, false);
    }
    _handleDocumentClick(e) {
        if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
            this.setState({
                isOpen: false
            });
        };
    }
    _menuToggle(e) {
        e.stopPropagation();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        let menuStatus = this.state.isOpen ? 'isopen' : '';
        let menuStatusCustom = this.state.isOpen ? 'open' : 'close';
        let menuStatusCustom2 = this.state.isOpen ? 'close' : 'open';

        return (
            <div ref="root">
                <div className="menubar">
                    <div className="hambclicker" onClick={this._menuToggle}></div>
                    {/* <div id="hambmenu" className={menuStatus}><span></span><span></span><span></span><span></span></div> */}
                    <div id="hambmenu"><i className={`fa fa-bars ${menuStatusCustom2}`} aria-hidden="true"></i>
                    <i className={`fa fa-arrow-circle-o-left ${menuStatusCustom}`} aria-hidden="true"></i>
                    </div>
                    <div className="title">
                        <span>{this.props.title}</span>
                    </div>
                </div>
                <MenuLinks menuStatus={menuStatus} history={this.props.history} />
            </div>
        )
    }
}
export default Menu;