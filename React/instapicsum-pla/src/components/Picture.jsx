const Picture = ({ photo, author, timestamp }) => {
  const photoTime = new Date(timestamp);
  const today = new Date();
  const diffTime = Math.abs(today - photoTime);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Helper for caption text
  const getCaption = () => {
    switch (diffDays) {
      case 0:
        return `Posted today by ${author}`;
      case 1:
        return `Posted yesterday by ${author}`;
      default:
        return `Posted ${diffDays} days ago by ${author}`;
    }
  };

  return (
    // TODO #11
    // Afegeix la classe de CSS picture on correspongui.
    <div className="picture">
      <figure>
        <img src={photo} alt={`Uploaded by ${author}`} />
        <figcaption>
          {/* TODO #12
          /// Afegeix el contingut de figcaption perquè mostri el següent text:
          /// Posted [n] days ago by [nom autor fotografia]
          /// Pots fer que posi today i yesterday en comptes de "0 days ago" i "1 day ago"? */}
          {getCaption()}
        </figcaption>
      </figure>
    </div>
  );
};

export default Picture;
