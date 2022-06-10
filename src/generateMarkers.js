import randomLatitude from "random-latitude";
import randomLongitude from "random-longitude";

function generateMarkers(amount = 0) {
  const markers = [];

  for (let index = 0; index < amount; index++) {
    markers.push({
      id: `marker-${index}`,
      iconColor: "red",
      position: [randomLatitude(), randomLongitude()]
    });
  }

  return markers;
}

export default generateMarkers;
