import React, { useLayoutEffect } from 'react';

const style: React.CSSProperties = {
  width: 375,
  fontSize: 0,
};

const Phone: React.FC = ({ children }) => {
  useLayoutEffect(() => {
    document.documentElement.style.fontSize = `75px`;
  }, []);
  return <div style={style}>{children}</div>;
};

export default Phone;
