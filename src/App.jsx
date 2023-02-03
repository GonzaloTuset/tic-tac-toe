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

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

function App() {

  const [board,setBoard] = useState(
    Array(9).fill(null)
    
    )

    const [turn, setTurn] = useState(TURNS.X)

    const [winner,setWinner]=useState(null)
    
    const checkWinner=(boardToCheck) => {
      for(const combo of win){
        const [a,b,c] = combo
        if(boardToCheck[a]&&
          boardToCheck[a]===boardToCheck[b] &&
           boardToCheck[a]===boardToCheck[c])
           {
            return boardToCheck[a]
        }
      }
      return null
    }

    const updateBoard = (index) => {
      //si tiene algo no actualiza
      if(board[index] || winner) return
      //actualiza tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //cambia turno
      const nuevoTurno= turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(nuevoTurno)

      const ganador=checkWinner(newBoard)
      if (ganador) {
        setWinner(ganador)
      }
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
