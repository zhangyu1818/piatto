import React from 'react';

interface ConfigContextProps {
  getPrefixCls(suffixCls: string, customClass?: string): string;
}

const ConfigContext = React.createContext<ConfigContextProps>({
  getPrefixCls(suffixCls, customClass) {
    if (customClass) return customClass;
    return `piatto-${suffixCls}`;
  },
});

export default ConfigContext;
