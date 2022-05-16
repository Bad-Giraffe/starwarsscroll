// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import PeopleList from './components/people/people-list';
import { Button, Container, Spinner } from 'react-bootstrap'


function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false)
  const [isDataEnd, setIsDataEnd] = useState(false)

  const endPoint = `https://swapi.dev/api/people/?page=${page}`

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setSpinnerIsVisible(true)
    try {
      const response = await axios.get(endPoint)
      const { results } = response.data

      if (response.status === 200) {
        setPage(page + 1)
        setData([...data].concat(results))
      }
    }
    catch (e) {
      console.log(e)
      setIsDataEnd(true)
    }
    setSpinnerIsVisible(false)
  }

  return (
    <Container className='mt-3 mb-3'>
      <PeopleList data={data} />
      {spinnerIsVisible && <Spinner animation="border" />}
      {!isDataEnd ? (
        !spinnerIsVisible && <Button onClick={fetchData}>Load more</Button>
      )
        :
        <h3 style={{ color: 'red'}}>no more data</h3>
    }
    </Container>
  );
}

export default App;