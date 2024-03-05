import { Link, Outlet } from "react-router-dom";
import "./HomePage.css";
import { User } from "../../interface";
import useGetUsersList from "../../hooks/GetUsersList";
import { ChangeEvent, useState } from "react";
import { useBackGroundStore } from "../../store";
export default function HomePage() {
  const [isHover, setIsHover] = useState<number>(-1);
  const [filterList, setFilterList] = useState<boolean>(false);
  const [theme, setTheme] = useState<"white" | "black">("black");
  const [value, setValue] = useState<string>("");
  const { data, isLoading, isError } = useGetUsersList();
  const { setBackGround, setUserWindow } = useBackGroundStore();
  const screenWidth = window.screen.availWidth;
  return (
    <div className="ContainerMain">
      <div className="ContainerLeft">
        <button className="ButtonLeft" onClick={() => {}}>
          +
        </button>
        <button
          className="ButtonLeft"
          onClick={() => {
            setFilterList(!filterList);
          }}
          style={{
            backgroundColor: filterList ? "blue" : "transparent",
          }}
        >
          ★
        </button>
        <button
          style={
            {
              // backgroundColor: theme === "white" ? "white" : "black",
            }
          }
          className="ButtonLeft"
          onClick={() => {
            setTheme(theme === "white" ? "black" : "white");
          }}
        >
          {theme === "white" ? "☀" : "☾"}
        </button>
      </div>
      <div className="ContainerHome">
        <input
          id="inputSearch"
          type="text"
          placeholder="Search to first name..."
          className="InputSearch"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        {data ? (
          <ul>
            {data.map((item: User) => {
              if (
                (filterList && item.favorite === false) ||
                (value !== "" && !item.firstName.includes(value))
              ) {
                return null;
              }
              return (
                <li>
                  <div
                    key={item.id}
                    className="UserContainer"
                    onMouseLeave={() => setIsHover(-1)}
                    onMouseEnter={() => setIsHover(Number(item.id))}
                  >
                    <Link
                      onClick={() => {
                        // setUserWindow(true);
                        // setBackGround(true);
                      }}
                      to={{
                        pathname: `/contacts/${item.id}`,
                      }}
                    >
                      {
                        <img
                          style={{
                            // width: "3rem",
                            // height: "3rem",
                            transition: "3s ease-in-out",
                            border: `solid 2px ${isHover === item.id ? "blue" : "transparent"}`,
                            marginLeft: isHover === item.id ? "3%" : "-3%",
                            transform: isHover
                              ? "rotate(360deg) rotateY(360deg) rotateZ(360deg) rotateX(360deg)"
                              : "rotate(0deg)",
                          }}
                          src={item.avatar}
                          className="imgItem"
                        />
                      }{" "}
                      {<h4>{item.firstName}</h4>} {<h4>{item.lastName}</h4>}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : null}
        <Outlet />
        {screenWidth > 768 && (
          <div className="ContainerContact" style={{ zIndex: 0 }}>
            <div className="InitialPicture">
              <div className="InitialPictureIn">
                <div className="InPng">
                  <h1 style={{ marginTop: "1%", marginLeft: "-20%" }}>
                    {screenWidth > 768 && <>ViteReacTGram</>}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
