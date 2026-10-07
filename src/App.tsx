import { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GradeForm from './components/GradeForm';
import ResultCard from './components/ResultCard';
import { calculateEpnStatus, type EpnCalculationResult } from './logic/epnRules';

function App() {
  const [b1, setB1] = useState<string>('');
  const [b2, setB2] = useState<string>('');

  const { b1Value, b2Value, result, errorB1, errorB2 } = useMemo(() => {
    const parseGrade = (val: string): number | null => {
      if (val === '' || val === null) return null;
      const num = parseFloat(val);
      if (isNaN(num)) return null;
      return num;
    };

    const b1Val = parseGrade(b1);
    const b2Val = parseGrade(b2);

    const errorFor = (val: number | null): string | null => {
      if (val === null) return null;
      if (val < 0 || val > 20) {
        return 'Ingresa una nota entre 0 y 20.';
      }
      return null;
    };

    const errB1 = errorFor(b1Val);
    const errB2 = errorFor(b2Val);

    let calcResult: EpnCalculationResult | null = null;
    if (b1Val !== null && b2Val !== null && !errB1 && !errB2) {
      calcResult = calculateEpnStatus(b1Val, b2Val);
    }

    return {
      b1Value: b1Val,
      b2Value: b2Val,
      result: calcResult,
      errorB1: errB1,
      errorB2: errB2,
    };
  }, [b1, b2]);

  const handleClear = () => {
    setB1('');
    setB2('');
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <GradeForm
            b1={b1}
            b2={b2}
            errorB1={errorB1}
            errorB2={errorB2}
            onB1Change={setB1}
            onB2Change={setB2}
            onClear={handleClear}
          />
          <ResultCard result={result} b1Value={b1Value} b2Value={b2Value} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
