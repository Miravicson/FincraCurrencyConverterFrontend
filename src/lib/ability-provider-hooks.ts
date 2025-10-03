import { useContext } from 'react';
import { AbilityContext } from './ability-provider';

export function useAbility() {
  return useContext(AbilityContext);
}
