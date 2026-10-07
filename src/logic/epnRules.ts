export type EpnStatus = 'APROBADO_DIRECTO' | 'SUSPENSO' | 'REPROBADO_DIRECTO';

export interface EpnCalculationResult {
  status: EpnStatus;
  semesterGrade: number; // N_S sobre 40
  finalExamGrade40: number | null;
  finalExamGrade20: number | null;
  finalExamGrade10: number | null;
  deficitForSuspense: number;
}

export function calculateEpnStatus(b1: number, b2: number): EpnCalculationResult {
  if (b1 < 0 || b1 > 20 || b2 < 0 || b2 > 20) {
    throw new Error('Las notas de cada bimestre deben estar comprendidas entre 0.00 y 20.00 puntos.');
  }

  const semesterGrade = Number((b1 + b2).toFixed(2));

  if (semesterGrade < 18) {
    return {
      status: 'REPROBADO_DIRECTO',
      semesterGrade,
      finalExamGrade40: null,
      finalExamGrade20: null,
      finalExamGrade10: null,
      deficitForSuspense: Number((18 - semesterGrade).toFixed(2))
    };
  }

  if (semesterGrade < 28) {
    const finalExamGrade40 = Number(Math.max(24, 48 - semesterGrade).toFixed(2));
    const finalExamGrade20 = Number((finalExamGrade40 / 2).toFixed(2));
    const finalExamGrade10 = Number((finalExamGrade40 / 4).toFixed(2));

    return {
      status: 'SUSPENSO',
      semesterGrade,
      finalExamGrade40,
      finalExamGrade20,
      finalExamGrade10,
      deficitForSuspense: 0
    };
  }

  return {
    status: 'APROBADO_DIRECTO',
    semesterGrade,
    finalExamGrade40: null,
    finalExamGrade20: null,
    finalExamGrade10: null,
    deficitForSuspense: 0
  };
}
