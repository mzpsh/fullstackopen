import { useEffect, useState } from 'react'


function App() {
  const [query, setQuery] = useState(null);

  const onTextTyped = (value) => {
    setQuery(value);
  }

  const queryHook = () => {
    if(query) {
      console.log(query);
    }
  }

  useEffect(queryHook, [query]);

  return (
    <>
      <SearchField {...{onTextTyped}}/>
    </>
  )
}

const SearchField = ({onTextTyped}) => {
  return <>
    find countries <input type="text" onChange={e => onTextTyped(e.target.value)}/>
  </>
}

export default App
