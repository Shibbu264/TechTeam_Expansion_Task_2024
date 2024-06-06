import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { storage } from "../firebase";
import { db } from "../firebase"
import { ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

function Form() {
    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const [img, setImg] = useState(null);

    const collectionName = (data) => {
        const first = data.username.split(' ')[0];
        const collecName = first.concat(data.branch);
        return collecName
    }

    const onSubmit = (data) => {
        const collecName = collectionName(data);
        dataUpload(data, collecName);
        imgUpload(data, collecName);
    };  

    const dataUpload = async (data, collecName) => {
        const usersCollectionRef = collection(db, collecName);
        const newUserRef = doc(usersCollectionRef);
        if (data.pic[0] == null){
            data = {...data, pic: "no image inserted"}
        }else{
            data = {...data, pic: "in storage"}
        }
        await setDoc(newUserRef, data);
        alert("Data uploaded");
    };
    
    const imgUpload = (data, folderName) => {
        if (data.pic[0] == null) return;
        const imgRef = ref(storage, `${folderName}/${data.pic[0].name}`);
        uploadBytes(imgRef, img).then(() => {
            alert("uploaded data");
        });
    };
    
    return (
        <div className='h-screen w-screen bg-sky-950 flex justify-center items-center'>

            <div className='h-max w-96 bg-slate-800 rounded-xl p-4'>

                <form className="mx-auto max-w-md justify-center " onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className= 'text-neutral-50 w-96 font-medium text-2xl'>Enter your details</div>

                    <div className="mb-5">
                        <label htmlFor="username" className="flex justify-start mb-2 text-sm font-medium text-white">Full name</label>
                        <input type="text" id="username" placeholder ="John Doe" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg  block w-full p-2.5 shadow-sm-light" {...register("username", {
                            required: 'this is a required field'
                        })} />
                        <p className='text-red-600 text-left text-sm'>{errors.username?.message}</p>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="Branch" className="flex justify-start mb-2 text-sm font-medium text-white">Select your Branch</label>
                        <select id="Branch" {...register("branch")} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                            <option>BCE</option>
                            <option>BME</option>
                            <option>PHE</option>
                            <option>CHE</option>
                            <option>IC</option>
                            <option>CER</option>
                            <option>SMST</option>
                            <option>MET</option>
                            <option>MIN</option>
                            <option>CSE</option>
                            <option>MAT</option>
                            <option>CIV</option>
                            <option>MEC</option>
                            <option>EEE</option>
                            <option>ECE</option>
                            <option>PHY</option>
                            <option>ARC</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className=" mb-2 text-sm font-medium text-white flex justify-start">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 shadow-sm-light" placeholder="name@email.com" {...register("email", {
                            required: 'this is a required field',
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "invalid email format"
                            }
                        })} />
                        <p className='text-red-600 text-left text-sm'>{errors.email?.message}</p>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="tel" className="flex justify-start mb-2 text-sm font-medium text-white">Contact Number</label>
                        <input type="tel" id="tel" placeholder='9876543210'  className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 shadow-sm-light" {...register("tel", {
                            required: 'this is a required field',
                            pattern: {
                                value: /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,
                                message: "invalid phone number format"
                            },
                        })} />
                        <p className='text-red-600 text-left text-sm'>{errors.tel?.message}</p>
                    </div>

                    <div className="mb-5">
                        <label className="flex justify-start mb-2 text-sm font-medium text-white" htmlFor="pic">Upload Pic</label>
                        <input onChange={(e) => { setImg(e.target.files[0]) }} className="block w-full h-10 text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700  focus:outline-none file:h-10 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:font-medium file:bg-gray-600 file:text-white hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" id="pic" type="file" {...register("pic")} />
                    </div>

                    <div className='flex justify-between'>
                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                        <button type="reset" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Form;