import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const username = info["url"].slice(29);

  const noPlay = "None";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [bullet, setBullet] = useState<number | string>(noPlay);
  const [blitz, setBlitz] = useState<number | string>(noPlay);
  const [rapid, setRapid] = useState<number | string>(noPlay);
  const [daily, setDaily] = useState<number | string>(noPlay);

  useEffect(() => {
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
      .then((response) => response.json())
      .then((data) => {
        // Sets stat values if the user has a value for that stat
        setBullet(
          data.chess_bullet !== undefined
            ? data.chess_bullet.last.rating
            : bullet
        );
        setBlitz(
          data.chess_blitz !== undefined ? data.chess_blitz.last.rating : blitz
        );
        setRapid(
          data.chess_rapid !== undefined ? data.chess_rapid.last.rating : rapid
        );
        setDaily(
          data.chess_daily !== undefined ? data.chess_daily.last.rating : daily
        );
        setStatsLoaded(true);
      });
  }, []);

  // Sets avatar to default chess.com profile picture if no avatar is found
  if (info["avatar"] === undefined) {
    info["avatar"] =
      "https://www.chess.com/bundles/web/images/user-image.007dad08.svg";
  }
  console.log(username.length < 9);
  return (
    <>
      {!(imageLoaded && statsLoaded) && <div id="spinner"></div>}
      <div
        style={
          imageLoaded && statsLoaded
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <button id="close_button" onClick={() => navigate("/")}>
          X
        </button>
        <h1 className="username">{username}</h1>
        <div className="container">
          <div className="stat_list">
            <h2 className="stat">Bullet: {bullet}</h2>
            <h2 className="stat">Blitz: {blitz}</h2>
            <h2 className="stat">Rapid: {rapid}</h2>
            <h2 className="stat">Daily: {daily}</h2>
          </div>
          <img
            src={info["avatar"]}
            alt="Player Avatar"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </>
  );
}

export default User;
