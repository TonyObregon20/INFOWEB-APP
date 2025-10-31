// utils/selectedService.ts
let _selectedService: any = null;

export function setSelectedService(s: any) {
  _selectedService = s;
}

export function getSelectedService() {
  return _selectedService;
}

export function clearSelectedService() {
  _selectedService = null;
}
