/**
 * Troika / drei Text в WebXR часто не включает глифы для надстрочных/подстрочных
 * цифр и знаков заряда (⁺ ⁻ ₂ ₃ …) — вместо них рисуются «тофу»-квадраты.
 * Для панели теста в VR заменяем на обычные ASCII-символы.
 */
export function formatQuizTextForVR(text: string): string {
  return (
    text
      // Заряды ионов
      .replace(/\u207A/g, '+')
      .replace(/\u207B/g, '-')
      // Подстрочные цифры Unicode
      .replace(/\u2080/g, '0')
      .replace(/\u2081/g, '1')
      .replace(/\u2082/g, '2')
      .replace(/\u2083/g, '3')
      .replace(/\u2084/g, '4')
      .replace(/\u2085/g, '5')
      .replace(/\u2086/g, '6')
      .replace(/\u2087/g, '7')
      .replace(/\u2088/g, '8')
      .replace(/\u2089/g, '9')
      // Надстрочные цифры (часто встречающиеся)
      .replace(/\u2070/g, '0')
      .replace(/\u00B9/g, '1')
      .replace(/\u00B2/g, '2')
      .replace(/\u00B3/g, '3')
      .replace(/\u2074/g, '4')
      .replace(/\u2075/g, '5')
      .replace(/\u2076/g, '6')
      .replace(/\u2077/g, '7')
      .replace(/\u2078/g, '8')
      .replace(/\u2079/g, '9')
  )
}
