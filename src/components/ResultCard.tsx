import type { EpnCalculationResult } from '../logic/epnRules';

interface ResultCardProps {
  result: EpnCalculationResult | null;
  b1Value: number | null;
  b2Value: number | null;
}

const STATUS_CONFIG = {
  APROBADO_DIRECTO: {
    className: 'status-aprobado',
    icon: '🎉',
    title: '¡Aprobaste!',
    description: 'No necesitas rendir examen final. ¡Felicitaciones!',
  },
  SUSPENSO: {
    className: 'status-suspenso',
    icon: '📝',
    title: 'Vas a supletorio',
    description: 'Aún puedes aprobar. Esta es la nota mínima que necesitas en el examen final:',
  },
  REPROBADO_DIRECTO: {
    className: 'status-reprobado',
    icon: '😔',
    title: 'Reprobaste la materia',
    description: 'No tienes derecho a rendir examen supletorio.',
  },
} as const;

const ResultCard = ({ result, b1Value, b2Value }: ResultCardProps) => {
  if (b1Value === null || b2Value === null) {
    return (
      <div className="result-card result-empty">
        <div className="empty-icon" aria-hidden="true">
          📋
        </div>
        <h2>Tu resultado</h2>
        <p className="empty-message">
          Completa las dos notas para saber si apruebas o qué necesitas en el examen final.
        </p>
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="result-card result-empty">
        <div className="empty-icon" aria-hidden="true">
          ⚠️
        </div>
        <h2>Revisa tus notas</h2>
        <p className="empty-message">Cada nota debe ser un número entre 0 y 20.</p>
      </div>
    );
  }

  const config = STATUS_CONFIG[result.status];

  return (
    <div className={`result-card ${config.className}`}>
      <h2>Tu resultado</h2>

      <div className="status-banner">
        <span className="status-icon" aria-hidden="true">
          {config.icon}
        </span>
        <div>
          <h3 className="status-title">{config.title}</h3>
          <p className="status-desc">{config.description}</p>
        </div>
      </div>

      <p className="section-title">Tus notas</p>
      <div className="result-grid">
        <div className="result-item">
          <span className="result-label">Total · de 40</span>
          <span className="result-value">{result.semesterGrade.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Promedio · de 20</span>
          <span className="result-value">{(result.semesterGrade / 2).toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Equivalente · de 10</span>
          <span className="result-value">{(result.semesterGrade / 4).toFixed(2)}</span>
        </div>
      </div>

      {result.status === 'SUSPENSO' && result.finalExamGrade40 !== null && (
        <div className="exam-panel">
          <p className="section-title">Nota necesaria en el examen</p>
          <div className="exam-grid">
            <div className="exam-item">
              <span className="exam-label">Sobre 40</span>
              <span className="exam-value">{result.finalExamGrade40.toFixed(2)}</span>
            </div>
            <div className="exam-item">
              <span className="exam-label">Sobre 20</span>
              <span className="exam-value">{result.finalExamGrade20?.toFixed(2)}</span>
            </div>
            <div className="exam-item">
              <span className="exam-label">Sobre 10</span>
              <span className="exam-value">{result.finalExamGrade10?.toFixed(2)}</span>
            </div>
          </div>
          <p className="exam-note">
            <strong>Importante:</strong> la EPN exige mínimo 6.00 sobre 10 en el examen,
            aunque la cuenta matemática dé menos.
          </p>
        </div>
      )}

      {result.status === 'REPROBADO_DIRECTO' && (
        <div className="note-box note-reprobado">
          <p>
            Te faltaron <strong>{(18 - result.semesterGrade).toFixed(2)} puntos</strong> (de 40)
            para poder rendir supletorio. Necesitabas al menos 18.00.
          </p>
        </div>
      )}

      {result.status === 'APROBADO_DIRECTO' && (
        <div className="note-box note-aprobado">
          <p>
            Estás por encima del <strong>mínimo de 28.00</strong> (de 40) para aprobar sin examen.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;