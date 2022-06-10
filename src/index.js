import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import "./styles.css";
import ReactLeafletPixiOverlay from "react-leaflet-pixi-overlay";
import generateMarkers from "./generateMarkers";
import "antd/dist/antd.css";
import { Switch } from "antd";

function App() {
  const center = [51.505, -0.091];
  const zoom = 4;
  const [switchsValue, setSwitchsValue] = useState({
    switch1: true,
    switch2: false
  });

  const [markers] = useState({
    t1: generateMarkers(40000),
    t2: generateMarkers(40000)
  });

  function onChangeSwtich1(checked) {
    setSwitchsValue((oldState) => ({ ...oldState, switch1: checked }));
  }

  function onChangeSwtich2(checked) {
    setSwitchsValue((oldState) => ({ ...oldState, switch2: checked }));
  }

  function checkActivatedMarkers() {
    const { switch1, switch2 } = switchsValue;
    const { t1, t2 } = markers;
    if (switch1 && !switch2) {
      return t1;
    } else if (switch2 && !switch1) {
      return t2;
    } else if (switch1 && switch2) {
      return t1.concat(t2);
    }
  }

  return (
    <div>
      <br />
      T1:
      <Switch checked={switchsValue.switch1} onChange={onChangeSwtich1} />
      <br />
      T2:
      <Switch checked={switchsValue.switch2} onChange={onChangeSwtich2} />
      <br />
      <Map center={center} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <ReactLeafletPixiOverlay markers={checkActivatedMarkers()} />
      </Map>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
