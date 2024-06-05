/* eslint-disable react-hooks/rules-of-hooks */

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import db from "../firebase";


type formValues = {
  name: string;
  Branch: string;
  Email: string;
  Phone: number;
};

export const form = () => {
  const Form = useForm<formValues>({
    defaultValues: {
      name: "",
      Branch: "",
      Email: "",
      Phone: 0,
    },
  });
  const { register, control, handleSubmit, formState, reset } = Form;
  const { errors } = formState;

  const onSubmit = async (data: formValues) => {
    db.collection(`${data.name.split(" ")[0]}${data.Branch.split(" ")[0]}`).add(
      {
        name: data.name,
        Branch: data.Branch,
        Email: data.Email,
        Phone: data.Phone,
      }
    );alert("Form Submitted Successfully");
    await reset();
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="blackbox">
          <h1>Registration Form</h1>
          <label>
            Name :
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter your name..."
            />
            <p className="errormessages">{errors.name?.message}</p>
          </label>

          <br />
          <label>
            Branch :
            <input
              type="text"
              {...register("Branch", {
                required: "Branch is required",
              })}
              placeholder="Enter your Branch"
            />
            <p className="errormessages">{errors.Branch?.message}</p>
          </label>
          <br />

          <label>
            Email :
            <input
              type="text"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid Email",
                },
              })}
              placeholder="Enter your E-mail id..."
            />
            <p className="errormessages">{errors.Email?.message}</p>
          </label>

          <br />
          <label>
            Phone Number :
            <input
              type="text"
              {...register("Phone", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "invalid Phone number",
                },
                maxLength: {
                  value: 10,
                  message: "invalid Phone number",
                },
              })}
              placeholder="Enter your Phone number..."
            />
            <p className="errormessages">{errors.Phone?.message}</p>
          </label>

          <br />
          <button  className="submitbut">
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default form;
