import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import backendClient from '@/services/backend-client';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export async function POST(request:any, response:any) {

  let body = await request.json()
  const email = body.email
  const password = body.password

  let res = await backendClient('post','user/login', {email, password});

  if (res.success && res.data.user.role === "customer"){
      res.success = false
      res.message = "You are not allowed here"
      delete res.data
  }


  if (res.success){
    cookies().set('custom-auth-token', res.data.token);
    cookies().set('custom-auth-user', JSON.stringify(res.data.user));
  }

  return Response.json(res)
}
