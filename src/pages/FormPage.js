/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios'
import API from '../APIClient'

const { CancelToken } = axios

export default function FormPage() {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { addToast } = useToasts()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      routeName: '',
      topoGrade: '',
      numberOfTries: '',
      routeOrBoulder: '',
      crag: '',
      climber: '',
      date: '',
    },
  })

  const onSubmit = (data) => {
    setError('')
    setSubmitting(true)
    const setSubmittingFalse = () => setSubmitting(false)

    API.post('/activities', data)
      .then((res) => {
        addToast(`Well done for climbing ${res.data.routeName}. Congrats 🎉`, {
          appearance: 'success',
        })
        // history.push(`/activities/${res.data.id}`)
      })
      .catch(() => {
        setError('A problem occured. We cannot reccord this accent. 😕')
      })
      .finally(setSubmittingFalse)
  }

  useEffect(() => {
    let source = null
    source = CancelToken.source()

    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  return (
    <form id="form-ascent" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="routeName"
        control={control}
        label="Route Name"
        rules={{
          required: { value: true, message: 'required' },
        }}
        render={({ field }) => {
          return (
            <input
              disabled={submitting}
              className=""
              type="text"
              name={field.name}
              autoFocus
              placeholder={field.label}
            />
          )
        }}
      />
      {error && (
        <div className="form-error">
          <div>{error}</div>
        </div>
      )}
      <input type="submit" value="save" />
    </form>
  )
}
