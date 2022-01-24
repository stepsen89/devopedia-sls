import React, { Fragment } from "react";
import { getEntries } from "../api/api";
import { Link } from "react-router-dom";
import { authConfig } from "../config";
import dateFormat from "dateformat";
import update from "immutability-helper";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateEntry, deleteEntry } from "../api/api";
class Home extends React.Component {
  state = {
    testing: true,
    loadingEntries: false,
    entries: [],
  };

  async componentDidMount() {
    try {
      const entries = await getEntries(this.props.auth.getIdToken());
      this.setState({
        entries,
        loadingEntries: false,
      });
    } catch (e) {
      alert(`Failed to fetch entries:`);
    }
  }

  onEditButtonClick = (entryId, entry) => {
    console.log(entryId);
    this.props.history.push({
      pathname: `/entries/${entryId}/edit`,
      state: entry,
    });
  };

  onLearnClick = (entry, index) => {
    const MySwal = withReactContent(Swal);

    console.log("link", entry.link);
    let content;
    if (entry.link) {
      console.log("link is there");
      content =
        `<div style="text-align: justify"> <b> Description: </b> ` +
        ` <p style="padding-top: 20px">${
          entry.description || "Oh nothing here .... "
        } </p></div> ` +
        `<hr style="padding-bottom: 20px; margin-top: 20px">` +
        `<div style="text-align: left"><b>More info:</b> ` +
        `<a href=${entry.link} target="_blank" style="color: blue" >${entry.link}</a></div>`;
    } else {
      content = `${entry.description || "no description"} `;
    }

    MySwal.fire({
      title: entry.title,
      text: entry.description,
      icon: "question",
      html: content,
      showConfirmButton: entry.done ? false : true,
      showCancelButton: true,
      confirmButtonText: "Got it!",
      cancelButtonText: entry.done ? "Cancel" : "No, not sure",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("has repeated it");
        console.log(entry.repeated);
        if (entry.repeated && entry.repeated < entry.repeatingTimes) {
          entry.repeated += 1;
        } else {
          entry.repeated = 1;
        }
        if (entry.repeatingTimes === entry.repeated) {
          entry.done = true;
        } else {
          entry.done = false;
        }
        console.log(entry);
        updateEntry(this.props.auth.getIdToken(), entry.entryId, entry).then(
          (e) => {
            this.setState({
              entries: update(this.state.entries, {
                [index]: { repeated: { $set: entry.repeated } },
                [index]: { done: { $set: entry.done } },
              }),
            });
          }
        );
      }
    });
  };

  deleteEntry = async (entryId: string) => {
    try {
      await deleteEntry(this.props.auth.getIdToken(), entryId);
      this.setState({
        entries: this.state.entries.filter(
          (entry) => entry.entryId !== entryId
        ),
      });
    } catch {
      alert("Entry deletion failed");
    }
  };

  render() {
    return (
      <Fragment>
        <div className='container flex justify-center flex-col mx-auto'>
          <Link
            className=' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-max self-center'
            to='/entries/new'
          >
            {" "}
            Create new entry{" "}
          </Link>
          {console.log(this.state.entries)}
          {this.state && this.state.entries && this.state.entries.length > 0 ? (
            <div className='flex flex-col mt-8 '>
              <div className='w-max self-center'>
                <div className='border-b border-gray-200 shadow'>
                  <table className='divide-y divide-gray-300 '>
                    <thead className='bg-blue-100'>
                      <tr>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Title
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Repeated
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Completed
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Added
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Action
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Edit
                        </th>
                        <th className='px-6 py-2 text-xs text-gray-500'>
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-300'>
                      {this.state &&
                        this.state.entries &&
                        this.state.entries.map((entry, index) => {
                          return (
                            <tr class='whitespace-nowrap' key={entry.entryId}>
                              <td class='px-6 py-4 text-sm text-gray-500'>
                                <div class='text-sm text-gray-900'>
                                  {entry.title}
                                </div>
                              </td>
                              <td class='px-6 py-4'>
                                <div class='text-sm text-gray-500'>
                                  {entry.repeatingTimes
                                    ? `${
                                        entry.repeated ? entry.repeated : "0"
                                      } / ${entry.repeatingTimes}`
                                    : " - "}
                                </div>
                              </td>
                              <td class='px-6 py-4'>
                                <div class='text-sm text-gray-500'>
                                  {entry.done ? "DONE" : ""}
                                </div>
                              </td>
                              <td class='px-6 py-4 text-sm text-gray-500'>
                                {dateFormat(entry.createdAt, "dd/mm/yyyy")}
                              </td>
                              <td class='px-6 py-4'>
                                <button
                                  onClick={() =>
                                    this.onLearnClick(entry, index)
                                  }
                                  class='px-4 py-1 text-sm text-black bg-yellow-200 rounded-full border-2 border-black'
                                >
                                  {entry.done ? "View" : "Learn"}
                                </button>
                              </td>
                              <td class='px-6 py-4'>
                                <button
                                  onClick={() =>
                                    this.onEditButtonClick(entry.entryId, entry)
                                  }
                                  class='px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full'
                                >
                                  Edit
                                </button>
                              </td>
                              <td class='px-6 py-4'>
                                <a
                                  href='#'
                                  class='px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full'
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <h2> No entries yet </h2>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
