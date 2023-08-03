import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        autoComplete="off"
        {...field}
        {...props}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
          meta.touched && meta.error
        } `}
      />
      <p className="text-red-600 text-sm">
        {" "}
        <ErrorMessage className="error" name={field.name} />
      </p>
    </>
  );
};
