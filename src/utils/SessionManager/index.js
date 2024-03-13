import { tokenDecodeJWT } from "../authUtils";

export const SetSessionToken=(value)=>{
sessionStorage.setItem("AppUserAmChat",value);
}


export const GetSetSessionToken=()=>{
    return    sessionStorage.getItem("AppUserAmChat")||'';
    }



export const isUserLogin=()=>{


    let isLogin=false;

    try
    {
            const token=GetSetSessionToken();
            const JSONResponse=tokenDecodeJWT(token);

            console.log(" token ",token);
            console.log(" JSONResponse ",JSONResponse);
            if(token && JSONResponse)
            {
                isLogin= true;
            }
    }catch(exc)
    {
            console.log(" exc ",exc);
            isLogin= false;
    }

    return isLogin;
}

export const getUserType=()=>{


    let userType="";
    try{
        const token=GetSetSessionToken();
        const JSONResponse=tokenDecodeJWT(token);
        
        if(JSONResponse?.role)
        {
            userType=JSONResponse?.role
        }
       
    }catch(exc)
    {
        console.log(" token is here ",exc);
        userType=""
    }

    return userType;
}