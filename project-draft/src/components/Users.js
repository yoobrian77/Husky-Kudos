import React, {useState} from 'react';
import _ from 'lodash';



function UserCard(props) {
  // console.log(props)

    return (
        <div class="container"> 
          <div className="card mb-3">
              <div className="card-body">
                  <h5 className="card-title">{props.user.username}</h5>
                  <p className="card-text">{props.user.email}</p>
                  <a href="#" className="btn btn-outline-success">Go to profile page</a>
              </div>
          </div>
        </div> 

    )
}


export function Users(props) {


  const [sort, setSorted] = useState(null)

 


  function handleClick(event){
      let name = event.currentTarget.name;
      let nextSort;
      if(name == "asc"){
        nextSort = {sort: name}
      } else if( name === "desc"){
        nextSort = {sort: name}
      }
      // else if( name === "posts"){
      //   nextSort = {sort: name}
      // }
      // else if( name === "awards"){
      //   nextSort = {sort: name}
      // }
      setSorted(nextSort);
  }

  let sorted = _.sortBy(props.users, "email");
 
  // console.log(props.users);
  // console.log(_.sortBy(props.users, 'username'));
  if(sort != null && sort.sort === "desc"){
    _.reverse(sorted);
  }
  
  
  // } else if(sort != null && sort === "posts"){
  //   sorted = props.users.sort(function(a, b){return b.posts.length - a.posts.length});

  // } else if(sort != null && sort === "awards"){
  //   sorted = props.users.sort(function(a, b){return b.awards.length - a.awards.length});

  // }

    let userObj = sorted.map((user) => {
        return <UserCard key={user.username} user={user} />;
    });
    return (
        <main>
            <div className="container">
                <div className="filter">
                    <p>Sort-By:</p>
                    <button type="button" onClick={handleClick} name="asc" className="btn btn-outline-warning">Alphabetical (A-Z)</button>
                    <button type="button"  onClick={handleClick} name="desc" className="btn btn-outline-warning">Alphabetical (Z-A)</button>
                    {/* <button type="button" onClick={handleClick} name="posts" className="btn btn-outline-warning">Most Posts</button>
                    <button type="button" onClick={handleClick} name="awards" className="btn btn-outline-warning">Most Awards</button> */}
                </div>
            </div>
            <section>
                {userObj}
            </section>
        </main>
    )
}
