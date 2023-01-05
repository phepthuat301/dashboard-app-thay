
export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};


export const deleteToken = (): void => { localStorage.removeItem('accessToken'); };



export const persistMenuMode = (menuMode: string): void => {
  localStorage.setItem('menuMode', menuMode);
};

export const readMenuMode = (): string | undefined => {
  return localStorage.getItem('menuMode') || undefined;
};



export const persistColorSchema = (colorSchema: string): void => {
  localStorage.setItem('colorSchema', colorSchema);
};

export const readColorSchema = (): string | undefined => {
  return localStorage.getItem('colorSchema') || undefined;
};


export const persistTheme = (theme: string): void => {
  localStorage.setItem('themeWeb', theme);
};

export const readTheme = (): string | undefined => {
  return localStorage.getItem('themeWeb') || undefined;
};

export const persistComponentTheme = (componentTheme: string): void => {
  localStorage.setItem('componentTheme', componentTheme);
};

export const readComponentTheme = (): string | undefined => {
  return localStorage.getItem('componentTheme') || undefined;
};
