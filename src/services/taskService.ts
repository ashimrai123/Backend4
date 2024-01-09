import db from '../db';
import {task} from '../models/tasks';

const tableName = 'todos';

export const getAllTasks = async (page: number, size: number): Promise<task[]> => {

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return await db(tableName).select('*').offset(startIndex).limit(size);
};

export const createTask = async (title:string):Promise<task> =>{
    const [newTask] = await db(tableName)
        .insert({title, completed:false})
        .returning('*');

    return newTask as task;
};

export const getTaskByTitle = async (title:string): Promise<task[]> =>{
    return await db(tableName).select('*').where(`title','like','%${title}%`);
};