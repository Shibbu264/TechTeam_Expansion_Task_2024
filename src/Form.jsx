import React from 'react'
import { useForm } from "react-hook-form"
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Form.css'

const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm()


    const onSubmit = async (data) => {
        const collectionName = `${data.name.split(' ')[0]}${data.branch.split(' ')[0]}`;
        let imageUrl = '';

        if (data.image[0]) {
            const imageFile = data.image[0];
            const storageRef = ref(storage, `${collectionName}/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        try {
            const docRef = await addDoc(collection(db, collectionName), {
                name: data.name,
                branch: data.branch,
                phone: data.phone,
                email: data.email,
                imageUrl: imageUrl,
            });
            console.log('Document ID: ', docRef.id);
            reset();
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    };

    const handleReset = () => {
        reset();
    };

    return (
        <>
            <div className='flex justify-center bg-[#b9b9b9] h-[120vh] lg:h-[100vh] max-w-full min-h-screen py-20'>
                <form className='flex flex-col justify-center items-center h-[100vh] lg:h-[80vh] max-w-[80vw] bg-white border-2 border-black rounded-[20px] lg:w-[50vw] gap-[30px] p-[10px]' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-3xl font-extrabold'>Form</h1>
                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 relative mx-[50px] gap-[10px] lg:w-[500px]'>
                        <label className='lg:text-lg text-center lg:text-left'>Name<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='text-md rounded-[5px] border-2 border-black p-[3px]'
                            placeholder='Enter your full name'
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <div className='self-center absolute text-center bg-white rounded-[5px] text-red-500 lg:text-sm text-xs p-[5px] top-[100%] lg:left-[50%]'>{errors.name.message}</div>}
                    </div>

                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 relative mx-[50px] gap-[10px] lg:w-[500px]'>
                        <label className='lg:text-lg text-center lg:text-left'>Branch<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='text-md rounded-[5px] border-2 border-black p-[3px]'
                            placeholder='Enter your branch'
                            type="text"
                            {...register('branch', { required: 'Branch is required' })}
                        />
                        {errors.branch && <div className='self-center absolute text-center bg-white rounded-[5px] text-red-500 lg:text-sm text-xs p-[5px] top-[100%] lg:left-[50%]'>{errors.branch.message}</div>}
                    </div>

                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 relative mx-[50px] gap-[10px] lg:w-[500px]'>
                        <label className='lg:text-lg text-center lg:text-left'>Email<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='text-md rounded-[5px] border-2 border-black p-[3px]'
                            placeholder='Enter your email'
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <div className='self-center absolute text-center bg-white rounded-[5px] text-red-500 lg:text-sm text-xs p-[5px] top-[100%] lg:left-[50%]'>{errors.email.message}</div>}
                    </div>

                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 relative mx-[50px] gap-[10px] lg:w-[500px]'>
                        <label className='lg:text-lg text-center lg:text-left'>Phone Number<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='text-md rounded-[5px] border-2 border-black p-[3px]'
                            placeholder='Enter your phone no.'
                            type="tel"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be 10 digits',
                                },
                            })}
                        />
                        {errors.phone && <div className='self-center absolute text-center bg-white rounded-[5px] text-red-500 lg:text-sm text-xs p-[5px] top-[100%] lg:left-[50%]'>{errors.phone.message}</div>}
                    </div>

                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 relative mx-[50px] gap-[10px] lg:w-[500px]'>
                        <label className='lg:text-lg lg:text-left text-center'>Image</label>
                        <input className='text-md rounded-[5px] p-[2px] w-[200px] lg:w-[240px]'
                            type="file"
                            {...register('image')}
                        />
                    </div>

                    <div className="flex justify-center gap-[5px]">
                        <input className='w-[80px] lg:w-[100px] p-[2px] lg:p-[10px] text-white rounded-[10px] bg-orange-500 lg:text-lg text-xm hover:bg-[#8d5c01] cursor-pointer' type="submit" value="Submit" />
                        <button className='w-[80px] lg:w-[100px] p-[2px] lg:p-[10px] text-white rounded-[10px] bg-orange-500 lg:text-lg text-xm hover:bg-[#8d5c01] cursor-pointer' type="button" onClick={handleReset}>Reset</button>
                    </div>
                    <div className='text-center'>* Fields marked with an asterisk are mandatory</div>
                </form>
            </div>
        </>
    )
}

export default Form
