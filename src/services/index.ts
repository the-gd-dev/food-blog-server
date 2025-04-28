import fs from "fs";
export const fileUploadService = async (filePath: string | Blob) => {
  const form = new FormData();
  const fileBuffer = fs.readFileSync(filePath as string);
  const fileBlob = new Blob([fileBuffer]);
  form.append("file", fileBlob);
  return await fetch("/upload", {
    method: "POST",
    body: form,
    headers: {
      "x-api-key": process.env.FILE_UPLOAD_SERVICE_SECRET!,
    },
  });
};
