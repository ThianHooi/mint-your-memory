import React, { useEffect } from "react";
import { ContractTrait } from "../../../types/Contract";
import { useFieldArray, useForm } from "react-hook-form";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import NextStepButton from "../../../components/NextStepButton";

type Props = {
  nextStepHandler?: (attributes: ContractTrait[]) => void;
};

const ContractTraitsForm = ({ nextStepHandler }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ attributes: ContractTrait[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    if (!fields.length) {
      append({ trait_type: "", value: "" } as ContractTrait, {
        shouldFocus: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        className="flex w-full flex-col items-center justify-center gap-y-4"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          nextStepHandler && nextStepHandler(data.attributes);
        })}
      >
        <div className="w-full">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-4 flex items-center justify-center space-x-4"
            >
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                {...register(`attributes.${index}.trait_type` as const)}
                placeholder="Example: location, date..."
              />
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                {...register(`attributes.${index}.value` as const)}
                placeholder="value"
              />
              <div>
                <XMarkIcon
                  onClick={() => remove(index)}
                  className="h-6 w-6 cursor-pointer text-white hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={() =>
              append({ trait_type: "", value: "" } as ContractTrait, {
                shouldFocus: true,
              })
            }
            type="button"
            className="gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <div className="flex items-center justify-center">
              <span>Add Row</span>
              <PlusIcon className="ml-2 h-6 w-6" />
            </div>
          </button>
        </div>

        <NextStepButton />
      </form>
    </div>
  );
};

export default ContractTraitsForm;
