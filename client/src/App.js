import React from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:5000")

const App = () => {
  return (
    <div className="App">
      <h1>Hello New Chat app</h1>
    </div>
  )
}

export default App
