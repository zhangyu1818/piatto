import React, { HTMLAttributes, useLayoutEffect } from 'react';

const style: React.CSSProperties = {
  width: 375,
  fontSize: 0,
};

const Phone: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  style: propsStyle,
  ...restProps
}) => {
  useLayoutEffect(() => {
    document.documentElement.style.fontSize = `75px`;
  }, []);
  return (
    <div style={{ ...style, ...propsStyle }} {...restProps}>
      {children}
    </div>
  );
};

export default Phone;
