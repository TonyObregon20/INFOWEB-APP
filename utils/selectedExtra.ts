// utils/selectedExtra.ts
// Simple in-memory store to pass the selected extra between screens.
let _selectedExtra: any = null;

export function setSelectedExtra(extra: any) {
  _selectedExtra = extra;
}

export function getSelectedExtra() {
  return _selectedExtra;
}

export function clearSelectedExtra() {
  _selectedExtra = null;
}
