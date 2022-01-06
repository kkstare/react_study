// import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

import './jin.less';

  
    class Square extends React.Component {
        props:any
        state:any
        onClick:any
        render() {
            return (
            <button className="square" onClick={this.props.onClick} style= {this.props.isWin?{color: 'red', fontWeight: 'bold'}:{} } >
                {this.props.value}
            </button>
            );
        }
    }

    class Board extends React.Component {
        state:any
        index:number
        props:any
        constructor(props) {
        super(props);
        this.state = {
            squares: Array(81).fill(null),
            xIsNext: true,
            winArr:null,
            winer:null
        };
        }

        handleClick(i,gameOver) {
            const squares = this.state.squares.slice();
            console.log(this.props)
            if(gameOver){
                console.log("重置棋盘")
                this.resetData()
                return
            }

            if(squares[i]){
                console.error("此处已有落子")
                return
            }else{
                squares[i] = this.state.xIsNext ? 'X' : 'O';
            }
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            },()=>{
                let res = this.judgeWin()
                if(res){
                    this.gameOver(res)
                }
            });
            
        }   

        gameOver(res){  
            this.setState({
                winArr:res.points,
                winer:res.player,
                
            })
        }

        resetData(){
            this.setState({
                winArr:null,
                winer:null,
                squares: Array(81).fill(null),
                xIsNext: true,
            }) 
        }
        judgeWin(){
            let max = 0
            let baseValue
            for (let index = 0; index < this.state.squares.length; index++) {
                // const element = array[index];
                let times = 10
                baseValue = this.state.squares[index]
                //跳过空白
                if(!baseValue){
                    continue
                }

                let countRow = 1
                for (let j = 1; j < times ; j++) {
                    
                    if(Math.floor(index/9) !== (Math.floor((index+j)/9)) ){
                        continue
                    }
                    if(this.state.squares?.[index+j] !== baseValue ){
                        continue
                    }else{
                        countRow++
                    }     
                }

                let countVer = 1
                for (let j = 1; j < times; j++) {
                    if(this.state.squares?.[index+j*9] !== baseValue ){
                        continue
                    }else{
                        countVer++
                    }     
                }

                let countSkew = 1
                for (let j = 1; j < times; j++) {
                    if(this.state.squares?.[index+j*10] !== baseValue ){
                        continue
                    }else{
                        countSkew++
                    }     
                }

                let countSkew2 = 1
                for (let j = 1; j < times; j++) {
                    if(this.state.squares?.[index-j*8] !== baseValue ){
                        continue
                    }else{
                        countSkew2++
                    }     
                }

                max = Math.max(max,countRow,countSkew,countVer,countSkew2)

                //判断最佳的棋形
                let type = countRow==max?"row":(countVer==max?"ver":(countSkew==max?"skew":"skew2"))
                let points = []
                if(max>=5){
                    let step = type=="row"?1:(type=="ver"?9:(type=="skew"?10:-8))
                    for (let j = 0; j < max; j++) {
                        points.push(index + step*j)
                    }
                }

                if(max>=5){
                    return {
                       player:baseValue,
                       points:points
                    }
                }   
            }
            return null
        }

        renderSquare(j) {
            let i = this.index++
            let isWin = this.state.winArr?.includes(i) ? true:false
            let gameOver = this.state.winArr?true:false
            return (
                <Square value={this.state.squares[i]} isWin = {isWin}  onClick={() => this.handleClick(i,gameOver)} />
            );
        }

        render() {
            const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            this.index = 0
            let title = this.state?.winer?this.state?.winer+"获得游戏胜利":""
            return (
                <div>
                <div className="status">{status}</div>
                <div className="title">{title}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                </div>
            );
        }
    }

    class Game extends React.Component {
        render() {
        return (
            <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
            </div>
        );
        }
    }

    // ========================================
    
    ReactDOM.render(
        <Game />,
        document.getElementById('root')
    );
    