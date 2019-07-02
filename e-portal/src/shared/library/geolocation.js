export const GeoLocation = location => {
  const showPosition = position => {
    location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location = {
      longitude: -1,
      latitude: -1
    };
  }
};
