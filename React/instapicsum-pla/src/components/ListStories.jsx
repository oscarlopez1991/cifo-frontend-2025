import Story from './Story'

// TODO #0
// No cal fer res aquí.
// Però observa que la línia següent ens marca quines props espera rebre aquest component.
// Aquest coneixement ens serà imprescindible des d'altres punts de l'aplicació.
const ListStories = ({ stories, onAddComment }) => {
  return (
    <div className='list-stories'>
      {stories.map((story) => (
        <Story
          key={story.id}
          storyId={story.id}
          photo={story.picture}
          author={story.username}
          timestamp={story.timestamp}
          comments={story.comments}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  )
}

export default ListStories
