export type AuthContextType = {
  signedIn: boolean;
  checkKey(api_key: string): Promise<boolean>;
  signOut(): void;
};

export type ConfigType = {
  [key: string]: string | boolean | Array<string> | ConfigType | number;
};
