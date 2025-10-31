// utils/selectedCasa.ts
// Pequeño store en memoria para pasar la casa seleccionada entre pantallas.
// Es una solución simple y segura para enviar objetos entre rutas sin serializarlos en la URL.
let _selectedCasa: any = null;

export function setSelectedCasa(casa: any) {
  _selectedCasa = casa;
}

export function getSelectedCasa() {
  return _selectedCasa;
}

export function clearSelectedCasa() {
  _selectedCasa = null;
}
