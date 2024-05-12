import { User } from "@/types/user.type";
import { SupabaseClient } from "@supabase/supabase-js";
import { getCookie } from "cookies-next";




export const uploadFileToSupabase = async (subaseClient: SupabaseClient, file:any, bucket:string) => {


  let userString:string | undefined = getCookie('custom-auth-user')

  let user:User = JSON.parse(userString as string)




const { data:uploadData, error:uploadError } = await subaseClient.storage.from(bucket).upload(`${user?._id}-${new Date().getTime()}-${file.name}`, file, {
 cacheControl: '3600',
 upsert: false,
});

// @ts-ignore
let fileKey = uploadData["path"] as string

const { data:signedUrl, error:signedKeyError } = await subaseClient.storage
                     .from(bucket)
                     .createSignedUrl(fileKey, 60 * 60 * 24 * 366 * 10)


return signedUrl?.signedUrl
};
