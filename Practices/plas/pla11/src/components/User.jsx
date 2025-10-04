const User = ({ name, avatar, isPremium }) => {
  return (
    <div className={`user ${isPremium ? 'premium' : ''}`}>
      <img src={avatar} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default User
