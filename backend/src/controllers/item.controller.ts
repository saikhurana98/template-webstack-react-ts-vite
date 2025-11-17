import { Request, Response } from 'express';
import { AppDataSource } from '../config/database.js';
import { Item } from '../entities/Item.js';

const itemRepository = AppDataSource.getRepository(Item);

export const getAllItems = async (_req: Request, res: Response) => {
  try {
    const items = await itemRepository.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemRepository.findOneBy({ id: parseInt(id) });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    const item = itemRepository.create({ name, description });
    const savedItem = await itemRepository.save(item);
    
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const item = await itemRepository.findOneBy({ id: parseInt(id) });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    if (name) item.name = name;
    if (description) item.description = description;
    
    const updatedItem = await itemRepository.save(item);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await itemRepository.delete(id);
    
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
