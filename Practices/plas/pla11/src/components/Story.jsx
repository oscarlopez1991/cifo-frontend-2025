import Comment from './Comment'
import CommentForm from './CommentForm'
import Picture from './Picture'

const Story = ({ storyId, photo, author, timestamp, comments, onAddComment }) => {
  return (
    <div className='story'>
      <Picture photo={photo} author={author} timestamp={timestamp} />
      {/* TODO #13
      /// Fes un map sobre l'array comments per tal que per cada comentari
      /// es mostri un component Comment amb les props que necessiti. */}
      <CommentForm storyId={storyId} onAddComment={onAddComment} />
    </div>
  )
}

export default Story
