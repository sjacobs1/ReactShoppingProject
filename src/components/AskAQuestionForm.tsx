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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
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
      <label htmlFor="question">Ask your question</label>
      <input
        type="text"
        id="question"
        name="question"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.question}
      />{' '}
      {formik.touched.question && formik.errors.question ? (
        <div>{formik.errors.question}</div>
      ) : null}
      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        Submit
      </button>
      <ToastContainer />
    </form>
  )
}

export default AskAQuestionForm
