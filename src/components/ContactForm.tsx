//@ts-ignore
import { useSubmit } from "react-router-dom"
import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseTodo, chooseWhen, chooseWhere, chooseW_who, chooseHow_long } from "../redux/slices/RootSlice"

interface ContactFormProps {
  id?: string[];
  onClose: () => void;
}

const ContactForm = ( props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    console.log(data.user_token)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.to_do } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 5000);
      event.target.reset()
    } else {
      dispatch(chooseTodo(data.to_do));
      dispatch(chooseWhen(data.when));
      dispatch(chooseWhere(data.where));
      dispatch(chooseW_who(data.w_who));
      dispatch(chooseHow_long(data.how_long));

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()

      props.onClose();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="to_do">Todo</label>
          <Input {...register('to_do')} name='to_do' placeholder="Todo" />
        </div>
        <div>
          <label htmlFor="when">When</label>
          <Input {...register('when')} name='when' placeholder="When" />
        </div>
        <div>
          <label htmlFor="where">Where</label>
          <Input {...register('where')} name='where' placeholder="Where" />
        </div>
        <div>
          <label htmlFor="w_who">With Who</label>
          <Input {...register('w_who')} name='w_who' placeholder="With Who" />
        </div>
        <div>
          <label htmlFor="how_long">How Long</label>
          <Input {...register('how_long')} name='how_long' placeholder="How Long" />
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm