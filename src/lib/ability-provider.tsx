import React, { createContext, useEffect, useState } from 'react';
import { useGetUserAbilities } from '../_generated';
import { createContextualCan } from '@casl/react';
import { createPrismaAbility } from '@casl/prisma';
import { PureAbility } from '@casl/ability';
import { useAuth } from './auth-provider-hooks';

export const AbilityContext = createContext(new PureAbility());
export const Can = createContextualCan(AbilityContext.Consumer);

export function AbilityProvider({ children }: React.PropsWithChildren) {
  const { user: authUser } = useAuth();
  const { data: abilities } = useGetUserAbilities({
    query: { enabled: !!authUser },
  });
  const [ability, setAbility] = useState(() => createPrismaAbility([], {}));

  useEffect(() => {
    if (abilities) {
      setAbility(createPrismaAbility(abilities.data!, {}));
    }
  }, [abilities]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
