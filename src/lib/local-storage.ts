import { UserEntity } from '@/_generated';
import { useEffect, useState } from 'react';

export class LocalStorage {
  static AUTH_USER_KEY = 'auth-user';
  static ACCESS_TOKEN_KEY = 'access-token';

  static getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  static setItem(key: string, item: string): void {
    localStorage.setItem(key, item);
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static getObject<T = object>(key: string): T | null {
    const objectString = this.getItem(key);
    return objectString ? (JSON.parse(objectString) as T) : null;
  }

  static setObject<T = object>(key: string, item: T): void {
    const objectString = JSON.stringify(item);
    this.setItem(key, objectString);
  }

  static setAuthUser(authUser: UserEntity | null) {
    this.setObject(this.AUTH_USER_KEY, authUser);
    window.dispatchEvent(new Event('localStorageUpdate'));
  }

  static setAccessToken(accessToken: string) {
    this.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  static getAccessToken() {
    return this.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getAuthUser() {
    return this.getObject<UserEntity>(this.AUTH_USER_KEY);
  }

  static removeAccessToken() {
    this.remove(this.ACCESS_TOKEN_KEY);
  }

  static removeAuthUser() {
    this.remove(this.AUTH_USER_KEY);
    window.dispatchEvent(new Event('localStorageUpdate'));
  }
}

export function useUserFromLocalStorage() {
  const [value, setValue] = useState(() => LocalStorage.getAuthUser());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setValue(LocalStorage.getAuthUser());
    };

    window.addEventListener('localStorageUpdate', handleStorageUpdate);
    return () =>
      window.removeEventListener('localStorageUpdate', handleStorageUpdate);
  }, []);

  return value;
}
