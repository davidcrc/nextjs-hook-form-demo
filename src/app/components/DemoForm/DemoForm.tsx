"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DemoFormType } from "./hookforms.interfaces";

const DemoForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DemoFormType>({
    defaultValues: {
      name: "test",
      email: "rest@email.com",
      password: "123456",
      confirmPassword: "123456",
      birthDate: "1990-12-12",
      terms: true,
    },
  });

  const countryWatch = watch("country");

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center min-h-screen gap-2 m-auto w-80 "
    >
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        className="text-black"
        {...register("name", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "al menos debe tener dos caracteres",
          },
        })}
      />
      {errors && <span>{errors.name?.message}</span>}

      <label htmlFor="email">Correo</label>
      <input
        type="text"
        className="text-black"
        {...register("email", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
        })}
      />
      {errors && <span>{errors.email?.message}</span>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="text-black"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres",
          },
        })}
      />
      {errors && <span>{errors.password?.message}</span>}

      <label htmlFor="confirmPassword">Confirmar Password</label>
      <input
        type="password"
        className="text-black"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Confirma password es requerido",
          },
          validate: (value, parent) => {
            return value === parent?.password
              ? true
              : "Las contraseñas no coinciden";
          },
        })}
      />
      {errors && <span>{errors.confirmPassword?.message}</span>}

      <label htmlFor="birthDate">Fecha de nacimiento</label>
      <input
        type="date"
        className="text-black"
        {...register("birthDate", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();

            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 ? true : "Debes ser mayor de edad";
          },
        })}
      />
      {errors && <span>{errors.birthDate?.message}</span>}

      <label htmlFor="country">Pais</label>
      <select className="text-black" {...register("country")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {countryWatch === "ar" && (
        <>
          <input
            type="text"
            className="text-black"
            placeholder="Province"
            {...register("province", {
              required: {
                value: true,
                message: "Pronvincia requerida",
              },
            })}
          />

          {errors && <span>{errors.province?.message}</span>}
        </>
      )}

      <label htmlFor="photo">Foto</label>
      <input type="file" {...register("photo")} onChange={(e) => false} />

      <div className="flex justify-between">
        <label htmlFor="terms">Acepto terminos y condiciones</label>
        <input
          type="checkbox"
          {...register("terms", {
            required: {
              value: true,
              message: "Debe aceptar los termns and conds",
            },
          })}
        />
      </div>
      {errors && <span>{errors.terms?.message}</span>}

      <button className="bg-green-700 rounded-lg px-2 py-1">Enviar</button>
    </form>
  );
};

export default DemoForm;
