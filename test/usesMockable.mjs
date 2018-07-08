import mockable from './mockable';
const {
  spyable,
  stubbable,
} = mockable;

export function usesBoundSpyable() {
  return String(spyable()).toUpperCase();
}
export function usesReferencedSpyable() {
  return String(mockable.spyable()).toUpperCase();
}

export function usesStubbableReturns() {
  return String(stubbable.returns()).toUpperCase();
}
