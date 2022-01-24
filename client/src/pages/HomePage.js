import React, { Fragment } from "react";
import { getEntries } from "../api/api";
import { Link } from "react-router-dom";
import { authConfig } from "../config";
import dateFormat from "dateformat";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
class Home extends React.Component {
  state = {
    testing: true,
    loadingEntries: false,
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

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/entries/${todoId}/edit`);
  };

  onLearnClick = (entry) => {
    const MySwal = withReactContent(Swal);

    console.log("link", entry.link);
    let content;
    if (entry.link) {
      console.log("link is there");
      content =
        `${entry.description || "no description"} ` +
        `<hr>` +
        `<a href="//sweetalert2.github.io">${entry.link}</a>`;
    } else {
      content = `${entry.description || "no description"} `;
    }

    MySwal.fire({
      title: entry.title,
      text: entry.description,
      icon: "question",
      html: content,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Got it!",
      cancelButtonText: "Not sure",
    }).then((e) => console.log(e));
  };

  render() {
    return (
      <Fragment>
        <div class='container flex justify-center flex-col mx-auto'>
          <Link
            className=' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-max self-center'
            to='/entries/new'
          >
            {" "}
            Create new entry{" "}
          </Link>

          {this.state && this.state.entries && this.state.entries.length > 0 ? (
            <div class='flex flex-col mt-8 '>
              <div class='w-max self-center'>
                <div class='border-b border-gray-200 shadow'>
                  <table class='divide-y divide-gray-300 '>
                    <thead class='bg-blue-100'>
                      <tr>
                        <th class='px-6 py-2 text-xs text-gray-500'>Title</th>
                        <th class='px-6 py-2 text-xs text-gray-500'>
                          Repeated
                        </th>
                        <th class='px-6 py-2 text-xs text-gray-500'>
                          Completed
                        </th>
                        <th class='px-6 py-2 text-xs text-gray-500'>Learn</th>
                        <th class='px-6 py-2 text-xs text-gray-500'>Edit</th>
                        <th class='px-6 py-2 text-xs text-gray-500'>Delete</th>
                      </tr>
                    </thead>
                    <tbody class='bg-white divide-y divide-gray-300'>
                      {this.state &&
                        this.state.entries &&
                        this.state.entries.map((entry) => {
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
                              <td class='px-6 py-4 text-sm text-gray-500'>
                                {dateFormat(entry.createdAt, "dd/mm/yyyy")}
                              </td>
                              <td class='px-6 py-4'>
                                <button
                                  onClick={() => this.onLearnClick(entry)}
                                  class='px-4 py-1 text-sm text-black bg-yellow-200 rounded-full border-2 border-black'
                                >
                                  Learn
                                </button>
                              </td>
                              <td class='px-6 py-4'>
                                <a
                                  href='#'
                                  class='px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full'
                                >
                                  Edit
                                </a>
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
