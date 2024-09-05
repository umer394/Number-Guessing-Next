"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState,useEffect,ChangeEvent } from "react";

interface NumberGuessingState {
    gameStarted:boolean
    gameOver:boolean
    paused:boolean
    targetNumber:number
    userGuess:number|string
    attempts:number
}

export default function NumberGuessing(){
    const [gameStarted,setGameStarted] = useState<boolean>(false)
    const [gameOver,setGameOver] = useState<boolean>(false)
    const [paused,setPaused] = useState<boolean>(false)
    const [targetNumber,setTrgetNumber] = useState<number>(0)
    const [userGuess,setUserGuess] = useState<number|string>("")
    const [attempts,setAttempts] = useState<number>(0)

    useEffect(()=>{
        if(gameStarted && !paused){
            const randomNumber = Math.floor(Math.random() * 10 ) + 1;
            setTrgetNumber(randomNumber)
        }
    },[gameStarted,paused])

    const handleStartGame = ():void =>{
        setGameStarted(true)
        setGameOver(false)
        setAttempts(0)
        setPaused(false)
    }

    const handlePaussedGame = ():void=>{
        setPaused(true)
    }

    const handleResumeGame = ():void=>{
        setPaused(false)
    }

    const handleGuess = ():void =>{
        if(typeof targetNumber === "number" && userGuess === targetNumber){
            setGameOver(true)
        }else{
            setAttempts(attempts + 1)
        }
    }

    const handleTryAgain = ():void =>{
        setGameStarted(false)
        setGameOver(false)
        setUserGuess("")
        setAttempts(0)
    }

    const handleUserGuessChange =(e:ChangeEvent<HTMLInputElement>):void =>{
        setUserGuess(parseInt(e.target.value))
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-black">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-black text-center font-bold text-3xl mb-2">Number Guessing</h1>
                <p className="text-black text-center mb-4">Try to Guess the number between 1 and 10!</p>
                {!gameStarted && (
                    <div className="flex justify-center mb-4">
                        <Button
                            onClick={handleStartGame}
                            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Game
                        </Button>
                    </div>
                )}
                {gameStarted && !gameOver && (
                    <div >
                        <div className="flex justify-center mb-4">{paused ?(
                            <Button
                            onClick={handleResumeGame}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >Resume</Button>
                        ):(
                            <Button
                            onClick={handlePaussedGame}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >Pause</Button>
                        )}</div>
                        <div className="flex justify-center mb-4">
                            <Input
                            type="number"
                            value={userGuess}
                            onChange={handleUserGuessChange}
                            placeholder="Enter your guess"
                            className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs text-black"
                            />
                            <Button
                            onClick={handleGuess}
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
                            >Guess</Button>
                        </div>
                        <div className="text-black text-center">
                            <p>Attempts:{attempts}</p>
                        </div>
                    </div>
                )}
                {gameOver && (
                    <div>
                        <div className="text-center mb-4 text-black">
                            <h2 className="text-2xl font-bold">Game Over!</h2>
                            <p>You guessed the number in {attempts} attempts.</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                            onClick={handleTryAgain}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >Try Again</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}