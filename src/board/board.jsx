import './board.css'
import React, {useState, useEffect} from 'react';
import queen from './queen.png'

const checkVerAbo = (board, row, col) => {
  for(var i = row - 1; i >= 0; i--) {
    if(board[i][col] === 1) {
      return true
    }
  }
  return false;
}

const checkVerBel = (board, row, col) => {
  for(var i = row + 1; i < board.length; i++) {
    if(board[i][col] === 1) {
      return true
    }
  }
  return false;
}

const checkMajDiaL = (board, row, col) => {
  for(var i = row - 1; i >= 0; i--) {
    col--
    if(board[i][col] === 1) {
      return true
    }
    if(col < 0) {
      return false;
    }
  }
  return false
}

const checkMajDiaR = (board, row, col) => {
  for(var i = row + 1; i < 8; i++) {
    col++
    if(board[i][col] === 1) {
      return true
    }
    if(col > 7) {
      return false
    }
  }
  return false
}

const checkMinDiaL = (board, row, col) => {
  for(var i = row + 1; i < 8; i++) {
    col--
    if(board[i][col] === 1) {
      return true
    }
    if(col < 0) {
      return false;
    }
  }
  return false
}

const checkMinDiaR = (board, row, col) => {
  for(var i = row - 1; i >= 0; i--) {
    col++
    if(board[i][col] === 1) {
      return true
    }
    if(col > 7) {
      return false
    }
  }
  return false
}

const Board = () => {

  const [board, setBoard] = useState([
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
])
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [lastRow, setLastRow] = useState(0);

  const handleNextPeice = () => {
    let placed = false;
    for(var i = lastRow + 1; i < board.length; i++) {
      for(var j = 0; j < 8; j++) {
        if(!checkVerAbo(board, i, j) && !checkVerBel(board, i, j) && !checkMajDiaL(board, i, j) && !checkMajDiaR(board, i, j) && !checkMinDiaL(board, i, j) && !checkMinDiaR(board, i, j) && board[i].indexOf(1) === -1) {
          board[i][j] = 1;
          setBoard([...board]);
          setLastRow(i);
          placed = true;
          break;
        }
      }
      while(!placed && !done) {
        board[i][board[i].indexOf(1)] = 0;
        i--;
        for(var j = board[i].indexOf(1) + 1; j < 8; j++) {
          if(!checkVerAbo(board, i, j) && !checkVerBel(board, i, j) && !checkMajDiaL(board, i, j) && !checkMajDiaR(board, i, j) && !checkMinDiaL(board, i, j) && !checkMinDiaR(board, i, j)) {
            board[i][board[i].indexOf(1)] = 0;
            board[i][j] = 1;
            setBoard([...board]);
            setLastRow(i);
            placed = true;
            break;
          }
        }
      }
      break;
    }
  }

  const startBoard = () => {
    board[0][0] = 1;
    setBoard([...board]);
    setStarted(true);
  }

  const resetBoard = () => {
    setBoard([
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ])
    setStarted(false);
    setLastRow(0);
    setDone(false);
  }

  useEffect(() => {
    let sum = 0;
    for(var i = 0; i < board.length; i++) {
      if(board[i].indexOf(1) !== -1) {
        sum++
      }
    }
    if(sum === 8) {
     setDone(true);
    }
  }, [board])

  return (
    <div>
      <div id='board'>
        {board.map((row, irow) => {
          return <div class='row'>
            {row.map((col, icol) => {
            if(irow % 2 === 0) {
              if(icol % 2 === 0) {
                if(board[irow][icol] === 1) {
                  return (<div class='white queen'><img src={queen} alt='queen'></img></div>)
                } else if (board[irow][icol] !== 1) {
                  return (<div class='white'></div>)
                }
              } else {
                if(board[irow][icol] === 1) {
                  return(<div class='brown queen'><img src={queen} alt='queen'></img></div>)
                } else {
                  return (<div class='brown'></div>)
                }
              }
            }

            if(irow % 2 !== 0) {
              if(icol % 2 === 0) {
                if(board[irow][icol] === 1) {
                  return(<div class='brown queen'><img src={queen} alt='queen'></img></div>)
                } else {
                  return(<div class='brown'></div>)
                }

              } else {
                if(board[irow][icol] === 1) {
                  return (<div class='white queen'><img src={queen} alt='queen'></img></div>)
                }
                return (<div class='white'></div>)
              }
            }
          })}
          </div>
        })}
      </div>
        {started ? <button onClick={resetBoard}>Reset</button> : <button onClick={startBoard}>Start</button>}
        <button disabled={done} onClick={handleNextPeice}>Next</button>
        {done ? <div>All 8 queens placed with no conflicts</div> : ''}
    </div>
  )
}

export default Board