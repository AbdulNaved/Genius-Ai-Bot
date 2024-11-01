import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Please provide all fields" }, { status: 400 });
  }

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    return NextResponse.json({ error: res.error }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}


// "user server"; 

// import { signIn } from "next-auth/react";
// import {credentialsSignin} from "../../auth"


// const creadentialsLogin = async (email:string, password:string) => {
   
   
//     if (!email ||  !password) throw new Error("please provide all fileds");

//     try {
//       await signIn("creadentials", {
//         email,
//         password,
//         redirect: true,
        
//       });
//     } catch (error) {
//       const err = error as credentialsSignin;
//       return err.cause;
//     }
// };

// export { creadentialsLogin}