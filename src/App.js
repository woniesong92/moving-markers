import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import Pin from "./Pin";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Dev Only Token
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid29uaWVzb25nOTIiLCJhIjoiY2p2cmt1Zmd0MnZvNTQwb2lsNmt0bjZvMCJ9.9plSZqfZivrZnFocBn_d8w";

const mockLocations = [
  {
    latitude: 37.7577,
    longitude: -122.4376
  },
  {
    latitude: 37.790001,
    longitude: -122.39994
  },
  {
    latitude: 37.775471,
    longitude: -122.417877
  },
  {
    latitude: 37.770278,
    longitude: -122.435801
  },
  {
    latitude: 37.769464,
    longitude: -122.453303
  },
  {
    latitude: 37.763222,
    longitude: -122.418985
  },
  {
    latitude: 37.748835,
    longitude: -122.438203
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: mockLocations[0].latitude,
        longitude: mockLocations[0].longitude,
        zoom: 12
      },
      locations: []
    };
  }

  fetchLocations = () => {
    this.setState({
      locations: [...mockLocations]
    });
  };

  // 3. Move location
  // in a random direction with random distance (delta * dice)
  _moveLocation(loc, delta) {
    const dice = Math.random();
    const distance = dice * delta;

    if (dice < 0.25) {
      return {
        latitude: loc.latitude + distance,
        longitude: loc.longitude - distance
      };
    }
    if (dice < 0.5) {
      return {
        latitude: loc.latitude + distance,
        longitude: loc.longitude + distance
      };
    }
    if (dice < 0.75) {
      return {
        latitude: loc.latitude - distance,
        longitude: loc.longitude + distance
      };
    }

    return {
      latitude: loc.latitude - distance,
      longitude: loc.longitude - distance
    };
  }

  startMovingLocations = opts => {
    const { delta, interval } = opts;

    setInterval(() => {
      const { locations } = this.state;
      const newLocations = locations.map(loc => {
        return this._moveLocation(loc, delta);
      });

      this.setState({ locations: newLocations });
    }, interval);
  };

  componentDidMount() {
    // 1. Get Location data
    this.fetchLocations();
  }

  componentDidUpdate(_, prevState) {
    // 2. Wait until location data is populated and
    // start moving locations little by little
    const areLocationsPopulated =
      this.state.locations.length > prevState.locations.length;
    if (areLocationsPopulated) {
      this.startMovingLocations({
        delta: 0.001,
        interval: 500
      });
    }
  }

  onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  render() {
    const { locations } = this.state;

    return (
      <div className="map-container">
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.onViewportChange(viewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="100%"
          height="100%"
        >
          {locations.map((loc, idx) => {
            const { latitude, longitude } = loc;

            return (
              <Marker
                key={`marker-${idx}`}
                latitude={latitude}
                longitude={longitude}
              >
                <Pin size={20} />
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
