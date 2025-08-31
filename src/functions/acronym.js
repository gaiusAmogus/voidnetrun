// src/functions/acronym.js
import { useEffect, useState } from 'react';

export default function useAcronym(numAcronyms) {
  const base64Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
  const [text, setText] = useState('');

  useEffect(() => {
    function getRandomCode() {
      let code = '';
      for (let i = 0; i < 3; i++) code += base64Chars.charAt(Math.floor(Math.random() * base64Chars.length));
      return code;
    }

    function generate() {
      const arr = [];
      for (let i = 0; i < numAcronyms * 10; i++) arr.push(getRandomCode());
      return arr.join(' ');
    }

    setText(generate());
    const interval = setInterval(() => setText(prev => generate().split(' ').slice(0, numAcronyms).join(' ')), 200);
    return () => clearInterval(interval);
  }, [numAcronyms]);

  return text;
}
