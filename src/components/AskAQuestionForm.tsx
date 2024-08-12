import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AskAQuestionForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      question: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      question: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .required('Required'),
    }),
    onSubmit: () => {
      toast.success('Form submitted successfully!')
      setTimeout(() => {
        formik.setSubmitting(false)
        formik.resetForm()
      }, 6000)
    },
  })

  return (
    <div className="p-4 mt-4">
      <div className="card card-compact p-4 flex flex-col justify-center bg-slate-700 max-w-4xl">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-col mb-10">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white rounded-sm"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />{' '}
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col mb-10">
            <label className="text-white" htmlFor="question">
              Ask your question
            </label>
            <textarea
              className="bg-white rounded-sm"
              id="question"
              name="question"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
            />{' '}
            {formik.touched.question && formik.errors.question ? (
              <div>{formik.errors.question}</div>
            ) : null}
          </div>

          <button
            className="btn bg-slate-200 text-black"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  )
}

export default AskAQuestionForm
