import { useState, useEffect } from 'react';

const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 30;
const DEFAULT_PASSWORD_LENGTH = 15;

const Main = props => {
  const [password, setPassword] = useState('12345678');
  const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH);
  const [hasLowerCase, setHasLowerCase] = useState(true);
  const [hasUpperCase, setHasUpperCase] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);
  const [strength, setStrength] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleGeneratePassword = () => {
    const types = {
      upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    const getType = [
      function upperCase() {
        return types.upperCase[
          Math.floor(Math.random() * types.upperCase.length)
        ];
      },
      function lowerCase() {
        return types.lowerCase[
          Math.floor(Math.random() * types.lowerCase.length)
        ];
      },
      function numbers() {
        return types.numbers[Math.floor(Math.random() * types.numbers.length)];
      },
      function symbols() {
        return types.symbols[Math.floor(Math.random() * types.symbols.length)];
      },
    ];

    let password = '';

    if (!hasUpperCase && !hasLowerCase && !hasNumbers && !hasSymbols) {
      return false;
    }

    let optionsObject = {
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      numbers: hasNumbers,
      symbols: hasSymbols,
    };

    while (password.length < length) {
      let typeAdder = getType[Math.floor(Math.random() * getType.length)];

      let isChecked = optionsObject[typeAdder.name];

      if (isChecked) {
        password += typeAdder();
      }
    }
    setPassword(password);
  };

  useEffect(() => {
    let point = 0;
    let value = password;
    let widthPower = [1, 25, 50, 75, 100];

    if (value.length >= 6) {
      let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach(item => {
        if (item.test(value)) {
          point += 1;
        }
      });
    }

    setStrength(widthPower[point]);
  }, [password]);

  return (
    <main className="container" {...props}>
      <h1 style={{ textAlign: 'center' }}>Password Generator</h1>
      <article>
        <fieldset role="group">
          <input
            type="text"
            name="text"
            value={password}
            aria-label="Read-only input"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value={copied ? 'Copied' : 'Copy'}
            onClick={handleCopyToClipboard}
          />
        </fieldset>
      </article>
      <article>
        <label>
          Password Strength
          <progress value={strength} max="100" />
        </label>
      </article>
      <article>
        <label>
          Password Length {length}
          <input
            type="range"
            min={MINIMUM_PASSWORD_LENGTH}
            max={MAXIMUM_PASSWORD_LENGTH}
            value={length}
            onChange={e => setLength(e.target.value)}
          />
        </label>
        <fieldset class="grid">
          <label>
            <input
              type="checkbox"
              id="lowerCase"
              role="switch"
              checked={hasLowerCase}
              onChange={e => setHasLowerCase(e.target.checked)}
            />
            Include Lowercase Letters
          </label>
          <label>
            <input
              type="checkbox"
              id="upperCase"
              role="switch"
              checked={hasUpperCase}
              onChange={e => setHasUpperCase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
        </fieldset>
        <fieldset class="grid">
          <label>
            <input
              type="checkbox"
              name="numbers"
              role="switch"
              checked={hasNumbers}
              onChange={e => setHasNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              id="symbols"
              role="switch"
              checked={hasSymbols}
              onChange={e => setHasSymbols(e.target.checked)}
            />
            Include Symbols
          </label>
        </fieldset>
        <input
          onClick={handleGeneratePassword}
          type="button"
          value="Generate Password"
        />
      </article>
    </main>
  );
};

export default Main;
