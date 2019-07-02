import React, { Component } from "react";
import "./style.css";
class SelectSearch extends Component {
  state = {
    options: this.props.properties.options,
    selectedValue: this.props.properties.selectedValue,
    name: this.props.name,
    searchValue: ""
  };
  timer = null;
  DOMElement = {
    _items: null,
    _searchContainer: null,
    _searchInput: null,
    _textContainer: null,
    _dropdownSearch: null
  };
  dropdownOpen = event => {
    this.popupPosition();
    this.closeDropdown(event);
    this.DOMElement._searchContainer.style.display = "block";
    this.DOMElement._textContainer.style.display = "none";
    this.DOMElement._items.style.display = "block";
    this.DOMElement._searchInput.focus();
    window.onresize = event => {
      this.popupPosition(event);
    };
    window.onscroll = event => {
      this.popupPosition(event);
    };
  };
  dropdownItemSelect = selectedValue => {
    this.setState({ selectedValue: selectedValue });
    this.DOMElement._searchContainer.style.display = "none";
    this.DOMElement._textContainer.style.display = "block";
    this.props.onOptionSelect(selectedValue);
  };
  clearSearch = e => {
    this.setState({ selectedValue: "" });
    this.setState({ options: this.props.properties.options });
    this.DOMElement._searchContainer.style.display = "block";
    this.DOMElement._searchContainer.focus();
    this.DOMElement._textContainer.style.display = "none";
    this.DOMElement._searchInput.value = "";
    this.DOMElement._items.style.display = "block";
    this.props.onOptionSelect("");
    e.persist();
  };

  filterOption = event => {
    let title = "";
    let searchValue = this.DOMElement._searchInput.value;
    clearTimeout(this.timer);
    if (this.props.properties.options.length > 0) {
      let filterList = this.props.properties.options.filter(item => {
        title = item.name;
        return title
          .toLocaleLowerCase()
          .startsWith(searchValue.toLocaleLowerCase());
      });
      this.setState({ options: filterList });
    }
    //}, 500);

    event.persist();
  };
  popupPosition = event => {
    var mainContainer = this.props.mainContainer
      ? this.props.mainContainer
      : document.getElementsByTagName("body")[0];
    var mainContainerHeight = mainContainer.clientHeight;
    var element = this.DOMElement._dropdownSearch;
    if (element) {
      var elementTopPosition = element.getBoundingClientRect().y;
      var midHeight = mainContainerHeight / 2;
      var optionsContainerHeight = this.state.options.length * 42;
      var popupContainerHeight =
        optionsContainerHeight > midHeight - 45
          ? midHeight - 45
          : optionsContainerHeight;
      var popopStartPosition =
        midHeight > elementTopPosition ? 0 : "-" + popupContainerHeight;
      this.DOMElement._items.style.height = popupContainerHeight + "px";
      var popopTopPosition = midHeight > elementTopPosition ? "100%" : "0px";
      this.DOMElement._items.style.top = popopTopPosition;
      //document.getElementById(this.props.name + "_items").style.top =
      //popopStartPosition + "px";
      this.DOMElement._items.style.transform =
        "translate3d(2px," + popopStartPosition + "px, 0px)";
      var boxShadow = (this.DOMElement._items.style["boxShadow"] =
        "2px 2px 4px #999");
      var arrBoxShadow = boxShadow.split(" ");
      if (arrBoxShadow && arrBoxShadow.length == 4) {
        this.DOMElement._items.style["boxShadow"] =
          arrBoxShadow[0] +
          " " +
          (midHeight > elementTopPosition ? "" : "-") +
          arrBoxShadow[1] +
          " " +
          arrBoxShadow[2] +
          " " +
          arrBoxShadow[3];
      }
    }
  };
  setSearchOptionState = nextProps => {
    if (nextProps.properties.selectedValue !== "") {
      this.DOMElement._searchContainer.style.display = "none";
      this.DOMElement._textContainer.style.display = "block";
    } else {
      this.DOMElement._searchContainer.style.display = "block";
      this.DOMElement._textContainer.style.display = "none";
    }
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ selectedValue: nextProps.properties.selectedValue });
    this.setSearchOptionState(nextProps);
  };
  closeDropdown = event => {
    var k,
      textContainers = document.getElementsByClassName("textContainer");
    for (k = 0; k < textContainers.length; k++) {
      var textContainer = textContainers[k];
      textContainer.style.display = "block";
    }
    var j,
      searchContainers = document.getElementsByClassName("searchContainer");
    for (j = 0; j < searchContainers.length; j++) {
      var searchContainer = searchContainers[j];
      searchContainer.style.display = "none";
    }
    var i,
      dropdowns = document.getElementsByClassName("item-container");
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (
        openDropdown.style.display === "block" &&
        !event.target.matches(".searchInput")
      ) {
        openDropdown.style.display = "none";
      }
    }
  };
  componentDidMount = () => {
    this.DOMElement._items = document.getElementById(
      this.props.name + "_items"
    );
    this.DOMElement._searchContainer = document.getElementById(
      this.props.name + "_searchContainer"
    );
    this.DOMElement._searchInput = document.getElementById(
      this.props.name + "_searchInput"
    );
    this.DOMElement._textContainer = document.getElementById(
      this.props.name + "_textContainer"
    );
    this.DOMElement._dropdownSearch = document.getElementById(
      this.props.name + "_dropdownSearch"
    );
    this.setSearchOptionState(this.props);
    this.popupPosition();

    window.onclick = event => {
      if (
        !event.target.matches(".dropdown") &&
        !event.target.matches(".textContainer") &&
        !event.target.matches(".searchInput") &&
        !event.target.matches(".clearSearch") &&
        !event.target.matches(".dropdown-btn") &&
        !event.target.matches(".selectedItemText")
      ) {
        this.closeDropdown(event);
      }
    };
  };
  render() {
    return (
      <div
        id={this.props.name + "_dropdownSearch"}
        className="hc dropdown"
        tabIndex="0"
        onClick={event => this.dropdownOpen(event)}
        // onKeyUp={this.filterOption}
      >
        <div className="textContainer" id={this.props.name + "_textContainer"}>
          <div
            className="selectedItemText"
            id={this.props.name + "_selectedItemText"}
          >
            {this.state.selectedValue}
          </div>
          &nbsp;
          {this.state.selectedValue !== "" && (
            <div
              id={this.props.name + "_clearSearch"}
              className="clearSearch"
              onClick={event => {
                this.clearSearch(event);
              }}
            >
              X
            </div>
          )}
          {this.state.selectedValue === "" && (
            <button
              id={this.props.name + "_dropdown-btn"}
              aria-haspopup="true"
              aria-expanded="true"
              type="button"
              className="btn-font dropdown-toggle dropdown-btn"
              onClick={event => this.dropdownOpen(event)}
            />
          )}
        </div>
        <div
          className="searchContainer"
          id={this.props.name + "_searchContainer"}
        >
          <input
            type="text"
            id={this.props.name + "_searchInput"}
            className="searchInput"
            onChange={this.filterOption}
            autoComplete="off"
          />
          <button
            id={this.props.name + "_dropdown-btn"}
            aria-haspopup="true"
            aria-expanded="true"
            type="button"
            className="dropdown-toggle dropdown-btn"
            onClick={event => this.dropdownOpen(event)}
          />
        </div>
        <div
          id={this.props.name + "_items"}
          className="item-container"
          tabIndex="-1"
          style={{ display: "block !important" }}
        >
          {this.state.options.map((item, key) => (
            <div
              key={item[this.props.properties.optionValueKey]}
              className="item"
              onClick={() =>
                this.dropdownItemSelect(
                  item[this.props.properties.optionValueKey]
                )
              }
            >
              {item[this.props.properties.optionDisplayNameKey]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SelectSearch;
