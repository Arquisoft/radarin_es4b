import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class GeoMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latGeo: "",
      lonGeo: ""
    }
  }


  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({
        latGeo: position.coords.latitude,
        lonGeo: position.coords.longitude
      });
    }.bind(this))
  }

  componentDidMount() {
    this.getCurrentLocation();
  }
  showMarkers = () => {
    return this.props.marks.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }}
        onClick={() => console.log("Clicked")} />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{
          lat: this.state.latGeo,
          lng: this.state.lonGeo
        }}>
        {this.showMarkers()}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU"
})(GeoMap);