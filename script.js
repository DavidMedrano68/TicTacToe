const playerFactory = (name,symbol,turn)=>{
    return{name,symbol,turn}
}

const gameBoard = (()=>{
    let winner = null;
    let turns = 0;
    let board = [1,2,3,4,5,6,7,8,9]
    const winningCombo =[
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ]
    const player1 = playerFactory('player1','X',true)
    const player2 = playerFactory('player2','O',false)
    const makeMove = (()=>{
        const tiles = document.querySelectorAll('.tile')
    
        tiles.forEach(tile=>{
            tile.addEventListener('click',(e)=>{
                if(e.target.classList.contains('fa-solid')){
                    return
                }
                if(player1.turn == true && gameBoard.winner === null
                    && e.target.innerHTML == ''){
                        e.target.innerHTML='<i class="fa-solid fa-x fa-3x"></i>'
                        board[e.target.id] = player1.symbol;
                        player1.turn = false;
                        player2.turn = true;
                    }
                else if(player2.turn == true && gameBoard.winner === null
                    && e.target.innerHTML == ''){
                        e.target.innerHTML = '<i class="fa-solid fa-o fa-3x"></i>'
                        board[e.target.id] = player2.symbol;
                        player2.turn = false;
                        player1.turn = true;
                    }
                else{
                    return
                }
                checkWin()
                
        })
        
    })
    })();
    const clearGameBoard = ()=>{
        const tiles = document.querySelectorAll('.tile')
        tiles.forEach(tile=>{
            tile.innerHTML = ''
            
        })
            board = [1,2,3,4,5,6,7,8,9]
            gameBoard.winner = null
            turns = 0
            player1.turn = true
            player2.turn = false
            const winningDisplay = document.querySelector('.winningDisplay')
            winningDisplay.style.visibility = 'hidden'

    }
    const checkWin = ()=>{
        turns++ 
        if(winningCombo.some(combo=>{
            return combo.every(index=>{
               return board[index] =='X'
            })
        })){
            gameBoard.winner = true
            displayControl('X')
            

        }else if(winningCombo.some(combo=>{
            return combo.every(index=>{
               return board[index] =='O'
            })
        })){
            gameBoard.winner = true
            displayControl('O')
        }else if(turns >= 9){
            console.log('nobody won')
            displayControl('Nobody')
        }
    }
    const displayControl = (playerWon)=>{
        const winningDisplay = document.querySelector('.winningDisplay')
        const message = document.querySelector('.message')
        winningDisplay.style.visibility = 'visible'
        message.textContent = `${playerWon} has Won`
        const resetBtn = document.querySelector('.reset')
        resetBtn.addEventListener('click',clearGameBoard)
    };
    
    
    return{turns,winner,board,makeMove}
})();