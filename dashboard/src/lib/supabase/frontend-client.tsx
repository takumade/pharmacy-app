
import { User } from '@/types/user.type';
import { createClient } from '@supabase/supabase-js'
import { getCookie } from 'cookies-next';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)




export const uploadFileToSupabase = async (file:any, bucket:string) => {


     let userString:string | undefined = getCookie('custom-auth-user')

     let user:User = JSON.parse(userString as string)




  const { data:uploadData, error:uploadError } = await supabase.storage.from('logos').upload(`${user?._id}-${file.name}`, file, {
    cacheControl: '3600',
    upsert: false,
  });

  // @ts-ignore
  let fileKey = uploadData["path"] as string

  const { data:signedUrl, error:signedKeyError } = await supabase.storage
                        .from('logos')
                        .createSignedUrl(fileKey, 60 * 60 * 24 * 366 * 10)


  return signedUrl?.signedUrl
};

export default supabase
