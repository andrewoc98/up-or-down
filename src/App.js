import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import "./App.css"
import music from "./sound.wav"
import { Howl } from "howler";

const rand = Math.floor(Math.random() * 100);
const result = Math.random() < 0.5 ? "Good" : "Bad";
const str = Math.random() < 0.5 ? "Awarding Fancash" : "Calling Revert Endpoint";
const weather = ["It's miserable out", "Great stretch in the evening", "Could be worse"][Math.floor(Math.random() * 3)];
const BoolV2 = ["True","False","Perhaps"][Math.floor(Math.random() * 3)]
const cosmic =["Nik was Stopped", "Andrew is the Murderer", "The Big Appsecsy Determined"][Math.floor(Math.random() * 3)]
const symbols = ["⬆️", "⬇️", "NO STAND UP"];
const people = ["Andrew", "Arun", "Liam", "Nik", "Rafal", "Sneha", "Prashant", "John", "Vishal"]
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
  const [peopleSlots, setPeopleSlots] = useState([people[Math.floor(Math.random() * 9)],people[Math.floor(Math.random() * 9)],people[Math.floor(Math.random() * 9)]])
  const [text, setText] = useState("")
  const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        if (spinning) {
            const interval1 = setInterval(() => {
                setSlots(Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]));
            }, 100);
            const interval2 = setInterval(() => {
                setPeopleSlots(Array.from({ length: 3 }, () => people[Math.floor(Math.random() * 9)]));
            }, 105);
            let stepCounter = 0;
            const textInterval = setInterval(() => {
                if (stepCounter < steps.length) {
                    setText(steps[stepCounter]);
                    stepCounter++;
                } else {
                    clearInterval(textInterval);
                }
            }, 1450); // Show each step for 500ms

            setTimeout(() => {
                setSlots(Array.from({ length: 3 }, () => symbols[generateDay()]));
                const person = selectPerson()
                setPeopleSlots(Array.from({ length: 3 }, () => people[person]))
                console.log(peopleSlots)
                console.log(person)
                setSpinning(false);
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(textInterval);
            }, 13400);

            return () => {
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(textInterval);
            };
        }
    }, [spinning]);

  return (

      <div className="mainDiv">
          <h1 className= "header">The Wheelie Oracle</h1>
          <h2 className="header">Spin To Stand-Up</h2>
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
                Audio()
            }}
            disabled={spinning}
            className="other"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
          <p>{text}</p>
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

    function selectPerson(){
        return Math.floor(Math.random() * 9)
    }



var sound = new Howl({
    src: [music]
});
async function Audio() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            sound.play();
        }, i * 2700);
    }
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