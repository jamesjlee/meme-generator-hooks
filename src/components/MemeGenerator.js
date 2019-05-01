import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormInput } from "../hooks/MemeGeneratorHooks";
import "../css/MemeGenerator.css";

const MemeGenerator = () => {
  const topText = useFormInput("");
  const bottomText = useFormInput("");
  const [randomMeme, setRandomMeme] = useState("");
  const [memes, setMemes] = useState([]);
  const [memeGenerated, setMemeGenerated] = useState(false);
  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then(response => {
        console.log(response);
        const { memes } = response.data.data;
        setMemes({ allMemes: memes });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * memes.allMemes.length);
    const randMeme = memes.allMemes[randNum].url;
    setRandomMeme(randMeme);
    setMemeGenerated(true);
  };

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen">
              <form className="meme-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Top Text</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Trollol"
                      {...topText}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Bottom Text</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Trollol"
                      {...bottomText}
                    />
                  </div>
                </div>
                <button className="button is-primary is-fullwidth">Gen</button>
              </form>

              <div className="meme">
                <img src={randomMeme} alt="" />
                <h2 className="top">{memeGenerated && topText.value}</h2>
                <h2 className="bottom">{memeGenerated && bottomText.value}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
