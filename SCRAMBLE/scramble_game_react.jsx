import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ScrambleGame() {
  const categories = {
    Esporte: ['soccer', 'basketball', 'tennis', 'golf', 'swimming'],
    Animais: ['dog', 'cat', 'horse', 'tiger', 'lion'],
    Frutas: ['apple', 'banana', 'grape', 'orange', 'melon'],
    Cores: ['red', 'blue', 'green', 'yellow', 'purple']
  };

  const [category, setCategory] = useState('Esporte');
  const [wordList, setWordList] = useState(categories[category]);
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(120);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setWordList(categories[category]);
    setCurrentWord(categories[category][Math.floor(Math.random() * categories[category].length)]);
  }, [category]);

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver]);

  const handleSubmit = () => {
    if (input.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 100);
      setInput('');
      const next = categories[category][Math.floor(Math.random() * categories[category].length)];
      setCurrentWord(next);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTime(120);
    setGameOver(false);
    setCategory('Esporte');
    setCurrentWord(categories['Esporte'][0]);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-900 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
        <p className="text-lg">total words: {score / 100}</p>
        <p className="text-lg">total categories reached: 4</p>
        <p className="text-lg">time bonus: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
        <h2 className="text-4xl mt-4">{score}</h2>
        <Button onClick={resetGame} className="mt-6 bg-green-500 hover:bg-green-600">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-900 text-white">
      <Card className="w-[500px] p-6 bg-purple-800 text-center">
        <CardContent>
          <div className="flex justify-center gap-4 mb-6">
            {Object.keys(categories).map((cat) => (
              <div
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg cursor-pointer border-2 ${category === cat ? 'border-green-400 bg-green-700' : 'border-purple-500 bg-purple-600'}`}
              >
                {cat}
              </div>
            ))}
          </div>

          <h1 className="text-5xl font-extrabold text-green-400 mb-6">SCRAMBLE</h1>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 text-black rounded mb-4 text-center"
            placeholder={`Type the word for category ${category}`}
          />

          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">Send</Button>

          <div className="relative w-full h-3 bg-gray-600 rounded-full mt-6">
            <div
              className="absolute h-3 bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${(time / 120) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 text-sm">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</div>
        </CardContent>
      </Card>
    </div>
  );
}
