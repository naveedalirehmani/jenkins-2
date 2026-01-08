import { environment } from "../types/global";
import { ResponseMessages, ResponseStatus } from "../types/response.enums";
import { Request, Response } from "express";

export function helloWorldHandler(request: Request, response: Response) {
  try {
    const environment = process.env.NODE_ENV || "ENV not recieved.";

    response.status(ResponseStatus.OK).json({
      message: ResponseMessages.Success,
      data: { message: "Hello World 29", environment: environment },
    });
  } catch (error) {
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}
