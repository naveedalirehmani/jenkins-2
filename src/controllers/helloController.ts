import { ResponseMessages, ResponseStatus } from "../types/response.enums";
import { Request, Response } from "express";

export function helloWorldHandler(request: Request, response: Response) {
  try {
    response.status(ResponseStatus.OK).json({
      message: ResponseMessages.Success,
      data: { message: "Hello World 1" },
    });
  } catch (error) {
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}
