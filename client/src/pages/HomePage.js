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
    this.props.history.push({
      pathname: `/entries/${entryId}/edit`,
      state: entry,
    });
  };

  onLearnClick = (entry, index) => {
    const MySwal = withReactContent(Swal);

    let content;
    if (entry.link) {
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

  onDeleteButtonClick = async (entryId: string) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete entry",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteEntry(this.props.auth.getIdToken(), entryId).then((e) => {
            MySwal.fire("Deleted!", "Your entry has been deleted.", "success");

            this.setState({
              entries: this.state.entries.filter(
                (entry) => entry.entryId !== entryId
              ),
            });
          });
        } catch {
          alert("Entry deletion failed");
        }
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div className='container flex flex-col pt-3  h-5/6'>
          <Link
            className=' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-max self-end'
            to='/entries/new'
          >
            {" "}
            Create new entry{" "}
          </Link>
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
                                <button
                                  onClick={() =>
                                    this.onDeleteButtonClick(entry.entryId)
                                  }
                                  class='px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full'
                                >
                                  Delete
                                </button>
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
            <div className=' self-center mt-60 text-center'>
              <h2 className='font-bold text-2xl'> No entries yet </h2>
              <h5 className='font-thin text-gray-900 text-lg pt-5 leading-tight'>
                {" "}
                Click on "Create new entry" to start your journey
              </h5>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
