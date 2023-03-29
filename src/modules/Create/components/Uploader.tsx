import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { CreateContractInput } from "../../../types/Contract";
import NextStepButton from "../../../components/NextStepButton";

type FileWithPreview = Partial<File & { preview: string }>;

type Props = {
  onImageUploaded: (file: File) => void;
  nextStepHandler?: (
    metadata: Pick<CreateContractInput, "imageName" | "imageDescription">
  ) => void;
};

const Uploader = ({ onImageUploaded, nextStepHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<CreateContractInput, "imageName" | "imageDescription">>();

  const [uploadedFile, setUploadedFile] = useState<FileWithPreview>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    const fileWithPreview = {
      ...acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0]),
    };

    setUploadedFile(fileWithPreview);
    onImageUploaded(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  return (
    <>
      <div
        className="flex h-40 md:h-80 flex-col items-center justify-center border border-dashed border-gray-500 text-center text-white px-4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop your image here, or click to select file</p>
        )}

        {uploadedFile && uploadedFile.preview && (
          <Image
            src={uploadedFile.preview}
            onLoad={() => {
              URL.revokeObjectURL(uploadedFile.preview ?? "");
            }}
            alt="Preview image"
            className="h-full"
            width={400}
            height={400}
          />
        )}
      </div>

      <div>
        <form
          className="flex w-full flex-col items-center justify-center gap-y-4"
          onSubmit={handleSubmit((data) => {
            if (!uploadedFile) {
              alert("Please upload your image");
              return;
            }
            console.log(data);
            nextStepHandler && nextStepHandler(data);
          })}
        >
          <div className="w-full">
            <label
              className="text-xl font-semibold text-gray-200"
              htmlFor="title"
            >
              Image Name
            </label>
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              {...register("imageName", { required: true })}
            />
            {errors.imageName && (
              <p className=" text-red-400">Image name is required.</p>
            )}
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
              {...register("imageDescription")}
            />
          </div>
          <NextStepButton />
        </form>
      </div>
    </>
  );
};

export default Uploader;
