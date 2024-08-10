const BASE_URL = "https://static.neshan.org";
const DEFAULT_URL = `${BASE_URL}/sdk/leaflet/1.4.0/leaflet.js`;

// eslint-disable-next-line
export default (props) => {
  const createScript = () => {
    const { onLoad } = props;
    const script = document.createElement("script");

    script.src = DEFAULT_URL;

    script.onload = () => {
      if (onLoad) onLoad();
      return;
    };


    document.body.appendChild(script);
  };

  return createScript();
};
