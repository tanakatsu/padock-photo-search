import React from 'react'

const SearchTop = ({history}) => {
  //console.log(history)

  return (
    <div>
      <h2>Padock photo search</h2>
      <form onSubmit={(e) => { e.preventDefault();history.push(`/react_app/search?q=${this.searchWord.value}`) }}>
        <input ref={(input) => { this.searchWord = input }} type="text" size="50" />
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default SearchTop
