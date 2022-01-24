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
    console.log(values);

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
    console.log(this.props);
    if (
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.entryId
    ) {
      this.setState({ entry: { ...this.props.location.state } });
    }
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {}

  // handleSubmit = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   console.log(values);
  //   try {
  //     if (!this.state.file) {
  //       alert("File should be selected");
  //       return;
  //     }

  //     alert("File was uploaded!");
  //   } catch (e) {
  //     alert("Could not upload a file: " + e);
  //   } finally {
  //     this.setUploadState(UploadState.NoUpload);
  //   }
  // };

  render() {
    const { entry } = this.state;
    console.log(entry);
    return (
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          this.handleSubmit(values, setSubmitting, this);
        }}
        enableReinitialize
      >
        {({ isSubmitting }, formProps) => (
          <Form>
            <div className='flex flex-col mb-4 w-60'>
              <label
                className='mb-2 font-bold text-md text-grey-darkest'
                htmlFor='title'
              >
                Title
              </label>
              <Field
                className='border py-2 px-3 text-grey-darkest'
                name='title'
              />
              <ErrorMessage name='title' component={Error} />
            </div>
            <div className='flex flex-col mb-4 w-2/3'>
              <label
                className='mb-2 font-bold text-md text-grey-darkest'
                htmlFor='title'
              >
                Description
              </label>
              <Field
                className='border py-2 px-3 text-grey-darkest'
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
                className='border py-2 px-3 text-grey-darkest'
                name='link'
              />
            </div>
            <div className='flex flex-col mb-4 w-60'>
              <label
                htmlFor='repeatingTimes'
                className='block font-bold text-gray-darkest'
              >
                Repeating times
              </label>
              <div className='mt-1 w-60'>
                <Field as='select' name='repeatingTimes' className='w-60 h-8'>
                  <option value={"onn"}>Please select</option>
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
              Save
            </button>
          </Form>
        )}
      </Formik>
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
