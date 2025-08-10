import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext({});
export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  useEffect(() => {
    // 模拟API请求，实际可替换为 fetch('/api/settings')
    const local = localStorage.getItem('site_config');
    if (local) {
      setConfig(JSON.parse(local));
    } else {
      setConfig({
        name: 'HashBox',
        logo: '',
        phone: '400-888-8888',
        notice: '欢迎使用HashBox矿机平台！',
        withdrawMin: 10,
        withdrawFee: 1,
        withdrawTime: '8:00-22:00',
        popupEnable: true,
      });
    }
  }, []);
  // 提供更新方法
  const updateConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('site_config', JSON.stringify(newConfig));
  };
  return (
    <ConfigContext.Provider value={{ ...config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}; 