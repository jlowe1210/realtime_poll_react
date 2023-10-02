import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./PollCreateForm.module.css";
import { useCreatePollMutation } from "../../Slices/pollApiSlice";
import { useLogoutMutation } from "../../Slices/authApiSlice";

function PollCreateForm() {
  const [errorResponse, setErrorResponse] = useState("");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      duration_time: 1,
      options: [{ option: "" }, { option: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 2 },
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });

  const [createPoll, { data, error, isLoading, isError, isSuccess }] =
    useCreatePollMutation();
  const [logout] = useLogoutMutation();

  const onSubmit = async ({ name, duration_time, minutesOrHour, options }) => {
    setErrorResponse("");
    const pollBody = {
      name,
      duration: `${duration_time} ${minutesOrHour}`,
      options,
    };

    try {
      const response = await createPoll(pollBody).unwrap();
    } catch ({ status, data: { errors } }) {
      console.log(errors);

      if (status === 401) {
        logout();
      } else {
        setErrorResponse(errors.message);
      }
    }

    reset();
  };

  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess && data && (
          <div>
            <p>Poll Created</p>
            <p>
              Link{" "}
              <a target="_blank" href={data.poll.url}>
                to Poll
              </a>
            </p>
          </div>
        )}
        {errorResponse && (
          <p className={styles.response_error}>
            Unable to create Poll, {errorResponse}
          </p>
        )}
        {getValues("options").length < 2 && (
          <p className={styles.response_error}>
            Poll Must have atleast two options
          </p>
        )}
        {errors?.name?.type === "required" && (
          <p className={styles.response_error}>Poll requires a name</p>
        )}

        {errors.options && (
          <p className={styles.response_error}>Option must have a value</p>
        )}
        <input
          type="text"
          placeholder="Poll title"
          {...register("name", { required: true })}
        />

        <ul>
          {fields.map((field, index) => (
            <li key={field.id} className={styles.option_container}>
              <input
                className={styles.option_input}
                // important to include key with field's id
                placeholder={`option ${index + 1}`}
                {...register(`options.${index}.option`, { required: true })}
              />
              <p
                className={styles.option_btn}
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                X
              </p>
            </li>
          ))}
        </ul>
        <div className={styles.add_option_btn_container}>
          <button
            className={styles.add_option_btn}
            type="button"
            onClick={() => append({ option: "" })}
          >
            Add Option+
          </button>
        </div>

        <div className={styles.duration_container}>
          <input
            className={styles.duration_time}
            type={"number"}
            max="100"
            min="1"
            placeholder="duration"
            {...register("duration_time")}
          />
          <select
            className={styles.duration_mins_or_hours}
            {...register("minutesOrHour")}
          >
            <option value={"minutes"}>minutes</option>
            <option value={"hours"}>hours</option>
          </select>
        </div>

        <input
          disabled={!isValid || getValues("options").length < 2}
          className={styles.formcontainer_submit_btn}
          type="submit"
          value={isLoading ? "Creating Poll" : "Create Poll"}
        />
      </form>
    </div>
  );
}

export default PollCreateForm;
