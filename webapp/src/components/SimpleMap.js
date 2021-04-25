import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import data from "@solid/query-ldflex";


const mapStyles = {
  width: '70%',
  height: '100%'
};


const webId = sessionStorage.getItem("webId");
const image = data[webId].vcard_hasPhoto;

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selected: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selected: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  showMarkers = () => {
    return this.props.marks.map((store, index) => {
      return <Marker key={index} id={index} name={store.nombre} icon={{
        url: "/img/defaultUser.png",
        scaledSize: new this.props.google.maps.Size(42, 42)
      }}
        position={{
          lat: store.lat,
          lng: store.lng
        }}
        title={store.nombre}
        onClick={this.onMarkerClick}
      />

    })
  }

  render() {
    return (
      <Map onClick={this.onMapClicked}
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
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selected.name}</h3>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU"
})(MapContainer);
