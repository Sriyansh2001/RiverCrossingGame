import React , {useState} from 'react';
import { useRef } from 'react';
import './mos_sant.css';
import monster_img from './monster.png';
import saint_img from './saint.png'

export default function Mos_sant() {
    // Initialization of all variables.
    const [monster_left,change_monster_left] = useState(3);
    const [saint_left,change_saint_left] = useState(3);
    const [monster_right,change_monster_right] = useState(0);
    const [saint_right,change_saint_right] = useState(0);
    const [m_boat,change_m_boat] = useState(0);
    const [s_boat,change_s_boat] = useState(0);
    const [state_boat,change_state_boat] = useState(0);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const [place,change_place] = useState({
        width:windowSize.current[0]>=1000?"10vw":"15vw"
    })

    // Pass the moster to the boat from left end of ground
    function go_moster_boat_left() {
        if(m_boat+s_boat===2 || state_boat===1 || monster_left<=0) {
            return ;
        }
        change_m_boat(m_boat+1);
        change_monster_left(monster_left-1);
    }

    // Pass the saint to the boat from the left ground
    function go_saint_boat_left() {
        if(m_boat+s_boat===2 || state_boat===1 || saint_left<=0) {
            return ;
        }
        change_s_boat(s_boat+1);
        change_saint_left(saint_left-1);
    }

    // Pass the moster to the boat from the right end of ground
    function go_moster_boat_right() {
        if(m_boat+s_boat===2 || state_boat===0 || monster_right<=0) {
            return ;
        }
        change_m_boat(m_boat+1);
        change_monster_right(monster_right-1);
    }

    // Pass the saint to the boat from the left end of ground
    function go_saint_boat_right() {
        if(m_boat+s_boat===2 || state_boat===0 || saint_right<=0) {
            return ;
        }
        change_s_boat(s_boat+1);
        change_saint_right(saint_right-1);
    }

    // Display Result in pop-up box
    function result() {
        if(monster_right+saint_right===6) {
            alert("Congratulations!!! You Won The Game");
        }
        else {
            alert("Game is Still On");
        }
    }

    // Pass the moster from boat to ground 
    function go_moster_back_to_ground() {
        if(m_boat===0) return ;
        change_m_boat(m_boat-1);
        if(state_boat===0) {
            change_monster_left(monster_left+1);
        }
        else {
            change_monster_right(monster_right+1);
        }
    }

    // Pass the saint from boat to ground 
    function go_saint_back_to_ground() {
        if(s_boat===0) return ;
        change_s_boat(s_boat-1);
        if(state_boat===0) {
            change_saint_left(saint_left+1);
        }
        else {
            change_saint_right(saint_right+1);
        }
    }

    // Pass the boat from one end to another end
    function change_boat_ground() {
        if(m_boat+s_boat<=0) return ;
        if(state_boat===0) {
            change_state_boat(1);
            if(m_boat+monster_right > s_boat+saint_right && (saint_right!==0 || s_boat!==0)) {
                alert("Game Over! Please try again");
                reset_all();
                return ;
            }
            if(monster_left>saint_left && saint_left!==0) {
                alert("Game Over! Please try again");
                reset_all();
                return ;
            }
            change_place({
                width: "45vw"
            });
        }
        else {
            change_state_boat(0);
            if(m_boat+monster_left>s_boat+saint_left && (saint_left!==0 || s_boat!==0)) {
                alert("Game Over! Please try again");
                reset_all();
                return ;
            }
            if(monster_right>saint_right && saint_right!==0) {
                alert("Game Over! Please try again");
                reset_all();
                return ;
            }
            change_place({
                width:windowSize.current[0]>=1000?"10vw":"15vw"
            });
        }
    }

    // Reset Function 
    function reset_all() {
        change_monster_left(3);
        change_saint_left(3);
        change_monster_right(0);
        change_saint_right(0);
        change_m_boat(0);
        change_s_boat(0);
        change_state_boat(0);
        change_place({width:windowSize.current[0]>=1000?"10vw":"15vw"});
    }

    return (
        <div>
            <div className='title'>
                <b>River Crossing Challenge</b>
            </div>
            <div className='Rules'>
                <h2>Description</h2>
                <ol>
                    <li>Capacity of boat is 2.</li>
                    <li>If monster is greater than saint at any end point you will loss the game.</li>
                    <li>You Need to place all mosters and saints to the finish end.</li>
                    <li>After Crossing all the monsters and saints please press Finish Button</li>
                </ol>
                <br></br>
            </div>
            <div className='main'>
                <div className="firstend">
                    <div className='heading'><h2>Start</h2></div><br></br>
                        <div className='inside_block'>  <img className='img' onClick={go_moster_boat_left} src={monster_img}></img> {monster_left} <br></br></div>
                        <div className='inside_block'>  <img className='img' onClick={go_saint_boat_left} src={saint_img}></img> {saint_left} </div>
                </div>
                <div className="boat">
                    <div className='heading'><h2>Boat</h2></div><br></br>
                    <div className='inside_boat_object'style={place} >
                        <div className='one_more'>
                            <div  className='inside_boat'><img className='img' onClick={go_moster_back_to_ground} src={monster_img}></img> {m_boat} <br></br></div>
                            <div  className='inside_boat'><img className='img' onClick={go_saint_back_to_ground} src={saint_img}></img> {s_boat} <br></br></div>
                        </div>
                    </div>
                    <div className='pass'><button onClick={change_boat_ground}>Cross The Boat </button> {state_boat===0?"Boat on Left End":"Boat on Right End"}</div>
                </div>
                <div className="secondend">
                    <div className='heading'><h2>Finish</h2></div><br></br>
                    <div className='inside_block'><img className='img' onClick={go_moster_boat_right} src={monster_img}></img> {monster_right} <br></br></div>
                    <div className='inside_block'><img className='img' onClick={go_saint_boat_right} src={saint_img}></img> {saint_right}</div>
                </div>
            </div>
            <div className='lower_btn'>
                <button onClick={result}>Finish</button>
                <button onClick={reset_all}>Reset</button>
            </div>
        </div>
    )
}
