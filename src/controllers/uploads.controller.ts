import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "File uploaded successfully!",
      data: { url: fileUrl },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
