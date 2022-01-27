import React, { PureComponent, ChangeEvent } from 'react';
import Auth from '../auth/Auth';
import { getUploadUrl, uploadFile } from '../api/api';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withRouter } from 'react-router-dom';

interface UploadFileProps {
  match: {
    params: {
      entryId: string
    }
  },
  auth: Auth
};

interface UploadFileState {
  file: any,
  uploadState: string,
};

class UploadFilePage extends PureComponent<
  UploadFileProps,
  UploadFileState
> {
  state: UploadFileState = {
    file: undefined,
    uploadState: "none"
  }

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0],
      name: "test"
    })
  }

  handleSubmit = async (event) => {
    const MySwal = withReactContent(Swal);

    event.preventDefault()

    try {
      if (!this.state.file) {
        MySwal.fire({
          title: `You need to select a file!`,
          icon: "question",
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }

      this.setState({ uploadState: "fetching" })
      const uploadUrl = await getUploadUrl(
        this.props.auth.getIdToken(),
        this.props.match.params.entryId
      )

      this.setState({ uploadState: "uploading" })
      await uploadFile(uploadUrl, this.state.file)

      MySwal.fire({
        title: `File was uploaded!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (e) {
      MySwal.fire({
        icon: "error",
        title: "Oh no...",
        text: "Could not upload file!",
      });
    } finally {
      this.setState({ uploadState: "none" });
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className='mx-10'>
        <h3 className='text-2xl text-gray-500 font-bold mb-10 mt-10'>
          Upload File
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div class="upload-btn-wrapper">
            <button class="btn" onChange={this.handleFileChange}
            >Choose a file to upload</button>
            <input type="file" onChange={this.handleFileChange} name="myfile" accept='image/*' placeholder="Image to upload" />
          </div>
          {!this.state.file ? (
            <p className="mt-6"> No file selected </p>
          ) : (this.state.file && this.state.file.name ? (
            <p className="mt-6"> <b> File to upload: </b> {this.state.file.name}</p>

          ) : (<p> test </p>)

          )
          }
          {this.renderButton()}
        </form>
      </div>
    )
  }

  renderButton() {
    return (
      <div className="mt-12">
        {
          this.state.uploadState === "fetching" && (
            <p>Uploading image metadata</p>
          )
        }
        {
          this.state.uploadState === "uploading" && (
            <p className="mb-5">Uploading file</p>
          )
        }
        <button
          className=' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'

          loading={this.state.uploadState !== "none"}
          type="submit"
        >
          {(this.state.uploadState === "fetching" || this.state.uploadState === "uploading") ? "Loading" : "Submit"}
        </button>
      </div>
    )
  }
}

export default withRouter(UploadFilePage);
