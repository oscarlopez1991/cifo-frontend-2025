import { useState } from 'react'

const CommentForm = ({ storyId, onAddComment }) => {
  // TODO #7
  // Fes servir el hook adequat per gestionar un estat amb nom `text`.

  // TODO #8
  // Implementa aquesta funció per tal que:
  // 1) eviti que es refresqui la pàgina (és el que voldrà fer el formulari per defecte),
  // 2) comprovi que l'estat text no és buit,
  // 3) si no ho és:
  // 3.1) faci servir la funció rebuda com a prop en aquest component per afegir el comentari,
  // 3.2) deixi de nou buit el quadre de text.
  const onSubmit = (e) => {}

  return (
    <form onSubmit={onSubmit}>
      {/* TODO #9
      /// Un dels quatre atributs d'aquest input té un problema evident que cal arreglar. */}
      <input type='text' placeholder='Join the conversation' value='text' onChange={(e) => setText(e.target.value)} />
      <input type='submit' value='Say it' className='btn btn-block' />
    </form>
  )
}

export default CommentForm
