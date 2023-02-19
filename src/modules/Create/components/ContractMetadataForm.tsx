import React from "react";
import { useForm } from "react-hook-form";
import { ContractMetadata } from "../../../types/Contract";
import NextStepButton from "../../../components/NextStepButton";

type Props = {
  nextStepHandler?: (metadata: ContractMetadata) => void;
};

const ContractMetadataForm = ({ nextStepHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractMetadata>();

  return (
    <div>
      <form
        className="flex w-full flex-col items-center justify-center gap-y-4"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          nextStepHandler && nextStepHandler(data);
        })}
      >
        <div className="w-full">
          <label
            className="text-xl font-semibold text-gray-200"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            {...register("title", { required: true })}
          />
          {errors.title && <p className=" text-red-400">Title is required.</p>}
        </div>

        <div className="w-full">
          <label
            className="text-xl font-semibold text-gray-200"
            htmlFor="title"
          >
            Description
          </label>
          <textarea
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            {...register("description")}
          />
        </div>

        <NextStepButton />
      </form>
    </div>
  );
};

export default ContractMetadataForm;
