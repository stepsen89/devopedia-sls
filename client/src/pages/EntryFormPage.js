import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom";
import { createEntry, updateEntry } from "../api/api";
import { History } from "history";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Auth from "../auth/Auth";

interface CreateNewProps {
  auth: Auth;
}

class EntryFormPage extends Component<CreateNewProps> {
  state = {
    entry: {
      title: "",
      description: "",
      link: "",
      repeated: 0,
      repeatingTimes: "",
      done: false,
    },
  };

  handleSubmit(values, setSubmitting, $this) {
    const MySwal = withReactContent(Swal);
    setSubmitting(false);
    let draft = {
      ...values,
      repeatingTimes: Number(values.repeatingTimes),
    };

    if (values.entryId) {
      updateEntry(this.props.auth.getIdToken(), values.entryId, draft)
        .then((d) => {
          MySwal.fire({
            title: `Saved!`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          });
          this.props.history.push("/");
        })
        .catch((e) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setSubmitting(false);
          console.error(e);
        });
    } else {
      createEntry(this.props.auth.getIdToken(), draft)
        .then((d) => {
          MySwal.fire({
            title: `Saved!`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          });
          this.props.history.push("/");
        })
        .catch((e) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setSubmitting(false);
          console.error(e);
        });
    }
  }

  componentDidMount() {
    if (
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.entryId
    ) {
      this.setState({ entry: { ...this.props.location.state } });
    }
  }

  render() {
    const { entry } = this.state;
    return (
      <div className='container flex justify-center flex-col mx-auto mt-30'>
        <Formik
          initialValues={entry}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            if (!values.description) {
              errors.description = "Description is required";
            }

            if (values.link) {
              try {
                let u = new URL(values.link);
              } catch (e) {
                console.error(e);
                errors.link = "No valid link";
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.handleSubmit(values, setSubmitting, this);
          }}
          enableReinitialize
        >
          {({ isSubmitting }, formProps) => (
            <div className='mx-10'>
              <h3 className='text-2xl text-gray-500 font-bold mb-10 mt-10'>
                {" "}
                {this.state && this.state.entry && this.state.entry.entryId
                  ? "Edit entry"
                  : "Create new entry"}
              </h3>
              <Form>
                <div className='flex flex-col mb-4 w-60'>
                  <label
                    className='mb-2 font-bold text-md text-grey-darkest'
                    htmlFor='title'
                  >
                    Title
                  </label>
                  <Field
                    className='border-2 border-gray-500 rounded-lg py-2 px-3 text-grey-darkest'
                    name='title'
                  />
                  <ErrorMessage name='title' component={Error} />
                </div>
                <div className='flex flex-col mb-4 w-2/3'>
                  <label
                    className='mb-2 font-bold text-md text-grey-darkest'
                    htmlFor='description'
                  >
                    Description
                  </label>
                  <Field
                    className='border-2 border-gray-500 rounded-lg py-2 px-3 text-grey-darkest'
                    name='description'
                  />
                  <ErrorMessage name='description' component={Error} />
                </div>
                <div className='flex flex-col mb-4 w-2/3'>
                  <label
                    className='mb-2 font-bold text-md text-grey-darkest'
                    htmlFor='link'
                  >
                    Link
                  </label>
                  <Field
                    className='border-2 border-gray-500 rounded-lg py-2 px-3 text-grey-darkest'
                    name='link'
                  />
                  <ErrorMessage name='link' component={Error} />
                </div>
                <div className='flex flex-col mb-4 w-60'>
                  <label
                    htmlFor='repeatingTimes'
                    className='block font-bold text-gray-darkest'
                  >
                    Repeating times
                  </label>
                  <div className='mt-1 w-60 bg-gray-600 rounded-md border-6 border-gray-700'>
                    <Field
                      className='flex items-center p-2 bg-gray-600 rounded-md border-6 border-gray-700'
                      as='select'
                      name='repeatingTimes'
                      className='w-60 h-8'
                    >
                      <option
                        className='bg-gray-100 rounded-md border-6 border-gray-700'
                        value={"onn"}
                      >
                        Please select
                      </option>
                      <option value={5}>5 times</option>
                      <option value={10}>10 times</option>
                      <option value={15}>15 times</option>
                    </Field>
                  </div>
                </div>

                {/* <Field type='text' name='title' /> */}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className=' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                >
                  {isSubmitting ? "Saving ... " : "Save"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

const Error = ({ children, ...props }) => {
  return (
    <div className='mt-2 mb-2 text-red-500' {...props}>
      {children}
    </div>
  );
};

export default withRouter(EntryFormPage);
