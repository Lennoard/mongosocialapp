import { Request, Response } from "express";

export class FeedController {
  public getFeed = (request: Request, response: Response) => {
    return response.status(200).send("<h1>Feed</h1>");
  };

  public fetchFeed = (request: Request, response: Response) => {
    return response.json({ posts: [] });
  };
}
