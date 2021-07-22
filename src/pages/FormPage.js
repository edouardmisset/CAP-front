/* eslint-disable jsx-a11y/no-autofocus */
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import API from '../APIClient'
import FileInput from '../components/FileInput'
import parseCSV from '../utilities/parseCSV'

export default function FormPage() {
  const [submitting, setSubmitting] = useState(false)
  const [csvData, setCsvData] = useState([])
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

  const handleFile = async ([file]) => {
    setCsvData(
      (await parseCSV(file)).data.map((ascent) => ({
        routeName: ascent['Route Name'].toString(),
        topoGrade: ascent['Topo Grade'],
        date: new Date(ascent.Date),
        crag: ascent.Crag,
        climber: ascent.Climber,
        routeOrBoulder: ascent['Route / Boulder'].toLowerCase(),
        numberOfTries: parseInt(
          ascent['# Tries'].replace(/([ A-Za-z])\w+/g, ''),
          10
        ),
      }))
    )
  }

  function sendAscents(data) {
    setSubmitting(true)
    console.log(data)
    API.post('/ascents', data)
      .then((res) => {
        addToast(res.data, {
          appearance: 'success',
        })
      })
      .catch((error) => {
        addToast('A problem occured. We could not reccord this accent. 😕', {
          appearance: 'error',
        })
        window.console.error(error)
      })
      .finally(() => setSubmitting(false))
  }

  const onSubmit = (data) => {
    sendAscents([data])
  }

  useEffect(() => {
    if (csvData.length > 0) {
      sendAscents(csvData)
    }
  }, [csvData])

  return (
    <>
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
          form="form-ascent"
          className="btn save"
        >
          Save
        </button>
      </form>
      <FileInput className="" value="" onChange={handleFile} />
    </>
  )
}
