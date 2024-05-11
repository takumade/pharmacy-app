'use client';

import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import type { User } from '@/types/user.type';
import frontendClient from '@/services/frontend-client';
import { APIResponse } from '@/types/api-response';


function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}



export interface SignUpParams {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<APIResponse> {
    // Make API request

    let response = await frontendClient('post', 'user/register', {
      ...params,
      name: params.fullName
    })
    await this.signInWithPassword({email: params.email, password: params.password})

    // We do not handle the API, so we'll just generate a token and store it in localStorage.


    return response;
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ success?: boolean, message: string, data:any }> {

    // Make API request
    let options:any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...params
      })
    }

    let result = await fetch('/api/login', options);

    let response = await result.json()

    if (response.success){
        setCookie('custom-auth-token', response.data.token);
        setCookie('custom-auth-user', JSON.stringify(response.data.user));
    }



    return response;
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = getCookie('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    let user = JSON.parse(getCookie('custom-auth-user') as string);

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    deleteCookie('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
