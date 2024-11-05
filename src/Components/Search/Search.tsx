import React, { ChangeEvent, SyntheticEvent, useState } from 'react';

type Props = {};

const Search: React.FC<Props> = () => {
  const [search, setSearch] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onClick = (e: SyntheticEvent ) => {

  };

  return (
    <div>
      <input value={search} onChange={ (e) => handleChange(e) }></input>
      <button onClick={ (e) => onClick(e) } />
    </div>
  )
}

export default Search
