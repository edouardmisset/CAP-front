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

  // Make use of useForm to handle the form update, its data and the submission.
  const { register, handleSubmit } = useForm({
    defaultValues: {
      numberOfTries: 1,
      routeOrBoulder: 'route',
      date: new Date().toISOString().split('T')[0],
    },
  })

  /**
   * @description Handles the CSV's parsing.
   * @date 08/09/2021
   * @param {*} [file]
   */
  const handleFile = async ([file]) => {
    setCsvData(
      (await parseCSV(file)).data.map((ascent) => ({
        routeName: ascent['Route Name'].toString(),
        topoGrade: ascent['Topo Grade'],
        date: new Date(ascent.Date),
        crag: ascent.Crag,
        climber: ascent.Climber,
        routeOrBoulder: ascent['Route / Boulder'].toLowerCase(),
        // Remove the text contained in this field using a regex.
        numberOfTries: parseInt(
          ascent['# Tries'].replace(/([ A-Za-z])\w+/g, ''),
          10
        ),
      }))
    )
  }

  /**
   * @description Handles the form submission.
   * While the form is submitting, it will display a 'is Loading message'.
   * @date 08/09/2021
   * @param {*} data
   */
  function sendAscents(data) {
    setSubmitting(true)
    API.post('/ascents', data)
      .then((res) => {
        addToast(res.data, {
          appearance: 'success',
        })
      })
      .catch((error) => {
        addToast('A error occured 💥. We could not reccord your accent. 😕', {
          appearance: 'error',
        })
        window.console.error(error)
      })
      .finally(() => setSubmitting(false))
  }

  const onSubmit = (data) => sendAscents([data])

  // This is a workaround to submit the content of the CSV when the user has selected a valid file.
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
        <label className="label" htmlFor="personalGrade">
          Personal Grade
          <input
            {...register('personalGrade')}
            placeholder="9a"
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
            disabled={submitting}
            className="form-input"
          />
        </label>
        <label className="label" htmlFor="routeOrBoulder">
          Route or Boulder
          <select {...register('routeOrBoulder')} disabled={submitting}>
            <option value="route">Route</option>
            <option value="boulder">Boulder</option>
          </select>
        </label>
        <label className="label" htmlFor="height">
          Height
          <input
            {...register('height')}
            type="number"
            placeholder="30"
            disabled={submitting}
            className="form-input"
          />
        </label>
        <label className="label" htmlFor="profile">
          Profile
          <select {...register('profile')} disabled={submitting}>
            <option value="">-</option>
            <option value="vertical">Vertical</option>
            <option value="slight-overhang">Slight Overhang</option>
            <option value="slab">Slab</option>
            <option value="overhang">Overhang</option>
            <option value="roof">Roof</option>
            <option value="traverse">Traverse</option>
          </select>
        </label>
        <label className="label" htmlFor="holds">
          Holds
          <select {...register('holds')} disabled={submitting}>
            <option value="">-</option>
            <option value="crimps">Crimps</option>
            <option value="jugs">Jugs</option>
            <option value="pinches">Pinches</option>
            <option value="sloppers">Sloppers</option>
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
        <label className="label" htmlFor="sector">
          Sector
          <input
            {...register('sector')}
            type="text"
            placeholder="Cascade"
            disabled={submitting}
            className="form-input"
          />
        </label>
        <label className="label" htmlFor="region">
          Region
          <input
            {...register('region')}
            type="text"
            placeholder="Hautes-Alpes"
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
            placeholder="John Doe"
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
