import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { createTaskSchema } from '../validators/taskValidator';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    //Extract page and size from the request query 
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const size = req.query.size ? parseInt(req.query.size as string, 10) : 10;
    // Call the getAllTasks function from the taskService
    const tasks = await taskService.getAllTasks(page,size);

    // Send a JSON response containing the tasks array to the client
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const createTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const { title } = req.body;

    if (!title) {
      res.status(400).json({ error: 'No title' });
      return;
    }

    const newTask = await taskService.createTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskByTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'No title' });
      return;
    }

    const result = await taskService.getTaskByTitle(title);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
