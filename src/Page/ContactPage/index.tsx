import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./ContactPage.css";
import useGetUsersList from "../../hooks/GetUsersList";
import { useBackGroundStore } from "../../store";

export default function ContactPage() {
  const { backGround, setBackGround } = useBackGroundStore();

  const { data } = useGetUsersList();
  const parameters = useParams<{ contactId: string }>();
  const navigane = useNavigate();
  if (!data) {
    return null;
  }
  const thisUser = data[Number(parameters.contactId)];
  return (
    <div
      className="ContainerContact"
      style={{ backgroundColor: backGround ? "#202020" : "transparent" }}
    >
      <div style={{ marginLeft: "1%" }}>
        <div className="UserInfo">
          {backGround ? (
            <>
              {
                <img
                  style={{ width: "10rem", height: "10rem" }}
                  src={thisUser.avatar}
                  className="imgItem"
                />
              }{" "}
              {
                <h4 style={{ marginTop: "7rem" }}>
                  favorite: {thisUser.favorite ? "true" : "false"}
                </h4>
              }
              {<h4>firstName: {thisUser.firstName}</h4>}
              {<h4>lastName: {thisUser.lastName}</h4>}
              {
                <h4>
                  twitter:{" "}
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    {thisUser.twitter}
                  </a>
                </h4>
              }
              {<h4>Notes: {<em>{thisUser.notes}</em>}</h4>}
              <button
                className="ButtonOption"
                onClick={() => {
                  setBackGround(false);
                  navigane(`/contacts/${thisUser.id}/edit`);
                }}
              >
                Редактировать{" "}
              </button>
              <button className="ButtonOption" onClick={() => navigane("/")}>
                Закрыть
              </button>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
