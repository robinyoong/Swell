import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import Collection from "../display/Collection.jsx";
import collectionsController from "../../controllers/collectionsController";

const mapStateToProps = (store) => ({
  collections: store.business.collections,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFromCollection: (collection) => {
    dispatch(actions.deleteFromCollection(collection));
  },
  collectionToReqRes: (reqResArray) => {
    dispatch(actions.collectionToReqRes(reqResArray));
  },
});

class CollectionsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log("props ->", this.props.collections);
    collectionsController.importCollection(this.props.collections);
  }

  render() {
    const collectionComponents = this.props.collections.map(
      (collection, idx) => {
        return (
          <Collection
            content={collection}
            key={idx}
            deleteFromCollection={this.props.deleteFromCollection}
            collectionToReqRes={this.props.collectionToReqRes}
          />
        );
      }
    );

    return (
      <div className="collections-container">
        <h1 className="collection-heading">Collections</h1>
        <div className="collection-import-container">
          <button className="import-collections" onClick={this.handleClick}>
            Import Collection
          </button>
        </div>
        <div className="collections">
          {collectionComponents}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
