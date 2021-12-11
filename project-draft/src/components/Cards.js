import React, { useState } from 'react';
import _ from 'lodash';
import { getDatabase, ref, push as firebasePush } from 'firebase/database'


// component for an individual card.
export function Card(props) {
    const name = props.card.name;
    const msg = props.card.msg;
    const trait = props.card.trait;

    return (
        <div className="card">
            {/* <img className="card-img-top" src={picture} alt="profile pic" /> */}
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h3 className="card-text text-warning">{"Displayed " + trait}</h3>
                <p className="card-text">{msg}</p>
                <a href="#" className="btn btn-outline-success">Read More</a>
            </div>
        </div>
    )
}

//component that renders the Cards

export function CardList(props) { //props is posts
    console.log(props.post);
    const [state, setState] = useState({
        name: "",
        msg: "",
        trait: ""
    })


    const db = getDatabase();
    //adds to db
    const pushPost = () => {
        const newMessageObj = {
            name: state.name,
            msg: state.msg,
            trait: state.trait,
            timestamp: Date.now(), //posted now
        }
        const postsRef = ref(db, "allPosts");
        firebasePush(postsRef, newMessageObj)
            .catch((err) => { })
    }

    //filtering
    const handleFilterClick = () => {
        props.filterCallback();
    };
    let data = Array.from(props.post);
    const filteredCards = data; //need to filter it
    let cardList = filteredCards.map((postObj) => {
        return <Card card={postObj} key={postObj} />
    });
    


    return (
        <main>
            <div class="container">
                <div class="filter">
                    <p>Filter-By:</p>
                    <button type="button" class="btn btn btn-outline-warning" name="integrity" onClick={handleFilterClick}>Integrity</button>
                    <button type="button" class="btn btn btn-outline-warning" name="diversity" onClick={handleFilterClick}>Diversity</button>
                    <button type="button" class="btn btn btn-outline-warning" name="excellence" onClick={handleFilterClick}>Excellence</button>
                    <button type="button" class="btn btn btn-outline-warning" name="collaboration" onClick={handleFilterClick}>Collaboration</button>
                    <button type="button" class="btn btn btn-outline-warning" name="innovation" onClick={handleFilterClick}>Innovation</button>
                    <button type="button" class="btn btn btn-outline-warning" name="respect" onClick={handleFilterClick}>Respect</button>
                </div>
            </div>
            <div class="container">
                <div className="card-columns col-sm-12">
                    {cardList}
                </div>
            </div>
            <div>
                <form aria-label="Add a Kudos" >
                    <div id="postform" className="container mb-5">
                        <label for="postform">Who Do You Want To Recognize?</label>

                        <select class="form-control col-3 " onChange={(e) => setState({ ...state, trait: e.target.value })}>
                            <option>Integrity</option>
                            <option>Diversity</option>
                            <option>Excellence</option>
                            <option>Collaboration</option>
                            <option>Innovation</option>
                            <option>Respect</option>
                        </select>

                        <input type="text" className="form-control col-3" placeholder="Full Name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />

                        <input placeholder="Enter your message" value={state.msg} className="form-control form-control-lg" onChange={(e) => setState({ ...state, msg: e.target.value })} />

                        <div class="btn-group">
                            <button aria-label="Submit" class="btn btn-outline-warning" onClick={pushPost}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}