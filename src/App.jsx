import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()_+-=[]{}/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <div className="card">
        <input 
          type="text"
          value={password}
          className="password-input"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef} 
        />
        <button onClick={copyPasswordToClip} className="button">
          Copy
        </button>
      </div>
      <div className="checkbox-group">
        <label>
          <input 
            type="range" 
            min={6} 
            max={100} 
            className="slider" 
            value={length} 
            onChange={(e) => setLength(e.target.value)}
          />
          Length: {length}
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)} 
          />
          Include Numbers
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)} 
          />
          Include Special Characters
        </label>
      </div>
    </div>
  );
}

export default App;
