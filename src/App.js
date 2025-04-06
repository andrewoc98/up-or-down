import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import "./App.css"
import TagInput from "./TagInput";

const rand = Math.floor(Math.random() * 100);
const result = Math.random() < 0.5 ? "Good" : "Bad";
const str = Math.random() < 0.5 ? "Awarding Fancash" : "Calling Revert Endpoint";
const weather = ["It's miserable out", "Great stretch in the evening", "Could be worse"][Math.floor(Math.random() * 3)];
const BoolV2 = ["True","False","Perhaps"][Math.floor(Math.random() * 3)]
const cosmic =["Nik was Stopped", "Andrew is the Murderer", "The Big Appsecsy Determined"][Math.floor(Math.random() * 3)]
const symbols = ["⬆️", "⬇️", "NO STAND UP"];
const wheelieTeam = ["Andrew", "Arun", "Liam", "Nik", "Rafal", "Sneha", "Prashant", "John", "Vishal"];
const steps = [
    "Consulting Oracle.....",
    `Determining Celestial Invocation...${result}`,
    "Proceeding with Zodiac Verification...",
    str,
    `Asking Local Stranger on their current Meteorological opinion...${weather}`,
    `Birds Spotted: ${rand}`,
    `Does the Current day end in Day...${BoolV2}`,
    `Performing Cosmic Confirmation....${cosmic}`,
    `Oracle Consultation Complete`
]

export default function SlotMachine() {
  const [slots, setSlots] = useState(["⬆️", "⬇️", "NO STAND UP"]);
  const [peopleSlots, setPeopleSlots] = useState(["", "", ""]);
  const [text, setText] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [lambs, setLambs] = useState([]);
  const [isWheelieTeam, setIsWheelieTeam] = useState(false);
  const [spinDuration, setSpinDuration] = useState(4000);

    useEffect(() => {
        if (spinning) {
            const interval1 = setInterval(() => {
                setSlots(
                    Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)])
                );
            }, 100);

            const interval2 = setInterval(() => {
                const validLambs = lambs.filter(l => l.name.trim() !== "");
                setPeopleSlots(
                    Array.from({ length: 3 }, () => weightedRandomPick(validLambs) || "")
                );
            }, 105);

            let stepCounter = 0;
            const textInterval = setInterval(() => {
                if (stepCounter < steps.length) {
                    setText(steps[stepCounter]);
                    stepCounter++;
                } else {
                    clearInterval(textInterval);
                }
            }, spinDuration / 9);

            setTimeout(() => {
                setSlots(
                    Array.from({ length: 3 }, () => symbols[generateDay()])
                );
                const validLambs = lambs.filter(l => l.name.trim() !== "");
                const finalPerson = weightedRandomPick(validLambs);
                setPeopleSlots(
                    Array.from({ length: 3 }, () => finalPerson || "")
                );
                setSpinning(false);
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(textInterval);
            }, spinDuration);

            return () => {
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(textInterval);
            };
        }
    }, [spinning, lambs, spinDuration]);

    return (

      <div className="mainDiv">
          <h1 className="header scary-font">The Wheelie Oracle</h1>
          <h2 className="header">Spin To Stand-Up</h2>
          <label className="header">Spin Duration: {(spinDuration/1000).toFixed(1)}s</label>
          <input className="slider"
              type="range"
              min="1000"
              max="10000"
              value={spinDuration}
              onChange={(e) => setSpinDuration(Number(e.target.value))}
          />
          <div className="candle-container">
              <Candle />
              <Candle />
              <Candle />
        <div className="secondDiv">
          {slots.map((symbol, index) => (
              <motion.div
                  key={index}
                  className="motion"
                  animate={{ opacity: [0.5, 1], scale: [0.8, 1] }}
                  transition={{ duration: 0.1, repeat: spinning ? Infinity : 0 }}
              >
                {symbol}
              </motion.div>

          ))}


        </div>
          <div className="secondDiv">
              {peopleSlots.map((symbol, index) => (
                  <motion.div
                      key={index}
                      className="motion"
                      animate={{ opacity: [0.5, 1], scale: [0.8, 1] }}
                      transition={{ duration: 0.1, repeat: spinning ? Infinity : 0 }}

                  >
                      <div className="name">{symbol}</div>
                  </motion.div>
              ))}
          </div>

          <div>

          </div>
              <Candle />
              <Candle />
              <Candle />
          </div>

        <button
            onClick={() => {
                setSpinning(true)
            }}
            disabled={spinning}
            className="other"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
          <p>{text}</p>
          <div className="sacrificial-lambs">
              <h3 className="scary-font">Team Members</h3>
              <div className="checkbox-container">
                  <label>
                      <input
                          type="checkbox"
                          checked={isWheelieTeam}
                          onChange={(e) => {
                              const checked = e.target.checked;
                              setIsWheelieTeam(checked);
                              if (checked) {
                                  setLambs(wheelieTeam.map(name => ({ name, weight: 1 })));
                              } else {
                                  setLambs([]);
                              }
                          }}
                      />
                      Wheelie Team
                  </label>
              </div>
              </div>
          <TagInput
              isWheelieTeam={isWheelieTeam}
              wheelieTeam={wheelieTeam}
              onTagsChange={setLambs}
          />
      </div>
  );
}

    function generateDay(){
        const date = new Date()
        const dayOfWeek = date.getDay()

        if(noStandUp(dayOfWeek)){
            return 2
        }
        if(UpDay(dayOfWeek)){
            return 0
        }
        else {
            return 1
        }
    }

    function noStandUp(day){
        return (day === 0) || (day === 1) || (day === 6)
    }

    function UpDay(day) {
        return (day === 2) || (day === 4)
    }

function weightedRandomPick(array) {
    const weightedList = array.flatMap(({ name, weight }) =>
        Array(weight).fill(name)
    );
    return weightedList[Math.floor(Math.random() * weightedList.length)];
}


function Candle() {
    return (
        <div className="candle">
            <motion.div
                className="flame"
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="wick" />
            <div className="candle-body" />
        </div>
    );
}
