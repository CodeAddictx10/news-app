/* eslint-disable no-case-declarations */
import React from "react";
import { Edit } from "../components/icons";
import { useUser } from "../Api/useUser";
import { useCategory } from "../Api/useCategory";
import { useSource } from "../Api/useSource";
import { useNavigate } from "react-router-dom";
import Loader from "../components/icons/Loader";
import { ISourceCategory, IUser } from "../types";
import axios from "axios";
import { mutate } from "swr";
import { useAuthor } from "../Api/useAuthor";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userData, setUserdata] = React.useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const { categories, isLoading: isCategoryLoading } = useCategory();
  const { authors, isLoading: isAuthorLoading } = useAuthor();
  const { sources, isLoading: isSourceLoading } = useSource();
  const [edit, setEdit] = React.useState(false);

  if (!user) navigate("/login", { replace: true });

  const saveSettings = () => {
    setIsLoading(true);
    try {
      axios.post("/v1/auth", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEdit(false);
      mutate("/v1/users");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkBoxHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { name, checked } = e.target;

    switch (key) {
      case "catgeories":
        const prevCategories = userData?.settings.categories;
        const newCategories = checked
          ? [...prevCategories, name]
          : prevCategories.filter((item) => item !== name);
        setUserdata({
          ...userData,
          settings: {
            ...userData.settings,
            categories: newCategories,
          },
        });
        break;
      case "sources":
        const prevSources = userData?.settings.sources;
        const newSources = checked
          ? [...prevSources, name]
          : prevSources.filter((item) => item !== name);
        setUserdata({
          ...userData,
          settings: {
            ...userData.settings,
            sources: newSources,
          },
        });
        break;
      case "authors":
        const prevAuthors = userData?.settings.authors;
        const newAuthors = checked
          ? [...prevAuthors, name]
          : prevAuthors.filter((item) => item !== name);
        setUserdata({
          ...userData,
          settings: {
            ...userData.settings,
            authors: newAuthors,
          },
        });
        break;
    }
  };

  React.useEffect(() => {
    if (user) setUserdata(user);
  }, [user]);

  return (
    <section className="flex flex-wrap items-center justify-between max-w-screen-xl px-5 mx-auto space-y-5">
      <div className="w-full p-4 border md:border-black">
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-body dark:text-white">
            Profile
          </h2>
          <p className="text-sm font-light font-body dark:text-white">
            Manage your personal information and News Prefrences
          </p>
        </div>
        <div className="w-full my-4 border-b border-black">
          <div className="flex justify-between">
            <h3 className="w-1/3 mb-4 font-semibold font-body text-md dark:text-white">
              Account
            </h3>
            <button onClick={() => setEdit(!edit)}>
              <Edit />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-4 space-x-4">
              <div className="w-1/3 text-sm font-body dark:text-white">
                First Name
              </div>
              <div className="">
                <input
                  type="text"
                  id="first_name"
                  className={`${
                    edit
                      ? "custom-input !md:w-[300px]"
                      : "text-black bg-transparent dark:text-white"
                  }`}
                  onChange={(e) =>
                    setUserdata({ ...userData, first_name: e.target.value })
                  }
                  required
                  value={userData?.first_name}
                />
              </div>
            </div>
            <div className="flex items-center mb-4 space-x-4">
              <div className="w-1/3 text-sm font-body dark:text-white">
                Last Name
              </div>
              <div className="">
                <input
                  type="text"
                  id="first_name"
                  className={`${
                    edit
                      ? "custom-input !md:w-[300px]"
                      : "text-black bg-transparent dark:text-white"
                  }`}
                  required
                  onChange={(e) =>
                    setUserdata({ ...userData, last_name: e.target.value })
                  }
                  value={userData?.last_name}
                />
              </div>
            </div>
            <div className="flex items-center mb-4 space-x-4">
              <div className="w-1/3 text-sm font-body dark:text-white">
                Email
              </div>
              <div className="">
                <input
                  type="email"
                  id="email"
                  readOnly
                  className={`${
                    edit
                      ? "custom-input !md:w-[300px]"
                      : "text-black bg-transparent dark:text-white"
                  }`}
                  defaultValue={userData?.email}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold font-body dark:text-white">
              News Preference
            </h3>
          </div>
          <div className="mt-4">
            <div className="flex flex-col mb-4 space-x-4 border-b border-gray-200">
              <h3 className="w-1/3 mb-4 font-semibold font-body text-md dark:text-white">
                Sources
              </h3>
              <div className="grid grid-cols-2 gap-x-4 md:grid-cols-3 gap-y-4">
                {isSourceLoading && (
                  <div className="flex justify-center w-full py-5">
                    <Loader fill="#FC0000" />
                  </div>
                )}
                {sources &&
                  sources.map((item: ISourceCategory) => (
                    <div className="flex items-center mb-4" key={item.id}>
                      <input
                        id={item.id}
                        type="checkbox"
                        name={item.id}
                        onChange={(e) => checkBoxHandler(e, "sources")}
                        className="checkbox"
                        checked={userData?.settings?.sources.includes(item.id)}
                      />
                      <label
                        htmlFor={item.id}
                        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-300"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col mb-4 space-x-4 border-b border-gray-200">
              <h3 className="w-1/3 mb-4 font-semibold font-body text-md">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-x-4 md:grid-cols-3 gap-y-4">
                {isCategoryLoading && (
                  <div className="flex justify-center w-full py-5">
                    <Loader fill="#FC0000" />
                  </div>
                )}
                {categories &&
                  categories.map((item: ISourceCategory) => (
                    <div className="flex items-center mb-4" key={item.id}>
                      <input
                        onChange={(e) => checkBoxHandler(e, "catgeories")}
                        id={item.id}
                        name={item.id}
                        type="checkbox"
                        value=""
                        className="checkbox"
                        checked={userData?.settings?.categories.includes(
                          item.id
                        )}
                      />
                      <label
                        htmlFor={item.id}
                        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-300"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col mb-4 space-x-4">
              <h3 className="w-1/3 mb-4 font-semibold font-body text-md">
                Authors
              </h3>
              <div className="grid grid-cols-2 gap-x-4 md:grid-cols-3 gap-y-4">
                {isAuthorLoading && (
                  <div className="flex justify-center w-full py-5">
                    <Loader fill="#FC0000" />
                  </div>
                )}
                {authors &&
                  authors.map((item: string) => (
                    <div className="flex items-center mb-4" key={item}>
                      <input
                        onChange={(e) => checkBoxHandler(e, "authors")}
                        id={item}
                        name={item}
                        type="checkbox"
                        className="checkbox"
                        checked={userData?.settings?.authors.includes(item)}
                      />
                      <label
                        htmlFor={item}
                        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-300"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              className="text-white bg-red-1x hover:bg-red-2x focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-red-1x 0 mx-auto"
              onClick={saveSettings}
              disabled={isLoading}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
