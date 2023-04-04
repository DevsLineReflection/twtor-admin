import {
  faArrowUpRightFromSquare,
  faCommentDots,
  faShare,
  faShareNodes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useCreateChapterMutation } from "src/features/chapter/chapterApi";
import {
  useCreateSolutionPopularityMutation,
  useGetUserSolutionPopularityQuery,
} from "src/features/popularity/popularityApi";
import { useCreateProblemMutation } from "src/features/problem/problemApi";
import { useCreateSolutionMutation } from "src/features/solution/solutionApi";
import Loader from "./utils/Loader";
import CKClassicEditor from "./CKClassicEditor";
import { Helmet } from "react-helmet";

function StudyGroupNavigation({ studygroup, isOwner, isMember }) {
  const [createChapter, { isLoading: chapterIsLoading }] =
    useCreateChapterMutation();
  const [createProblem, { isLoading: problemIsLoading }] =
    useCreateProblemMutation();
  const [createSolution, { isLoading: solutionIsLoading }] =
    useCreateSolutionMutation();
  const [createSolutionPopularity, { isLoading: likeIsLoading }] =
    useCreateSolutionPopularityMutation();

  const {
    data: userSolutionPopularity,
    isLoading,
    error,
  } = useGetUserSolutionPopularityQuery();

  const [likeSolutionProblem, setLikeSolutionProblem] = useState([]);

  const [chapterName, setChapterName] = useState("");
  const [singleChapterDetails, setSingleChapterDetails] = useState({});
  const [problemText, setProblemText] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [soluationText, setSoluationText] = useState({});
  const [soluationAudio, setSoluationAudio] = useState({});
  const [soluationVideo, setSoluationVideo] = useState({});
  const [selectedProblemId, setSelectedProblemId] = useState(0);
  const [selectedTreeProblemId, setSelectedTreeProblemId] = useState(0);

  let treeMenus =
    studygroup &&
    studygroup.books &&
    studygroup.books.length > 0 &&
    studygroup.books[0].chapter
      ? studygroup.books[0].chapter
      : [];

  const chapterTreeToggle = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  const problemOpenClose = (e) => {
    e.currentTarget.parentElement.parentElement.children[1].classList.toggle(
      "hidden"
    );
  };

  const getChapterDetails = (chapter_id) => {
    setSingleChapterDetails(treeMenus.find((i) => i.id === chapter_id));
  };

  useEffect(() => {
    if (singleChapterDetails.id) {
      getChapterDetails(singleChapterDetails.id);
    } else {
      if (treeMenus.length > 0) {
        getChapterDetails(treeMenus[0].id);
      }
    }
  }, [treeMenus]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      window.location.reload();
    };
  }, []);

  const handleChangeSolutionText = (problem_id, data) => {
    setSoluationText((prev) => {
      return { ...prev, ["p" + problem_id]: data };
    });
  };
  const handleChangeSolutionAudio = (problem_id, file) => {
    setSoluationAudio((prev) => {
      return { ...prev, ["p" + problem_id]: file };
    });
  };
  const handleChangeSolutionVideo = (problem_id, file) => {
    setSoluationVideo((prev) => {
      return { ...prev, ["p" + problem_id]: file };
    });
  };

  const handleChangeTreeProblem = (problem_id) => {
    setSelectedTreeProblemId(problem_id);
  };

  const addProblem = () => {
    createProblem({
      chapter_id: singleChapterDetails.id,
      studygroup_id: studygroup.id,
      book_id: singleChapterDetails.book_id,
      title: problemTitle,
      description: problemText,
    }).then((res) => {
      setProblemText("");
    });
  };

  const addSolution = (problem_id) => {
    setSelectedProblemId(problem_id);

    let data = {
      problem_id: problem_id,
      studygroup_id: studygroup.id,
      book_id: singleChapterDetails.book_id,
      chapter_id: singleChapterDetails.id,
      details_solution: soluationText["p" + problem_id],
      title: problemText,
    };
    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("solution_audio", soluationAudio["p" + problem_id]);
    formData.append("solution_video", soluationVideo["p" + problem_id]);

    createSolution(formData).then((res) => {
      setSoluationText((prev) => {
        return { ...prev, ["p" + problem_id]: "" };
      });
      setSoluationAudio((prev) => {
        return { ...prev, ["p" + problem_id]: "" };
      });
      setSoluationVideo((prev) => {
        return { ...prev, ["p" + problem_id]: "" };
      });
      document.getElementById(
        `problem_solution_audio_file_${problem_id}`
      ).value = "";
      document.getElementById(
        `problem_solution_video_file_${problem_id}`
      ).value = "";
    });
  };

  const submitChapter = (e) => {
    e.preventDefault();
    createChapter({
      studygroup_id: studygroup.id,
      title: chapterName,
      book_id: studygroup.books[0].id,
    }).then(() => {
      setChapterName("");
    });
  };

  const likeSolution = (problemId, slutionId) => {
    // setLikeSolutionProblem(prev => {
    //
    //     let copy = [...prev]

    //     let findIndex = copy.findIndex(item => item.type_id == slutionId)
    //     let findUserLikeIndex = userSolutionPopularity.findIndex(
    //         item => item.type_id == slutionId,
    //     )

    //     if (findIndex >= 0) {
    //         copy = [
    //             ...copy,
    //             { type_id: slutionId, type: findUserLikeIndex < 0 },
    //         ]
    //         return copy
    //     } else {
    //         copy[findIndex] = {
    //             ...copy[findIndex],
    //             type: !copy[findIndex].type,
    //         }

    //         return copy
    //     }
    // })
    let data = {
      type_id: slutionId,
      problem_id: problemId,
      studygroup_id: studygroup.id,
      book_id: singleChapterDetails.book_id,
      chapter_id: singleChapterDetails.id,
      type: 0,
    };
    createSolutionPopularity(data);
  };

  return (
    <>
      <style jsx>
        {`
          .chapter-tree-menu li.chapter {
            max-height: 35px;
            overflow: hidden;
            position: relative;
            padding-left: 20px;
            padding-top: 5px;
            padding-bottom: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .chapter-tree-menu li.chapter ul {
            padding-left: 16px;
          }

          .chapter-tree-menu li.chapter.active {
            max-height: inherit;
          }

          .chapter-tree-menu li.chapter .chapter-icon {
            position: absolute;
            left: 6px;
            top: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .chapter-tree-menu li.chapter.active .chapter-icon {
            transform: rotate(90deg);
          }
        `}
      </style>
      {/* <Helmet>
        <script src="https://cdn.tailwindcss.com" id="id_tailwind" />
      </Helmet> */}

      {studygroup ? (
        <div className="flex justify-between mt-5">
          <div className="w-1/4 border border-gray-400 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 py-2 pl-5 border-b-2">
              Chapter Name ({treeMenus.length})
            </h3>
            <ul className="chapter-tree-menu">
              {treeMenus.map((val, index) => (
                <>
                  <li
                    className={`chapter border-b-2 ${
                      val.id === singleChapterDetails.id && "font-bold"
                    }`}
                  >
                    {val.problems.length !== 0 && (
                      <div className="chapter-icon" onClick={chapterTreeToggle}>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 6L0 12L-5.24537e-07 0L6 6Z"
                            fill="#262626"
                          />
                        </svg>
                      </div>
                    )}
                    <span
                      onClick={() => {
                        getChapterDetails(val.id);
                        setSelectedTreeProblemId(0);
                      }}
                    >
                      {index + 1}. {val.title}
                    </span>
                    {val.problems.length !== 0 && (
                      <ul className="problems">
                        {val.problems.map((problem, key) => (
                          <li
                            className={`${
                              selectedTreeProblemId == problem.id
                                ? "font-bold"
                                : "font-normal"
                            }`}
                            onClick={() => handleChangeTreeProblem(problem.id)}
                          >
                            {index + 1}.{key + 1}{" "}
                            {problem.title
                              .replace(/<[^>]*>?/gm, "")
                              .slice(0, 25) +
                              (problem.title.length > 25 ? "..." : "")}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </>
              ))}

              <li>
                <div className="mt-3 px-2 relative">
                  <form onSubmit={submitChapter}>
                    <input
                      type="text"
                      id="default-input"
                      value={chapterName}
                      onChange={(e) => setChapterName(e.target.value)}
                      placeholder="Create New Chapter"
                      disabled={chapterIsLoading}
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </form>
                  {chapterIsLoading && (
                    <Loader
                      className="absolute top-1 right-1"
                      width="w-8"
                      height="h-8"
                    />
                  )}
                </div>
              </li>
            </ul>
          </div>
          {treeMenus.length > 0 ? (
            <div className="w-3/4 pl-10">
              {selectedTreeProblemId == 0 && (
                <h2 className="flex items-center mb-3 justify-between w-full p-3 font-medium text-left text-black border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>{singleChapterDetails.title}</span>
                </h2>
              )}
              {singleChapterDetails?.problems?.length > 0 ? (
                <>
                  {singleChapterDetails?.problems?.map((problem) => (
                    <div
                      id="accordion-collapse"
                      className={`mb-5 ${
                        selectedTreeProblemId == problem.id
                          ? ""
                          : selectedTreeProblemId == 0
                          ? ""
                          : "hidden"
                      }`}
                      data-accordion="collapse"
                    >
                      <h2 id="accordion-collapse-heading-1">
                        <button
                          type="button"
                          onClick={problemOpenClose}
                          className="flex items-center justify-between w-full p-3 font-medium text-left text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          data-accordion-target="#accordion-collapse-body-1"
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: problem.title,
                            }}
                          ></span>
                          <svg
                            data-accordion-icon=""
                            className="w-6 h-6 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </h2>
                      <div
                        id="accordion-collapse-body-1"
                        className=""
                        aria-labelledby="accordion-collapse-heading-1"
                      >
                        <div className="p-3 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                          {problem?.description && (
                            <div className="mb-5">
                              <h2 className="font-bold">Problem</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: problem?.description,
                                }}
                              ></div>
                            </div>
                          )}
                          {problem.soluation.length > 0 ? (
                            <>
                              {problem.soluation.map((soluation, index) => (
                                <>
                                  <h4 className="font-semibold">
                                    Soluation {index + 1}
                                  </h4>
                                  <div className="mb-3 bg-slate-100 rounded p-3 border border-slate-300">
                                    <h4
                                      className="text-md"
                                      dangerouslySetInnerHTML={{
                                        __html: soluation.details_solution,
                                      }}
                                    ></h4>
                                  </div>
                                  {/* <div className="flex justify-center ">
                                    {soluation.solution_video ? (
                                      <div className="mb-3 bg-slate-100 rounded p-3 border border-slate-300">
                                        <b className="font-bold">
                                          Explanation Video
                                        </b>
                                        <video width="320" controls>
                                          <source
                                            src={
                                              process.env
                                                .NEXT_PUBLIC_BACKEND_URL +
                                              "/storage/books/" +
                                              soluation.solution_video
                                            }
                                            type="video/mp4"
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    {soluation.solution_file ? (
                                      <div className="mb-3 bg-slate-100 rounded p-3 border border-slate-300">
                                        <b className="font-bold">
                                          Explanation Audio
                                        </b>
                                        <div className="flex justify-center items-center border border-blue-400 rounded-sm mt-5">
                                          <audio controls>
                                            <source
                                              src={
                                                process.env
                                                  .NEXT_PUBLIC_BACKEND_URL +
                                                "/storage/books/" +
                                                soluation.solution_file
                                              }
                                              type="audio/mpeg"
                                            />
                                            Your browser does not support the
                                            video tag.
                                          </audio>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div> */}
                                  <div className="flex justify-end">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() =>
                                        likeSolution(problem.id, soluation.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        className={`${
                                          userSolutionPopularity.findIndex(
                                            (item) =>
                                              item.type_id == soluation.id
                                          ) >= 0
                                            ? //     ||
                                              // likeSolutionProblem?.findIndex(
                                              //     item =>
                                              //         item.type_id ==
                                              //             soluation.id &&
                                              //         item.type,
                                              // ) >=
                                              //     0
                                              "text-blue-400"
                                            : "text-gray-400"
                                        }`}
                                        icon={faThumbsUp}
                                      />{" "}
                                      {soluation.total_popularity
                                        ? soluation.total_popularity.length
                                        : 0}
                                    </div>
                                    <div className="mx-5">
                                      <FontAwesomeIcon
                                        className="text-gray-400"
                                        icon={faCommentDots}
                                      />{" "}
                                      10
                                    </div>
                                    <div>
                                      <FontAwesomeIcon
                                        className="text-gray-400"
                                        icon={faShareNodes}
                                      />
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          ) : (
                            <h4 className="font-semibold text-center">
                              No Soluations Added Yet
                            </h4>
                          )}

                          <div className="">
                            <h4 className="font-semibold text-md">
                              Add Soluation
                            </h4>
                            <div className="">
                              <CKClassicEditor
                                setData={(data) => {
                                  handleChangeSolutionText(problem.id, data);
                                }}
                                data={soluationText["p" + problem.id]}
                                placeholderText={"Details Solution..."}
                              />
                              <div className="flex justify-between py-3">
                                <div className="">
                                  <label
                                    htmlFor="descriptiton"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Explanation Video
                                  </label>
                                  <input
                                    type="file"
                                    id={`problem_solution_audio_file_${problem.id}`}
                                    onChange={(e) => {
                                      handleChangeSolutionVideo(
                                        problem.id,
                                        e.target.files[0]
                                      );
                                    }}
                                  />
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="descriptiton"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Explanation Audio
                                  </label>
                                  <input
                                    type="file"
                                    id={`problem_solution_video_file_${problem.id}`}
                                    onChange={(e) => {
                                      handleChangeSolutionAudio(
                                        problem.id,
                                        e.target.files[0]
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  className="bg-blue-400 pr-2 flex text-white font-semibold hover:text-white py-1 px-2 text-sm border border-blue-400 hover:border-transparent rounded mt-2"
                                  onClick={() => addSolution(problem.id)}
                                >
                                  {solutionIsLoading &&
                                    problem.id === selectedProblemId && (
                                      <Loader width="w-4" height="h-4" />
                                    )}{" "}
                                  {solutionIsLoading &&
                                  problem.id === selectedProblemId
                                    ? "Saving Soluation"
                                    : "Add Soluation"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-center">
                    No Problems Added Yet
                  </h4>
                </>
              )}

              <div className={`mt-3 ${selectedTreeProblemId != 0 && "hidden"}`}>
                <h4 className="font-semibold text-md">Add Problem</h4>
                <div className="">
                  <input
                    className={`appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500}`}
                    type="text"
                    placeholder="Problem Title"
                    onChange={(e) => setProblemTitle(e.target.value)}
                    value={problemTitle}
                  />
                  <CKClassicEditor
                    setData={(data) => {
                      setProblemText(data);
                    }}
                    data={problemText}
                    placeholderText={"Description..."}
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-400 pr-2 flex text-white font-semibold hover:text-white py-1 px-2 text-sm border border-blue-400 hover:border-transparent rounded mt-2"
                      onClick={() => addProblem()}
                      disabled={problemIsLoading}
                    >
                      {problemIsLoading && <Loader width="w-4" height="h-4" />}
                      {problemIsLoading ? "Saving Problem ..." : "Add Problem"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-3/4 pl-10">No Chapter Created</div>
          )}
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default StudyGroupNavigation;
