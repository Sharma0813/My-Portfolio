import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .required("Message is required"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/contact", data);
      alert("Message sent!");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <textarea
          {...register("message")}
          placeholder="Message"
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.message?.message}</p>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
