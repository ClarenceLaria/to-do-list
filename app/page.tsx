'use client'
import Input from "./Components/Input";
import { useEffect, useState } from "react";
import {Button} from "./Components/Button";
import toast from 'react-hot-toast';
import clsx from "clsx";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  const dueDate = new Date(formData.date);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });


    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        toast.error("The selected date cannot be in the past.");
        setFormData({
          ...formData,
          [name]: '',
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();

    setLoading(true);

    try{
      toast.loading('Creating Task...');

      const response = await fetch('/api/create-task',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: dueDate.toISOString()
        })
      });

      toast.dismiss();
      if(response.ok && response.status === 200 || response.status === 201){
        toast.success('Task Created Successfully');
        setLoading(false);
        setFormData({
          title: '',
          description: '',
          date: '',
        });
      } else if(response.status === 400){
        const errorData = await response.json(); 
        toast.error(errorData.error);
      } else {
        toast.error('An error occurred');
      }
    }catch(error){
      console.error("Error Creating A Task: ", error)
      toast.dismiss();
      toast.error('Failed to create task');
    }
  }
  console.log(formData)
  return (
    <div className="flex flex-col bg-card items-center justify-center h-screen py-2">
      <h1 className="text-lg font-semibold">Add An Item To Your To Do List</h1>
      <form className="w-1/3">
        <Input
          id='title'
          name='title'
          label='Title'
          type='text'
          required
          placeholder='Enter Title'
          disabled={disabled}
          value={formData.title}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label htmlFor="description" className="block text-sm font-medium leading-7 text-card-foreground">Description</label>
          <textarea id="description" name="description" placeholder="Enter Description" disabled={disabled } onChange={(event) => handleChange(event)} className={clsx(`block w-full min-h-20 rounded-md border-0 py-1.5 px-3 mb-2 text-card-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-sky-300`,disabled && 'opacity-100 cursor-default')}></textarea>
        </div>
        <Input
          id='date'
          name='date'
          label='Completed By'
          type='Date'
          required
          placeholder='Enter Date'
          disabled={disabled}
          value={formData.date}
          onChange={handleChange}
        />
        <Button type="submit" onClick={() => handleSubmit()} disabled={disabled}>Submit</Button>
      </form>
    </div>
  );
}
