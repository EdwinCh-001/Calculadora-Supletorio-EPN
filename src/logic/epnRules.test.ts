import { calculateEpnStatus } from './epnRules';

function expectEqual(actual: unknown, expected: unknown, name: string) {
  if (actual === expected) {
    console.log(`✅ [PASS] ${name}`);
    return true;
  }
  console.error(`❌ [FAIL] ${name}:`, { actual, expected });
  return false;
}

function testCalculation() {
  let failed = 0;

  console.log('🧪 Iniciando verificación de reglas EPN...\n');

  // Caso 1
  let res = calculateEpnStatus(15.0, 14.0);
  if (!expectEqual(res.status, 'APROBADO_DIRECTO', 'Caso 1: Exonerado Holgado')) failed++;
  if (!expectEqual(res.semesterGrade, 29.0, 'Caso 1: Nota semestral')) failed++;

  // Caso 2
  res = calculateEpnStatus(14.0, 14.0);
  if (!expectEqual(res.status, 'APROBADO_DIRECTO', 'Caso 2: Borde Exonerado Exacto')) failed++;
  if (!expectEqual(res.semesterGrade, 28.0, 'Caso 2: Nota semestral')) failed++;

  // Caso 3
  res = calculateEpnStatus(10.0, 10.0);
  if (!expectEqual(res.status, 'SUSPENSO', 'Caso 3: Suspenso con Nota Dinámica')) failed++;
  if (!expectEqual(res.semesterGrade, 20.0, 'Caso 3: Nota semestral')) failed++;
  if (!expectEqual(res.finalExamGrade40, 28.0, 'Caso 3: Examen 40')) failed++;
  if (!expectEqual(res.finalExamGrade20, 14.0, 'Caso 3: Examen 20')) failed++;
  if (!expectEqual(res.finalExamGrade10, 7.0, 'Caso 3: Examen 10')) failed++;

  // Caso 4
  res = calculateEpnStatus(13.5, 13.5);
  if (!expectEqual(res.status, 'SUSPENSO', 'Caso 4: Suspenso con Tope Mínimo Regulatorio')) failed++;
  if (!expectEqual(res.semesterGrade, 27.0, 'Caso 4: Nota semestral')) failed++;
  if (!expectEqual(res.finalExamGrade40, 24.0, 'Caso 4: Examen 40')) failed++;
  if (!expectEqual(res.finalExamGrade20, 12.0, 'Caso 4: Examen 20')) failed++;
  if (!expectEqual(res.finalExamGrade10, 6.0, 'Caso 4: Examen 10')) failed++;

  // Caso 5
  res = calculateEpnStatus(9.0, 9.0);
  if (!expectEqual(res.status, 'SUSPENSO', 'Caso 5: Borde Mínimo para Supletorio')) failed++;
  if (!expectEqual(res.semesterGrade, 18.0, 'Caso 5: Nota semestral')) failed++;
  if (!expectEqual(res.finalExamGrade40, 30.0, 'Caso 5: Examen 40')) failed++;
  if (!expectEqual(res.finalExamGrade20, 15.0, 'Caso 5: Examen 20')) failed++;
  if (!expectEqual(res.finalExamGrade10, 7.5, 'Caso 5: Examen 10')) failed++;

  // Caso 6
  res = calculateEpnStatus(9.0, 8.99);
  if (!expectEqual(res.status, 'REPROBADO_DIRECTO', 'Caso 6: Borde Reprobado Directo')) failed++;
  if (!expectEqual(res.semesterGrade, 17.99, 'Caso 6: Nota semestral')) failed++;

  // Caso 7
  try {
    calculateEpnStatus(-1, 15);
    console.error('❌ [FAIL] Caso 7a: Debería rechazar notas < 0');
    failed++;
  } catch {
    console.log('✅ [PASS] Caso 7a: Rechaza nota < 0 correctamente.');
  }

  try {
    calculateEpnStatus(21, 15);
    console.error('❌ [FAIL] Caso 7b: Debería rechazar notas > 20');
    failed++;
  } catch {
    console.log('✅ [PASS] Caso 7b: Rechaza nota > 20 correctamente.');
  }

  if (failed === 0) {
    console.log('\n🎉 Todos los casos de prueba de la EPN se cumplieron al 100%.');
  } else {
    console.error(`\n❌ Se encontraron ${failed} fallos en las pruebas.`);
  }

  return failed;
}

testCalculation();
