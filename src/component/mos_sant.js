import React , {useState} from 'react';
import './mos_sant.css';

export default function Mos_sant() {
    // Initialization of all variables.
    const [monster_left,change_monster_left] = useState(3);
    const [saint_left,change_saint_left] = useState(3);
    const [monster_right,change_monster_right] = useState(0);
    const [saint_right,change_saint_right] = useState(0);
    const [m_boat,change_m_boat] = useState(0);
    const [s_boat,change_s_boat] = useState(0);
    const [state_boat,change_state_boat] = useState(0);

    const [place,change_place] = useState({
        float:"left"  
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

    function result() {
        if(monster_right+saint_right===6) {
            alert("Congratulations You Solve the Game");
        }
        else {
            alert("Game is Not finished");
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
            // console.log(m_boat,monster_right,s_boat,saint_right);
            if(m_boat+monster_right > s_boat+saint_right && (saint_right!==0 || s_boat!==0)) {
                alert("Game Over");
                reset_all();
                return ;
            }
            if(monster_left>saint_left && saint_left!==0) {
                alert("Game Over");
                reset_all();
                return ;
            }
            change_place({float:"right"});
            // console.log()
        }
        else {
            change_state_boat(0);
            if(m_boat+monster_left>s_boat+saint_left && (saint_left!==0 || s_boat!==0)) {
                alert("Game Over");
                reset_all();
                return ;
            }
            if(monster_right>saint_right && saint_right!==0) {
                alert("Game Over");
                reset_all();
                return ;
            }
            // console.log(m_boat,monster_left,s_boat,saint_left,saint_left ,s_boat);
            change_place({float:"left"});
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
        change_place({float:"left"});
    }

    return (
        <div>
            <div className='Rules'>
                <h2>Description</h2>
                <ol>
                    <li>Capacity of boat is 2.</li>
                    <li>If monster is greater than saint at any end point you will loss the game.</li>
                    <li>You Need to place all the 6 members to the finish end.</li>
                </ol>
                <br></br>
            </div>
            <div className='main'>
                <div className="firstend">
                    <div className='heading'><h2>Start</h2></div><br></br>
                    <button className='btnmonster' onClick={go_moster_boat_left}>Monster :</button> {monster_left} <br></br>
                    <button className='btnsaint' onClick={go_saint_boat_left}>Saint :</button> {saint_left} 
                </div>
                <div className="boat">
                    <div className='heading'><h2>Boat</h2></div><br></br>
                    <div  style={place}>
                        <button className='btnmonster' onClick={go_moster_back_to_ground}> Moster : </button> {m_boat} <br></br>
                        <button className='btnsaint' onClick={go_saint_back_to_ground}>Saint : </button> {s_boat} <br></br>
                        <button onClick={change_boat_ground}>Pass : </button> {state_boat===0?"Boat on Left End":"Boat on Right End"}
                    </div>
                </div>
                <div className="secondend">
                    <div className='heading'><h2>Finish</h2></div><br></br>
                    <button className='btnmonster' onClick={go_moster_boat_right}>Monster : </button> {monster_right} <br></br>
                    <button className='btnsaint' onClick={go_saint_boat_right}>Saint : </button> {saint_right}
                </div>
            </div>
            <div className='lower_btn'>
                <button onClick={result}>Check</button>
                <button onClick={reset_all}>Reset</button>
            </div>
        </div>
    )
}
