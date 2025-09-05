import { Link ,useNavigate } from "react-router-dom"
import { useState } from "react"
import type { ChangeEvent } from "react"
import type { SignUpInput } from "@vani_k/medium-blog"
import  axios  from "axios"
import {BACKEND_URL} from "../config"

export const Auth = ({ type }: { type: "SignUp" | "SignIn" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<Partial<SignUpInput>>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "SignUp" ? "signup" : "signin"}`, postInputs);
            const {jwt} = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold ">
                          Create an Account
                        </div>
                        <div className="text-slate-500">
                            {type==="SignIn" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type==="SignUp" ? "/signin" : "/signup"}> 
                            {type==="SignUp" ? "Sign In" : "Sign Up"}
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 pt-4">
                        {type==="SignUp"?<LabelledInput label="Name" placeholder="enter your name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="xyz@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="@ahbj#gv" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button type="button" onClick={sendRequest} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 mt-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        { type=== "SignUp" ? "Sign Up" : "Sign In"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
interface labelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;

}

function LabelledInput({ label, placeholder, onChange, type }: labelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-1">
            {label}
        </label>
        <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder:semi-bold dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />

    </div>
}