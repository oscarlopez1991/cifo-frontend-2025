const Footer = () => {
  return (
    // TODO #2
    // Podem eliminar l'etiqueta footer i simplement retornar els dos paràgrafs?
    // Not directly because a React component must return a single root element.
    // Quina precaució hauríem de tenir si volguéssim fer-ho? (Pista: React.Fragment)
    // --> We could use a React Fragment (`<>...</>`) to wrap the two paragraphs if we wanted to return them without an enclosing `<footer>` or another kind of root tag envolving them.
    <footer>
      <p>Instapicsum by CIFO L'Hospitalet</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero veritatis
        necessitatibus aut aliquam at, exercitationem voluptas voluptates nihil
        doloremque deserunt, nesciunt eius expedita dolor quia pariatur fugit
        beatae? Necessitatibus, beatae.
      </p>
    </footer>
  );
};

export default Footer;
