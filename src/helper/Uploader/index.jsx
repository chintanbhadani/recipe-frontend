import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Uploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex justify-center border-dashed border-2 border-black-500 h-28 p-5"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>JPG, PNG and jpeg, Less than 10 MB Drag and drop here</p>
    </div>
  );
};

export default Uploader;
