interface GradeFormProps {
  b1: string;
  b2: string;
  errorB1: string | null;
  errorB2: string | null;
  onB1Change: (value: string) => void;
  onB2Change: (value: string) => void;
  onClear: () => void;
}

const GradeForm = ({
  b1,
  b2,
  errorB1,
  errorB2,
  onB1Change,
  onB2Change,
  onClear,
}: GradeFormProps) => {
  return (
    <div className="grade-form">
      <h2>Tus notas</h2>
      <p className="form-intro">
        Escribe la nota de cada bimestre y te diremos si apruebas o qué necesitas en el examen final.
      </p>

      <div className="form-group">
        <label htmlFor="b1">
          <span>Primer bimestre</span>
          <span className="label-hint">0 a 20</span>
        </label>
        <div className="input-wrap">
          <input
            id="b1"
            className={errorB1 ? 'error' : ''}
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="20"
            value={b1}
            onChange={(e) => onB1Change(e.target.value)}
            placeholder="0.00"
            aria-label="Calificación del primer bimestre"
            aria-invalid={Boolean(errorB1)}
            aria-describedby={errorB1 ? 'b1-error' : undefined}
          />
          <span className="input-unit" aria-hidden="true">
            pts
          </span>
        </div>
        {errorB1 && (
          <span id="b1-error" className="field-error" role="alert">
            {errorB1}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="b2">
          <span>Segundo bimestre</span>
          <span className="label-hint">0 a 20</span>
        </label>
        <div className="input-wrap">
          <input
            id="b2"
            className={errorB2 ? 'error' : ''}
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="20"
            value={b2}
            onChange={(e) => onB2Change(e.target.value)}
            placeholder="0.00"
            aria-label="Calificación del segundo bimestre"
            aria-invalid={Boolean(errorB2)}
            aria-describedby={errorB2 ? 'b2-error' : undefined}
          />
          <span className="input-unit" aria-hidden="true">
            pts
          </span>
        </div>
        {errorB2 && (
          <span id="b2-error" className="field-error" role="alert">
            {errorB2}
          </span>
        )}
      </div>

      <button type="button" className="clear-button" onClick={onClear}>
        <span aria-hidden="true">✕</span> Borrar todo
      </button>
    </div>
  );
};

export default GradeForm;