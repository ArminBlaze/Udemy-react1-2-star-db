import React, { Component } from 'react';

import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";


const NetworkWrapper = (View, getData, onLoad) => {
  return class extends Component {

    // constructor() {
    //   super();
    //   this.onDataLoaded = onLoad.bind(this);
    // }

    state = {
      data: null,
      loading: true,
      error: false,
    }

    componentDidMount() {
      getData()
      .then( (data) => onLoad.call(this, data) )
      .catch(this.onError)
      .finally( () => {
        console.log(this.props)
        this.setState({loading: false})
      })
    }
  
    // onLoad = (data) => {
    //   this.setState({data});
    // }
  
    onError = (err) => {
      console.log(err);
      this.setState({error: true})
    }
  

    render() {
      let {loading, error} = this.state;

      if(loading) return <Spinner />;
      if(error) return <ErrorIndicator />;

      return (
        <View { ...this.props } data={ this.state.data } />
        // React.cloneElement(View, { ...this.props, data: this.state.data })
      )
    }
  }
}

export default NetworkWrapper;