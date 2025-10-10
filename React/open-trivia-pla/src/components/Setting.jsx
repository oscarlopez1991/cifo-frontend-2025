import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

const Setting = ({ property, text, first, second }) => {
  const { settings, updateSetting } = useContext(SettingsContext);

  return (
    <div className="setting">
      <p>{text}</p>
      <button
        onClick={(e) => updateSetting(property, e.target.textContent)}
        className={settings[property] === first ? "btn-selected" : ""}
      >
        {first}
      </button>
      {/* TODO #8
      /// Afegeix el segon botó de cada Setting perquè es mostri i funcioni com al vídeo. */}
      <button
        onClick={(e) => updateSetting(property, e.target.textContent)}
        className={settings[property] === second ? "btn-selected" : ""}
      >
        {second}
      </button>
    </div>
  );
};

export default Setting;
