/* eslint-disable jsx-a11y/no-autofocus */
import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import API from '../APIClient'

export default function FormPage() {
  const [submitting, setSubmitting] = useState(false)
  const { addToast } = useToasts()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      routeName: '',
      topoGrade: '',
      numberOfTries: 1,
      routeOrBoulder: 'route',
      crag: '',
      climber: '',
      date: dayjs(new Date()).format('YYYY-MM-DD'),
    },
  })

  const setSubmittingFalse = () => setSubmitting(false)

  const onSubmit = (data) => {
    setSubmitting(true)

    API.post('/ascents', data)
      .then((res) => {
        addToast(`Well done for climbing ${res.data.routeName}. Congrats 🎉`, {
          appearance: 'success',
        })
      })
      .catch(() => {
        addToast('A problem occured. We could not reccord this accent. 😕', {
          appearance: 'error',
        })
      })
      .finally(setSubmittingFalse)
  }

  return (
    <form id="form-ascent" onSubmit={handleSubmit(onSubmit)}>
      <label className="label" htmlFor="routeName">
        Route Name
        <input
          {...register('routeName', {
            required: { value: true, message: 'required' },
          })}
          autoFocus
          placeholder="Biographie"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <label className="label" htmlFor="topoGrade">
        Topo Grade
        <input
          {...register('topoGrade', {
            required: { value: true, message: 'required' },
          })}
          placeholder="9a+"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <label className="label" htmlFor="numberOfTries">
        Number of tries
        <input
          {...register('numberOfTries', {
            required: { value: true, message: 'required' },
            min: {
              value: 1,
              message:
                'Only Chuck Norris can climb a rock in less than one try. Are you Chuck?',
            },
          })}
          type="number"
          placeholder="3"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <label className="label" htmlFor="routeOrBoulder">
        Route or Boulder
        <select {...register('routeOrBoulder')} defaultValue="route">
          <option value="route">Route</option>
          <option value="boulder">Boulder</option>
        </select>
      </label>
      <label className="label" htmlFor="crag">
        Crag
        <input
          {...register('crag', {
            required: { value: true, message: 'required' },
          })}
          type="text"
          placeholder="Ceüse"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <label className="label" htmlFor="climber">
        Climber
        <input
          {...register('climber', {
            required: { value: true, message: 'required' },
          })}
          type="text"
          placeholder="Chris Sharma"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <label className="label" htmlFor="date">
        Date
        <input
          {...register('date', {
            required: { value: true, message: 'required' },
          })}
          type="date"
          disabled={submitting}
          className="form-input"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        onSubmit={handleSubmit(onSubmit)}
        form="form-ascent"
        className="btn save"
      >
        Save
      </button>
    </form>
  )
}
