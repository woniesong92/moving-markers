import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import Pin from "./Pin";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Dev Only Token
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid29uaWVzb25nOTIiLCJhIjoiY2p2cmt1Zmd0MnZvNTQwb2lsNmt0bjZvMCJ9.9plSZqfZivrZnFocBn_d8w";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }

  onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  render() {
    return (
      <div className="map-container">
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.onViewportChange(viewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="100%"
          height="100%"
        >
          <Marker key={`marker-1`} latitude={37.78} longitude={-122.41}>
            <Pin size={20} />
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
