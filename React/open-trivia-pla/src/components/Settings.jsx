import Setting from "./Setting";

const Settings = () => {
  return (
    <div className="content container">
      <Setting
        property="number"
        text="Number of questions"
        first="6"
        second="12"
      />
      {/* TODO #9
      /// Afegeix un nou element que permeti a l'usuari triar la categoria de les preguntes a mostrar. */}
      <Setting
        property="category"
        text="Category"
        first="Sports"
        second="Geography"
      />
      <Setting
        property="difficulty"
        text="Difficulty"
        first="Easy"
        second="Hard"
      />
    </div>
  );
};

export default Settings;
