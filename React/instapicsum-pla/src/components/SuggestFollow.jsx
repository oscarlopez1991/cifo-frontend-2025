import User from './User'

const SuggestFollow = ({ users }) => {
  return (
    <div className='suggest-follow'>
      {users.map((user) => (
        // TODO #14
        // Mirant la definició del component User veuràs que aquí falta passar-li dues props molt importants.
        <User key={user.username} name={user.username} />
      ))}
    </div>
  )
}

export default SuggestFollow
