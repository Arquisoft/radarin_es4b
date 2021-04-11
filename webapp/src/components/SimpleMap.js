import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '70%',
  height: '100%'
};

export class MapContainer extends Component {

  showMarkers = () => {
    return this.props.marks.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }}
        text={store.nombre}
        onClick={() => console.log("Clicked")} />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.props.zoom}
        style={mapStyles}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lon,
        }}
        center={{
          lat: this.props.lat,
          lng: this.props.lon
        }}>
        {this.showMarkers()}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU"
})(MapContainer);
