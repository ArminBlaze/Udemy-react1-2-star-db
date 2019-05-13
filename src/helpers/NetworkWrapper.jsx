import React, { Component } from 'react';

import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";


const NetworkWrapper = (View, getData) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false,
    }

    componentDidMount() {
      getData()
      .then(this.onPeopleLoaded)
      .catch(this.onError)
      .finally( () => {
        this.setState({loading: false})
      })
    }
  
    onPeopleLoaded = (data) => {
      console.log(data);
      //когда данные загружены обновляем планету и меняем флаг загрузки, чтобы спрятать спиннер
      this.setState({data});
    }
  
    onError = (err) => {
      console.log(err);
      this.setState({error: true})
    }
  

    render() {
      let {loading, error} = this.state;

      if(loading) return <Spinner />;
      if(error) return <ErrorIndicator />;

      return (
        <View { ...this.props } data={ this.state.data }>
          { this.props.children }
        </View>
      )
    }
  }
}

export default NetworkWrapper;