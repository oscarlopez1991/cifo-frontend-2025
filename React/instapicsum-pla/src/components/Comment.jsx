const Comment = ({ author, text }) => {
  return (
    <div>
      {/* TODO #6
      /// Una de les dues línies següents presenta un problema evident que cal arreglar. */}
      <p className='comment-author'>{author} said:</p>
      <p className='comment-text'>text</p>
    </div>
  )
}

export default Comment
