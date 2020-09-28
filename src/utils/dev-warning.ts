const devWarning = (assert: any, warning: string) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    if (assert) console.warn(warning);
  }
};

export default devWarning;
