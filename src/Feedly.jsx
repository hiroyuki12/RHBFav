import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
//import './App.css'
import './FeedlyApp.css'
import Search from './Search'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function App() {
  const [postsList, setPostsList] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [continuation, setContinuation] = useState("9999999999999")
  const [category, setCategory] = useState("c59b3cef-0fa1-414c-8aca-dc9678aaa85f")  //hbfav
  const [categoryName, setCategoryName] = useState("hbfav")

  const categoryButtonClick = () => {
    setPostsList([]);
    setContinuation("9999999999999");
      setCategory("c59b3cef-0fa1-414c-8aca-dc9678aaa85f");
      setCategoryName("hbfav");
    handleClick();
  }

  const handleClick = () => {
    const url = 'https://u2r6yb4u30.execute-api.us-east-1.amazonaws.com/default/feedly?continuation=' + continuation + "&category=" + category + "&count=20";
    setIsLoading(true);

    const headers = {}
    fetch(url, { headers })
      .then(res =>
        res.json().then(data => ({
          ok: res.ok,
          data,
        }))
      )
      .then(res => {
        if (!res.ok) {
          throw Error(res.data.message);

        } else {
          setPostsList(postsList.concat(res.data.items));
          setIsLoading(false);
          setContinuation(res.data.items[res.data.items.length - 1].published);
        }
       })
  }

  const renderImageList = (list) => {
    const posts = list.map((item, index) => {
      var imgsrc = ""
      if(categoryName === "hbfav") {
        imgsrc = "https://cdn.profile-image.st-hatena.com/users/" + item.author + "/profile.gif"
      }
      const date = new Date(item.published)
      return (
        <li className="item" key={index}>
          <div class="card-container">
            <img src={imgsrc} width="50" height="50" loading="lazy" alt="img"/>

            <div class="card-text">
              <a className="QiitaApp-link" href={item.alternate[0].href} target="_blank" rel="noreferrer">{item.title}</a>
              <div class="card-text2">
                <p>{dayjs(date).fromNow(true)}</p>
              </div>
            </div>
          </div>
        </li>
      );
    });
    return posts;
  }


  return (
    <div className="App">
      <header className="QiitaApp-header">
        <Search search={handleClick} />
        <button onClick={() => {categoryButtonClick()}}>On</button>
        <ul>{renderImageList(postsList)}</ul>
      </header>
    </div>
  )
}

export default App
