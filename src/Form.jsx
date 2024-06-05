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
        <div className='container'>
        
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <h1>Form</h1>
                <div className='form-items'>
                    <label className='form-labels'>Name<span style={{color: 'red'}}>*</span></label>
                    <input
                        className='form-inputs'
                        placeholder='Enter your full name'
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className='error'>{errors.name.message}</p>}
                </div>

                <div className='form-items'>
                    <label className='form-labels'>Branch<span style={{color: 'red'}}>*</span></label>
                    <input
                        className='form-inputs'
                        placeholder='Enter your branch'
                        type="text"
                        {...register('branch', { required: 'Branch is required' })}
                    />
                    {errors.branch && <p className='error'>{errors.branch.message}</p>}
                </div>

                <div className='form-items'>
                    <label className='form-labels'>Email<span style={{color: 'red'}}>*</span></label>
                    <input
                        className='form-inputs'
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
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                </div>

                <div className='form-items'>
                    <label className='form-labels'>Phone Number<span style={{color: 'red'}}>*</span></label>
                    <input
                        className='form-inputs'
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
                    {errors.phone && <p className='error'>{errors.phone.message}</p>}
                </div>

                <div className='form-items'>
                    <label className='form-labels'>Image</label>
                    <input className='image-input'
                        type="file"
                        {...register('image')}
                    />
                </div>

                <div className="buttons">
                <input type="submit" value="Submit" />
                <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Form
