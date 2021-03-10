import type { ForwardedRef } from 'react';

const composeRef = <Ref>(...refs: ForwardedRef<Ref>[]) => (instance: Ref) => {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(instance);
    } else if (ref) {
      ref.current = instance;
    }
  });
};

export default composeRef;
