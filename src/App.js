import React from "react";
import "./App.css";
function createIntList(lowEnd, highEnd) {
  var list = [];
  for (var i = lowEnd; i <= highEnd; i++) {
    list.push(i);
  }
  return list;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends React.Component {
  componentDidMount() {
    /*var platform = new window.H.service.Platform({
      apikey: "xvlc89gyofVmXiiJsi3ZT8kLQHWYXwVTBkOFLRYdFWk"
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();
    var defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    var map = new window.H.Map(
      document.getElementById("mapContainer"),
      maptypes.vector.normal.map,
      {
        zoom: 12,
        center: { lng: 9.9937, lat: 53.5511 }
      }
    );

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = "/img/lorry.svg";

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new window.H.map.Icon(svgMarkup, { size: { w: 32, h: 32 } }),
      coords = { lat: 53.5511, lng: 9.9937 },
      marker = new window.H.map.Marker(coords, { icon: icon });

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);

    var ui = window.H.ui.UI.createDefault(map, defaultLayers, "de-DE");*/
    this.interval = setInterval(() => {
      const BASE_URL = "http://localhost:5000";
      fetch(BASE_URL + "/trucks").then(response => {
        response.json().then(trucks => {
          this.setState({ trucks });
        });
      });

      fetch(BASE_URL + "/timeSlots").then(response => {
        response.json().then(timeSlots => {
          console.log(timeSlots);
          this.setState({ timeSlots });
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  state = {
    trucks: {},
    timeSlots: {}
  };
  /*
  <div
    style={{ width: "100vw", height: "100vh" }}
    id="mapContainer"
  ></div>*/

  render() {
    const { trucks, timeSlots } = this.state;
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <th>Truck</th>
              <th>Container</th>
              <th>Slot Time</th>
              <th>Estimated Arrival Time</th>
            </tr>
            {Object.keys(trucks).map(truckId => {
              var dist =
                parseInt(trucks[truckId].timeSlot) -
                parseInt(trucks[truckId].arrivalTime);
              console.log(dist);
              return (
                <tr key={truckId}>
                  <td>{truckId}</td>
                  <td>{trucks[truckId].containerId}</td>
                  <td>
                    {new Date(trucks[truckId].timeSlot * 1000).toUTCString()}
                  </td>
                  <td
                    className={`${dist < -900 ? "truck-warn" : "truck-fine"}`}
                  >
                    {new Date(trucks[truckId].arrivalTime * 1000).toUTCString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>TimeSlot</th>
              <th>Scheduled Truck</th>
            </tr>
            {Object.keys(timeSlots).map(timeSlot => {
              return (
                <tr key={timeSlot}>
                  <td>{new Date(timeSlot * 1000).toUTCString()}</td>
                  <td>{timeSlots[timeSlot]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
