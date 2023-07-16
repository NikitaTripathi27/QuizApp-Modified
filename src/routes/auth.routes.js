import axios from "axios"
import config from "../Components/config"

const login = async(body) =>{
    const{loginKey,password} = body;
    const response = await axios.post(`${config.endpoint}/v1/auth/login`,{
        loginKey,password
    })
    if(response.status !==200){
        throw new Error(response.data.message)
    }
    return response.data
}
export const register = async (body) => {
    
    const { username, email, password } = body;
    
    const response = await axios.post(
        `${config.endpoint}/v1/auth/register`,
        {
            username,
            email,
            password
        }
    );

    if (response.status !== 201) {
        throw new Error(response.data.message);
    }
    console.log(response ,"res")
    return response.data;
}

export{
    login
}