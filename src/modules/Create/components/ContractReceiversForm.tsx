import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NextStepButton from "../../../components/NextStepButton";
import { isValidEthereumAddress } from "../../../utils/is-valid-ethereum-address";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  nextStepHandler?: (receivers: string[]) => void;
};

const schema = z.object({
  receivers: z.array(
    z.object({
      address: z.string().refine(isValidEthereumAddress, {
        message: "This is not a valid address",
      }),
    })
  ),
});

const ContractReceiversForm = ({ nextStepHandler }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ receivers: { address: string }[] }>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "receivers",
  });

  useEffect(() => {
    if (!fields.length) {
      append("" as any, { shouldFocus: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        className="flex w-full flex-col items-center justify-center gap-y-4"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const addresses = data.receivers.map(({ address }) => address);
          nextStepHandler && nextStepHandler(addresses);
        })}
      >
        <div className="w-full">
          {fields.map((field, index) => (
            <div className="mb-4">
              <div
                key={field.id}
                className="flex items-center justify-center space-x-4"
              >
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  {...register(`receivers.${index}.address` as const)}
                  placeholder="Wallet Address. Example: 0x418..."
                />

                <div>
                  <XMarkIcon
                    onClick={() => remove(index)}
                    className="h-6 w-6 cursor-pointer text-white hover:text-red-500"
                  />
                </div>
              </div>
              {errors && errors?.receivers?.[index] && (
                <p className="text-red-500">
                  {errors?.receivers?.[index]?.address?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={() =>
              append("" as any, {
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

export default ContractReceiversForm;
