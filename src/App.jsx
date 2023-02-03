import { useState } from "react"

export const TURNS = {
  X: 'x',
  O: 'o'
}
const Cuadrado = ({ children, isSelected, updateBoard, index }) => {
 
  const className = `square ${isSelected ? 'is-selected':''}`
 
  const handleClick = () => {
    updateBoard(index)
 }
  return ( 
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board,setBoard] = useState(
    Array(9).fill(null)
    
    )

    const[turn, setTurn]= useState(TURNS.X)

    const updateBoard = (index) => {
      //si tiene algo no actualiza
      if(board[index]) return
      //actualiza tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //cambia turno
      const nuevoTurno= turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(nuevoTurno)
    }

    return (
    <div className='board'>
      <h1>tic tac toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Cuadrado
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Cuadrado>
            )
          })
        }
      </section>
      <section className='turn'>

        <Cuadrado isSelected={turn===TURNS.X}>
          {TURNS.X}
          </Cuadrado>

          <Cuadrado isSelected={turn===TURNS.O}>
          {TURNS.O}
          </Cuadrado>

      </section>
    </div>
  )
}

export default App
