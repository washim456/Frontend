import Modal from 'styled-react-modal'

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
`

// export const FancyModalButton() {
//     const [isOpen, setIsOpen] = useState(false)
  
//     function toggleModal(e) {
//       setIsOpen(!isOpen)
//     }
  
//     return (
//       <div>
//         <button onClick={toggleModal}>Click me</button>
//         <StyledModal
//           isOpen={isOpen}
//           onBackgroundClick={toggleModal}
//           onEscapeKeydown={toggleModal}>
//           <span>I am a modal!</span>
//           <button onClick={toggleModal}>Close me</button>
//         </StyledModal>
//       </div>
//     )
//   }

export const CustomModal = ({isOpen, closeFn, children}) => {
    return (
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={closeFn}
          onEscapeKeydown={closeFn}>
          
          <span>I am a modal!</span>
          {children}
          <button onClick={closeFn}>Close me</button>

        </StyledModal>
    )
}